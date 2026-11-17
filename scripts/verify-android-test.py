"""Verify the actual isolated test APK and copy only its public delivery evidence."""

import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
import zipfile


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def verify_apk(apk, dist, signature, badging, version, version_code, commit):
    if not re.fullmatch(r"[0-9a-f]{40}", commit):
        raise ValueError("A full source commit is required")
    identity = re.findall(
        r"^package: name='([^']+)' versionCode='(\d+)' versionName='([^']+)'",
        badging,
        re.MULTILINE,
    )
    expected = ("com.fragaria.yksmania.test", str(version_code), version + "-test")
    if identity != [expected]:
        raise ValueError("The test APK identity or version is incorrect")
    if not re.search(r"^application-label:'YKSMania Deneme'\s*$", badging, re.MULTILINE):
        raise ValueError("The launcher must clearly identify the test installation")
    if not re.search(r"^application-debuggable\s*$", badging, re.MULTILINE):
        raise ValueError("The test APK must use the debug build type")
    if not re.search(r"^Verified using v2 scheme .*: true\s*$", signature, re.MULTILINE):
        raise ValueError("APK signature verification did not confirm v2")
    certificates = re.findall(
        r"^Signer #(\d+) certificate SHA-256 digest: ([0-9a-fA-F]{64})\s*$",
        signature,
        re.MULTILINE,
    )
    subjects = re.findall(
        r"^Signer #1 certificate DN: (.+)\s*$",
        signature,
        re.MULTILINE,
    )
    subject = re.split(r",\s*", subjects[0].strip()) if len(subjects) == 1 else []
    if len(certificates) != 1 or certificates[0][0] != "1" or len(subject) != 3 or set(subject) != {"CN=Android Debug", "O=Android", "C=US"}:
        raise ValueError("Exactly one standard Android debug certificate is required")
    files = sorted(path for path in dist.rglob("*") if path.is_file())
    if not files or not (dist / "index.html").is_file():
        raise ValueError("The actual offline web build is missing")
    bundled = []
    with zipfile.ZipFile(apk) as archive:
        names = archive.namelist()
        if len(names) != len(set(names)):
            raise ValueError("Duplicate APK zip entries are not accepted")
        for path in files:
            relative = path.relative_to(dist).as_posix()
            expected_bytes = path.read_bytes()
            try:
                actual = archive.read("assets/public/" + relative)
            except KeyError as exc:
                raise ValueError("Missing offline asset: " + relative) from exc
            if actual != expected_bytes:
                raise ValueError("Bundled offline asset differs: " + relative)
            bundled.append({"path": relative, "bytes": len(actual), "sha256": sha256(actual)})
        metadata = json.loads(archive.read("assets/public/version.json"))
        if metadata.get("version") != version:
            raise ValueError("Bundled web version does not match the Android package")
    return {
        "status": "PASS_APK_STRUCTURE_SIGNATURE_AND_OFFLINE_PAYLOAD",
        "sourceCommit": commit,
        "applicationId": expected[0],
        "versionName": expected[2],
        "versionCode": version_code,
        "launcherLabel": "YKSMania Deneme",
        "certificateSHA256": certificates[0][1].lower(),
        "signing": "Automatic Android debug signing; no repository secret was used",
        "apkSHA256": sha256(apk.read_bytes()),
        "apkBytes": apk.stat().st_size,
        "bundledFiles": bundled,
        "scope": "Actual APK signature, package identity and every dist file verified; no physical-device or installation acceptance claim",
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    for arg in ["apk", "dist", "signature", "badging", "output"]:
        parser.add_argument("--" + arg, type=Path, required=True)
    parser.add_argument("--commit", required=True)
    args = parser.parse_args()
    root = Path(__file__).resolve().parent.parent
    version = json.loads((root / "package.json").read_text())["version"]
    codes = re.findall(r"^\s*versionCode (\d+)\s*$", (root / "android/app/build.gradle").read_text(), re.MULTILINE)
    if len(codes) != 1:
        raise ValueError("Exactly one canonical Android versionCode is required")
    result = verify_apk(args.apk, args.dist, args.signature.read_text(), args.badging.read_text(), version, int(codes[0]), args.commit)
    args.output.mkdir(parents=True, exist_ok=True)
    target = args.output / f"YKSMania-{version}-Android-Deneme.apk"
    shutil.copyfile(args.apk, target)
    if sha256(target.read_bytes()) != result["apkSHA256"]:
        raise ValueError("Copied APK digest mismatch")
    result["artifactFile"] = target.name
    (args.output / "verification.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    (args.output / "SHA256SUMS.txt").write_text(result["apkSHA256"] + "  " + target.name + "\n")
    (args.output / "KURULUM.txt").write_text(
        f"YKSMania {version} Deneme APK\n\n"
        "Bu klasördeki APK'yi telefona indirip aç. Android isterse bu dosyayı açtığın uygulamaya geçici yükleme izni ver.\n"
        "Ana ekranda YKSMania Deneme görünür. Normal YKSMania kurulumuna ve verilerine dokunmaz; ayrı ilerleme tutar.\n"
        "Konu Anlatımı, Kopya Kağıtları ve Sorular bölümlerini uçak modunda da deneyebilirsin. Video bağlantıları internet gerektirir.\n"
        "Bu paket standart Android test imzasını kullanır. Farklı bir test derlemesinin imzası değişebilir; güncelleme kabul edilmezse kaldırmadan önce Ayarlar'dan ilerlemeni yedekle.\n"
        "Bu dosya kişisel deneme içindir; mağaza veya kalıcı imzalı yayın paketi değildir.\n"
        "Gerçek telefonda kurulum ve öğrenme akışı bu yapısal APK denetiminde doğrulanmadı.\n"
    )
    print(json.dumps({"status": result["status"], "applicationId": result["applicationId"], "sourceCommit": args.commit, "files": len(result["bundledFiles"]), "apkBytes": result["apkBytes"], "apkSHA256": result["apkSHA256"]}))


if __name__ == "__main__":
    main()
