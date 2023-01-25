import { z } from 'zod';

import { postZodSchema } from '../../utils/libs/Zod/schemas/post.schema';

export type IPost = z.infer<typeof postZodSchema>;
