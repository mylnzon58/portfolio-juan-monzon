/**
 * Prefija rutas relativas con `import.meta.env.BASE_URL` para soportar
 * Cloudflare Pages ("/") y GitHub Pages ("/nombre-repo/") sin cambios manuales.
 */
export function withBase(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${normalizedBase}${normalizedPath}`;
}

/**
 * Construye una URL absoluta canónica combinando `site` con la ruta solicitada.
 */
export function toAbsoluteUrl(path: string, site: URL | undefined, fallbackOrigin: string): string {
  const origin = site ? site.origin : fallbackOrigin;
  return new URL(withBase(path), origin).toString();
}

