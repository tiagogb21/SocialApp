import { z } from 'zod';

import { userZodSchema } from '../../utils/libs/Zod/schemas/user.schema';

export type IUser = z.infer<typeof userZodSchema>;
