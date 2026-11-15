import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { X509Certificate } from "node:crypto";
import { spawnSync } from "node:child_process";

export function parseSigningSecret(raw) {
  if (typeof raw !== "string" || raw.length > 65536)
    throw Error("Invalid Android signing secret");
  let value;
  try {
    value = JSON.parse(raw);
  } catch {
    throw Error("Invalid Android signing secret");
  }
  const fields = [
    "version",
    "keystoreBase64",
    "storePassword",
    "keyPassword",
    "keyAlias",
    "certificateSha256",
  ];
  if (
    !value ||
    Array.isArray(value) ||
    Object.keys(value).length !== fields.length ||
    !fields.every((key) => Object.hasOwn(value, key)) ||
    value.version !== 1
  )
    throw Error("Invalid Android signing secret");
  if (
    typeof value.keystoreBase64 !== "string" ||
    !/^(?:[A-Za-z0-9+/]{4})+(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
      value.keystoreBase64,
    )
  )
    throw Error("Invalid Android keystore encoding");
  const bytes = Buffer.from(value.keystoreBase64, "base64");
  if (
    bytes.length < 1024 ||
    bytes.length > 32768 ||
    bytes.toString("base64") !== value.keystoreBase64
  )
    throw Error("Invalid Android keystore encoding");
  if (
    ![value.storePassword, value.keyPassword].every(
      (v) => typeof v === "string" && /^[A-Za-z0-9_.=-]{24,128}$/.test(v),
    ) ||
    value.storePassword !== value.keyPassword ||
    typeof value.keyAlias !== "string" ||
    !/^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/.test(value.keyAlias) ||
    typeof value.certificateSha256 !== "string" ||
    !/^[a-f0-9]{64}$/.test(value.certificateSha256)
  )
    throw Error("Invalid Android signing configuration");
  return { ...value, bytes };
}

export function verifySigningReport(report, expected) {
  if (!/^[a-f0-9]{64}$/.test(expected ?? ""))
    throw Error("Missing expected Android signing certificate");
  const fingerprints = [
    ...report.matchAll(
      /^.*certificate SHA-256 digest:\s*([a-fA-F0-9]{64})\s*$/gm,
    ),
  ].map((m) => m[1].toLowerCase());
  if (
    fingerprints.length !== 1 ||
    fingerprints[0] !== expected ||
    !/^Verified using v2 scheme .*: true\s*$/m.test(report)
  )
    throw Error("Android APK signing certificate mismatch");
}

async function prepare() {
  const raw = process.env.YKSMANIA_ANDROID_SIGNING;
  if (!raw)
    throw Error(
      "Configure repository secret YKSMANIA_ANDROID_SIGNING before building Android updates",
    );
  const secret = parseSigningSecret(raw);
  const temp = process.env.RUNNER_TEMP,
    envFile = process.env.GITHUB_ENV;
  if (!temp || !envFile)
    throw Error("Missing private Android signing workspace");
  const dir = await fs.mkdtemp(path.join(temp, "yksmania-signing-"));
  await fs.chmod(dir, 0o700);
  const file = path.join(dir, "signing.p12");
  try {
    await fs.writeFile(file, secret.bytes, { mode: 0o600, flag: "wx" });
    const exported = spawnSync(
      "keytool",
      [
        "-exportcert",
        "-alias",
        secret.keyAlias,
        "-keystore",
        file,
        "-storetype",
        "PKCS12",
        "-storepass:env",
        "YKSMANIA_SIGNING_STORE_PASSWORD",
      ],
      {
        env: {
          ...process.env,
          YKSMANIA_SIGNING_STORE_PASSWORD: secret.storePassword,
        },
        maxBuffer: 65536,
      },
    );
    if (exported.status !== 0)
      throw Error("Android signing certificate could not be verified");
    const certificate = new X509Certificate(exported.stdout);
    const pinned = (
      await fs.readFile(
        new URL("../android/signing-certificate.sha256", import.meta.url),
        "utf8",
      )
    ).trim();
    if (
      !/^[a-f0-9]{64}$/.test(pinned) ||
      certificate.fingerprint256.replaceAll(":", "").toLowerCase() !== pinned ||
      secret.certificateSha256 !== pinned
    )
      throw Error("Android keystore certificate mismatch");
    if (process.env.GITHUB_ACTIONS === "true") {
      for (const value of [
        secret.keystoreBase64,
        secret.storePassword,
        secret.keyPassword,
      ])
        console.log(`::add-mask::${value}`);
    }
    await fs.appendFile(
      envFile,
      [
        `YKSMANIA_ANDROID_KEYSTORE_PATH=${file}`,
        `YKSMANIA_ANDROID_STORE_PASSWORD=${secret.storePassword}`,
        `YKSMANIA_ANDROID_KEY_PASSWORD=${secret.keyPassword}`,
        `YKSMANIA_ANDROID_KEY_ALIAS=${secret.keyAlias}`,
        `YKSMANIA_ANDROID_CERT_SHA256=${secret.certificateSha256}`,
        "",
      ].join("\n"),
      { mode: 0o600 },
    );
    console.log(
      `Android signing certificate SHA256: ${secret.certificateSha256}`,
    );
  } catch (error) {
    await fs.rm(dir, { recursive: true, force: true });
    throw error;
  }
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    if (process.argv[2] === "--verify") {
      verifySigningReport(
        await fs.readFile(process.argv[3], "utf8"),
        process.env.YKSMANIA_ANDROID_CERT_SHA256,
      );
      console.log("Persistent Android APK certificate verified");
    } else await prepare();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
