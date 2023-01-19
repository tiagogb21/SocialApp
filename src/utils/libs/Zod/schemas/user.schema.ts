import { z } from 'zod';

import { minPasswordLength } from '../../../data/constants';

const passwordForm = z
  .object({
    password: z.string().min(minPasswordLength),
    passwordConfirmation: z.string().min(minPasswordLength),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const userZodSchema = z.object({
  name: z.string(),
  username: z.string().min(6),
  email: z.coerce.string().email(),
  confirm: passwordForm,
  photo: z.string(),
  isActive: z.boolean(),
  token: z.string(),
});
