import { z } from 'zod';

export const pictureZodSchema = z.object({
  name: z.string(),
  src: z.string(),
});
