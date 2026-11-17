import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
import zipfile

SPEC = importlib.util.spec_from_file_location("verify_android_test", Path(__file__).resolve().parents[2] / "scripts/verify-android-test.py")
VERIFY = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VERIFY)


class AndroidTestArtifact(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.dist = self.root / "dist"
        self.dist.mkdir()
        (self.dist / "index.html").write_text("<html lang='tr'>Öğren</html>")
        (self.dist / "version.json").write_text(json.dumps({"version": "1.2.3"}))
        self.apk = self.root / "fixture.zip"
        self.signature = "Verified using v2 scheme (APK Signature Scheme v2): true\nSigner #1 certificate DN: CN=Android Debug, O=Android, C=US\nSigner #1 certificate SHA-256 digest: " + "a" * 64 + "\n"
        self.badging = "package: name='com.fragaria.yksmania.test' versionCode='30' versionName='1.2.3-test' platformBuildVersionName='16'\napplication-label:'YKSMania Deneme'\napplication-debuggable\n"
        self.write_zip()

    def tearDown(self):
        self.temp.cleanup()

    def write_zip(self, missing=None, tamper=None):
        with zipfile.ZipFile(self.apk, "w") as archive:
            for path in self.dist.iterdir():
                if path.name != missing:
                    archive.writestr("assets/public/" + path.name, b"changed" if path.name == tamper else path.read_bytes())

    def verify(self, **changes):
        values = {"apk": self.apk, "dist": self.dist, "signature": self.signature, "badging": self.badging, "version": "1.2.3", "version_code": 30, "commit": "b" * 40}
        values.update(changes)
        return VERIFY.verify_apk(**values)

    def test_complete_payload_records_exact_source_and_files(self):
        result = self.verify()
        self.assertEqual(result["applicationId"], "com.fragaria.yksmania.test")
        self.assertEqual(len(result["bundledFiles"]), 2)
        self.assertEqual(result["sourceCommit"], "b" * 40)

    def test_missing_offline_asset_is_rejected(self):
        self.write_zip(missing="index.html")
        with self.assertRaisesRegex(ValueError, "Missing offline asset"):
            self.verify()

    def test_changed_offline_asset_is_rejected(self):
        self.write_zip(tamper="index.html")
        with self.assertRaisesRegex(ValueError, "Bundled offline asset differs"):
            self.verify()

    def test_production_identity_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "identity or version"):
            self.verify(badging=self.badging.replace("yksmania.test", "yksmania"))

    def test_unverified_or_non_debug_signing_is_rejected(self):
        for report in [self.signature.replace(": true", ": false"), self.signature.replace("CN=Android Debug", "CN=Other")]:
            with self.subTest(report=report), self.assertRaises(ValueError):
                self.verify(signature=report)

    def test_standard_debug_subject_order_and_spacing_are_supported(self):
        signature = self.signature.replace("CN=Android Debug, O=Android, C=US", "C=US,O=Android,CN=Android Debug")
        self.assertEqual(self.verify(signature=signature)["certificateSHA256"], "a" * 64)

    def test_multiple_signers_are_rejected(self):
        with self.assertRaisesRegex(ValueError, "Exactly one"):
            self.verify(signature=self.signature + "Signer #2 certificate SHA-256 digest: " + "c" * 64 + "\n")

    def test_stale_web_version_and_ambiguous_source_are_rejected(self):
        (self.dist / "version.json").write_text(json.dumps({"version": "0.9.0"}))
        self.write_zip()
        with self.assertRaisesRegex(ValueError, "Bundled web version"):
            self.verify()
        with self.assertRaisesRegex(ValueError, "full source commit"):
            self.verify(commit="main")


if __name__ == "__main__":
    unittest.main()
