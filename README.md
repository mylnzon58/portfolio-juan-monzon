# Portfolio — Juan José Monzón

Sitio personal 100% estático construido con **Astro 5**, **TypeScript estricto**, **Tailwind CSS v4** y colecciones de contenido validadas con **Zod**. Listo para desplegar en **Cloudflare Pages** (raíz `/`) y **GitHub Pages** (con `SITE_BASE`).

## Desarrollo local

```bash
npm install
npm run dev
```

Compilación y verificación de tipos:

```bash
npm run build
npm run preview
```

## Cómo editar contenido (sin tocar componentes)

Todo el texto, links, stack y proyectos viven en `src/content/` y se validan en tiempo de build mediante [`src/content.config.ts`](src/content.config.ts):

- **Perfil, hero, stack, sobre mí, redes y SEO:** editar `src/content/site/profile.json`.
- **Proyectos destacados:** editar o agregar archivos JSON en `src/content/projects/` (ordenados por el campo `order`).
- **Imágenes:** guardar capturas en `src/assets/images/` y referenciarlas con ruta relativa desde el JSON (Astro genera automáticamente variantes **AVIF** y **WebP**).
- **Pendientes marcados (`TODO`):** revisar `meta.todoNotes` y `sections.contact.emailTodo` en `profile.json`, además de `todo` en `01-anuncero.json`, `02-remises-next.json` y `05-cheya.json` cuando tengas capturas públicas definitivas o casilla profesional.

## Despliegue

### Cloudflare (despliegue activo)

- **URL en producción:** https://juan-monzon.mylnzon58.workers.dev/
- **Despliegue directo desde terminal:**

```bash
npm run deploy
```

- También soporta conexión Git en **Cloudflare Workers / Pages** con `npm run build` y salida `dist` (opcionalmente configurando `SITE_URL=https://tu-dominio.com`). El archivo `public/_headers` aplica encabezados de seguridad y caché inmutable para `/_astro/*`.

### GitHub Pages

La plantilla del workflow está lista en `docs/github-pages-workflow.yml`:

1. Copiar `docs/github-pages-workflow.yml` a `.github/workflows/deploy-pages.yml` (requiere permisos de workflow en GitHub).
2. En **Settings → Pages**, elegir **GitHub Actions** como fuente.
3. Al hacer push a `main`, el workflow calcula automáticamente `SITE_URL` y `SITE_BASE` y publica `dist/`.
3. Para probar localmente con prefijo de subruta:

```bash
SITE_URL=https://mylnzon58.github.io SITE_BASE=/portfolio-juan-monzon npm run build
```

