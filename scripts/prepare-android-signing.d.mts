export interface AndroidSigningSecret {
  version: 1;
  keystoreBase64: string;
  storePassword: string;
  keyPassword: string;
  keyAlias: string;
  certificateSha256: string;
  bytes: Buffer;
}
export function parseSigningSecret(raw: unknown): AndroidSigningSecret;
export function verifySigningReport(
  report: string,
  expected: string | undefined,
): void;
