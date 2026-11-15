import { expect, it } from "vitest";
import {
  parseSigningSecret,
  verifySigningReport,
} from "../scripts/prepare-android-signing.mjs";

// Synthetic configuration only. Real signing material is never a repository fixture.
const valid = {
  version: 1,
  keystoreBase64: Buffer.alloc(2048, 1).toString("base64"),
  storePassword: "a".repeat(64),
  keyPassword: "a".repeat(64),
  keyAlias: "yksmania",
  certificateSha256: "b".repeat(64),
};
it("decodes a bounded signing configuration without changing its identity", () => {
  const parsed = parseSigningSecret(JSON.stringify(valid));
  expect(parsed.bytes).toEqual(Buffer.alloc(2048, 1));
  expect(parsed.keyAlias).toBe(valid.keyAlias);
  expect(parsed.certificateSha256).toBe(valid.certificateSha256);
});
it("rejects missing keys, ambiguous encoding, oversized material and environment-line injection", () => {
  for (const raw of [
    undefined,
    "not JSON",
    "null",
    "[]",
    "{}",
    "x".repeat(65537),
  ])
    expect(() => parseSigningSecret(raw)).toThrow();
  for (const changes of [
    { version: 2 },
    { unexpected: true },
    { keystoreBase64: "!!!!" },
    { keystoreBase64: Buffer.alloc(100).toString("base64") },
    { keystoreBase64: Buffer.alloc(32769).toString("base64") },
    { keystoreBase64: valid.keystoreBase64 + "\n" },
    { storePassword: "a\nINJECTED=value" },
    { keyPassword: "c".repeat(64) },
    { keyAlias: "a\nINJECTED=value" },
    { certificateSha256: "not a certificate" },
  ])
    expect(() =>
      parseSigningSecret(JSON.stringify({ ...valid, ...changes })),
    ).toThrow();
});
it("requires the APK to have one exact persistent certificate and a valid v2 signature", () => {
  const report = `Verifies\nVerified using v2 scheme (APK Signature Scheme v2): true\nV2 Signer: certificate SHA-256 digest: ${valid.certificateSha256}\n`;
  expect(() =>
    verifySigningReport(report, valid.certificateSha256),
  ).not.toThrow();
  for (const [text, fingerprint] of [
    [report, undefined],
    [report, "c".repeat(64)],
    [report.replace(": true", ": false"), valid.certificateSha256],
    [
      report +
        `Signer #2 certificate SHA-256 digest: ${valid.certificateSha256}\n`,
      valid.certificateSha256,
    ],
    ["Verifies", valid.certificateSha256],
  ] as const)
    expect(() => verifySigningReport(text, fingerprint)).toThrow();
});
