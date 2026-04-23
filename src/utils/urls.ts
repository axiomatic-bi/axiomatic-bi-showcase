const EXTERNAL_PATH_RE = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i;

export function normaliseBasePath(baseUrl: string = import.meta.env.BASE_URL): string {
  if (!baseUrl || baseUrl === "/") {
    return "/";
  }
  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
}

export function withBase(path: string, baseUrl: string = import.meta.env.BASE_URL): string {
  if (!path || EXTERNAL_PATH_RE.test(path) || path.startsWith("#")) {
    return path;
  }
  const basePrefix = normaliseBasePath(baseUrl);
  const cleanPath = path.replace(/^\/+/, "");
  return cleanPath ? `${basePrefix}${cleanPath}` : basePrefix;
}

export function stripBasePath(pathname: string, baseUrl: string = import.meta.env.BASE_URL): string {
  const basePrefix = normaliseBasePath(baseUrl);
  if (basePrefix === "/") {
    return pathname;
  }

  const basePathNoTrailingSlash = basePrefix.replace(/\/$/, "");
  if (pathname === basePathNoTrailingSlash || pathname === `${basePathNoTrailingSlash}/`) {
    return "/";
  }
  if (pathname.startsWith(`${basePathNoTrailingSlash}/`)) {
    return pathname.slice(basePathNoTrailingSlash.length);
  }
  return pathname;
}
