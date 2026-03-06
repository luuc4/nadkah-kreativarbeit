import { defineCollection, z } from 'astro:content';

const arbeiten = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    order: z.number(),
  }),
});

const termine = defineCollection({
  type: 'content',
  schema: z.object({
    datum: z.union([z.string(), z.date()]).transform((val) => {
      if (val instanceof Date) {
        return val.toISOString().split('T')[0];
      }
      return val;
    }),
    uhrzeitStart: z.string(),
    uhrzeitEnde: z.string(),
    name: z.string(),
    standort: z.string(),
    adresse: z.string(),
  }),
});

const pages = defineCollection({
  type: 'data',
  schema: z.object({
    tagline: z.string().optional(),
    kreativkopfTitle: z.string().optional(),
    kreativkopfText1: z.string().optional(),
    kreativkopfText2: z.string().optional(),
    kontaktText: z.string().optional(),
  }),
});

export const collections = { arbeiten, termine, pages };
