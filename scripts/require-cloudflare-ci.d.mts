export function requireCloudflareCI(
  env?: Readonly<Record<string, string | undefined>>,
  request?: (url: URL, options: RequestInit) => Promise<Response>,
): Promise<number | null>;
