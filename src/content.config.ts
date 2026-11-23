import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const navItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  external: z.boolean().optional().default(false),
});

const socialLinkSchema = z.object({
  id: z.enum([
    'email',
    'linkedin',
    'github',
    'instagram',
    'sponsors',
    'tecito',
    'patreon',
    'mercadopago',
  ]),
  label: z.string().min(1),
  handle: z.string().min(1),
  href: z.string().min(1),
  group: z.enum(['primary', 'support']),
});

const stackGroupSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  icon: z.enum(['layers', 'server', 'cpu', 'compass']),
  summary: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

const highlightSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

const archiveItemSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  metric: z.string().min(1),
  href: z.string().url().optional(),
  privateLabel: z.string().optional(),
});

// Colección singleton con identidad, navegación, textos, archivo en producción y SEO
const site = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/site' }),
  schema: ({ image }) =>
    z.object({
      meta: z.object({
        lang: z.string().default('es-AR'),
        title: z.string().min(1),
        description: z.string().min(1),
        ogImage: z.string().min(1),
        ogImageAlt: z.string().min(1),
        jobTitle: z.string().min(1),
        country: z.string().min(1),
        sameAs: z.array(z.string().url()),
      }),
      a11y: z.object({
        skipToContent: z.string().min(1),
        primaryNavLabel: z.string().min(1),
        socialNavLabel: z.string().min(1),
        backToTopLabel: z.string().min(1),
      }),
      header: z.object({
        monogram: z.string().min(1),
        brandName: z.string().min(1),
        nav: z.array(navItemSchema).min(1),
        cta: ctaSchema,
      }),
      hero: z.object({
        locationLine: z.string().min(1),
        fullName: z.string().min(1),
        roleLine: z.string().min(1),
        thesis: z.string().min(1),
        primaryCta: ctaSchema,
        secondaryCta: ctaSchema,
        coverImage: image(),
        coverAlt: z.string().min(1),
        coverCaption: z.string().min(1),
        avatarImage: image(),
        avatarAlt: z.string().min(1),
        ledger: z.array(
          z.object({
            value: z.string().min(1),
            label: z.string().min(1),
          }),
        ),
      }),
      sections: z.object({
        projects: z.object({
          title: z.string().min(1),
          subtitle: z.string().min(1),
          demoLabel: z.string().min(1),
          repoLabel: z.string().min(1),
          storeLabel: z.string().min(1),
          archiveTitle: z.string().min(1),
          archiveItems: z.array(archiveItemSchema).min(1),
        }),
        stack: z.object({
          title: z.string().min(1),
          subtitle: z.string().min(1),
          groups: z.array(stackGroupSchema).min(1),
        }),
        about: z.object({
          title: z.string().min(1),
          paragraphs: z.array(z.string().min(1)).min(1).max(4),
          highlights: z.array(highlightSchema).min(1),
          availabilityLabel: z.string().min(1),
          availabilityValue: z.string().min(1),
        }),
        contact: z.object({
          title: z.string().min(1),
          subtitle: z.string().min(1),
          primaryCta: ctaSchema,
          secondaryCta: ctaSchema,
          channelsTitle: z.string().min(1),
          supportTitle: z.string().min(1),
          copyright: z.string().min(1),
          builtWith: z.string().min(1),
        }),
      }),
      socials: z.array(socialLinkSchema).min(1),
    }),
});

// Colección de los 6 proyectos principales en producción y código abierto
const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      order: z.number().int().min(1),
      indexLabel: z.string().min(1),
      layoutVariant: z.enum(['featured', 'wide', 'compact', 'featured-reverse']),
      title: z.string().min(1),
      category: z.string().min(1),
      metric: z.string().min(1),
      summary: z.string().min(1),
      outcome: z.string().min(1),
      stack: z.array(z.string().min(1)).min(1),
      image: image(),
      imageAlt: z.string().min(1),
      mediaTone: z.enum(['light', 'dark']).optional().default('dark'),
      mediaPosition: z.enum(['top', 'center']).optional().default('center'),
      mediaFit: z.enum(['cover', 'contain']).optional().default('cover'),
      mediaAspect: z.enum(['16/9', '16/10']).optional().default('16/10'),
      links: z.object({
        demo: z.string().url().optional(),
        repo: z.string().url().optional(),
        store: z.string().url().optional(),
      }),
    }),
});

export const collections = { site, projects };
