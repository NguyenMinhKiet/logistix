import { z } from 'zod';

export const SigninFormSchema = z.object({
    email: z.email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string().min(6, { message: 'Be at least 6 characters long' }).trim(),
});

export const SignupFormSchema = z
    .object({
        name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
        email: z.email({ message: 'Please enter a valid email.' }).trim(),
        password: z
            .string()
            .min(6, { message: 'Be at least 6 characters long' })
            .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
            .regex(/[0-9]/, { message: 'Contain at least one number.' })
            .regex(/[^a-zA-Z0-9]/, {
                message: 'Contain at least one special character.',
            })
            .trim(),
        confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export type FormState =
    | {
          success?: boolean;
          errors?: {
              name?: string[];
              email?: string[];
              password?: string[];
              confirmPassword?: string[];
          };
          message?: string;
      }
    | undefined;

// Session
export type SessionPayload = {
    sessionId?: string;
    userId?: string;
    userName?: string;
    userRole?: string;
    expiresAt?: Date;
};
