import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  tags: z.array(z.string()),
  authors: z.array(
    z.object({
      name: z.string(),
      avatar: z.string().optional(),
      site: z.string().optional(),
    })
  ),
  links: z.object({
    repo: z.string().url(),
    demo: z.string().url().optional(),
  }),
  image: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
