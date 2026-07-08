import z from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'Enter a valid email' }),
  password: z.string().min(6, {
    message: 'Password must be longer than or equal to 6 characters.',
  }),
});

export type LoginType = z.infer<typeof loginSchema>;
