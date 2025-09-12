import { z } from 'zod';

export const SigninFormSchema = z.object({
    email: z.email({ message: 'Vui lòng nhập Email' }).trim(),
    password: z.string().min(6, { message: 'Vui lòng nhập Mật khẩu' }).trim(),
});

export const SignupFormSchema = z
    .object({
        name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự' }).trim(),
        email: z.email({ message: 'Vui lòng nhập Email hợp lệ' }).trim(),
        password: z
            .string()
            .min(6, { message: 'Phải có ít nhất 6 ký tự.' })
            .regex(/[a-zA-Z]/, { message: 'Có ít nhất 1 chữ cái.' })
            .regex(/[0-9]/, { message: 'Có ít nhất 1 số.' })
            .regex(/[^a-zA-Z0-9]/, {
                message: 'Có ít nhất 1 ký tự đặc biệt.',
            })
            .trim(),
        confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu nhập lại không trùng',
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
