import { z } from 'zod';

export const postZodSchema = z.object({
  postedBy: z.string(),
  title: z.string(),
  photo: z.string(),
  description: z.string().min(20).optional(),
  comments: z.array(
    z.object({
      text: z.string(),
      postedBy: z.string(),
    })
  ).default([]),
  likes: z.object({
    users: z.array(z.string()),
  }).default({ users: [] }),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});
