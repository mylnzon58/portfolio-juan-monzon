# Portfolio — Juan José Monzón

Sitio personal 100% estático construido con **Astro 5**, **TypeScript estricto**, **Tailwind CSS v4**, **Content Collections (Zod)**, animaciones CSS scroll-driven y parallax multicapa con **GSAP + ScrollTrigger** exclusivamente en el hero. Compatible con **Cloudflare Workers/Pages** (`/`) y **GitHub Pages** (`SITE_BASE`).

## Desarrollo local

```bash
npm install
npm run dev
```

Verificación de tipos y build de producción:

```bash
npm run build
npm run preview
```

## Cómo editar contenido (cero texto hardcodeado)

Todo el contenido, navegación, proyectos, archivo en producción y metadatos viven en `src/content/` con validación Zod en [`src/content.config.ts`](src/content.config.ts):

- **Perfil, hero, stack, archivo en producción, sobre mí, redes y SEO:** `src/content/site/profile.json`.
- **Los 6 proyectos principales:** archivos JSON en `src/content/projects/` (ordenados por `order`).
- **Imágenes:** capturas optimizadas automáticamente a **AVIF/WebP** desde `src/assets/images/`.

## Despliegue

### Cloudflare (producción activa)

- **URL en producción:** https://juan-monzon.mylnzon58.workers.dev/
- **Comando directo:**

```bash
npm run deploy
```

### GitHub Pages

La plantilla del workflow está en [`docs/github-pages-workflow.yml`](docs/github-pages-workflow.yml) (copiar a `.github/workflows/deploy-pages.yml` y habilitar **GitHub Actions** en Settings → Pages). Para validar localmente con subruta:

```bash
GITHUB_PAGES=true SITE_URL=https://mylnzon58.github.io SITE_BASE=/portfolio-juan-monzon npm run build
```
