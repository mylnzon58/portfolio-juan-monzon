import { toAbsoluteUrl } from './urls';

export interface PersonSchemaInput {
  name: string;
  jobTitle: string;
  country: string;
  description: string;
  url: string;
  imageUrl: string;
  sameAs: string[];
  knowsAbout: string[];
}

export interface PageSeoInput {
  title: string;
  description: string;
  ogImagePath: string;
  ogImageAlt: string;
  pathname: string;
  site: URL | undefined;
}

const FALLBACK_ORIGIN = 'https://juan-monzon.mylnzon58.workers.dev';

/**
 * Genera URLs canónicas y metadatos Open Graph consistentes con el base path activo.
 */
export function buildPageSeo(input: PageSeoInput) {
  const canonicalUrl = toAbsoluteUrl(input.pathname, input.site, FALLBACK_ORIGIN);
  const ogImageUrl = toAbsoluteUrl(input.ogImagePath, input.site, FALLBACK_ORIGIN);

  return {
    title: input.title,
    description: input.description,
    canonicalUrl,
    ogImageUrl,
    ogImageAlt: input.ogImageAlt,
  };
}

/**
 * Construye el grafo JSON-LD de tipo Person para motores de búsqueda.
 */
export function buildPersonJsonLd(input: PersonSchemaInput): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: input.name,
    jobTitle: input.jobTitle,
    description: input.description,
    url: input.url,
    image: input.imageUrl,
    nationality: {
      '@type': 'Country',
      name: input.country,
    },
    sameAs: input.sameAs,
    knowsAbout: input.knowsAbout,
  };

  return JSON.stringify(schema);
}
