'use server';

import { createSession, deleteSession, getCurrentUser } from '@/app/lib/session';
import { zodErrorsToTree } from '@/app/lib/zodErrorsToTree';
import { createUser, authorize } from '@/app/lib/actions';
import { FormState } from '../types';
import { SigninFormSchema, SignupFormSchema } from './formSchema';

export async function signUp(state: FormState, formData: FormData): Promise<FormState> {
    const userName = formData.get('name') as string;
    const userEmail = formData.get('email') as string;
    const userPassword = formData.get('password') as string;
    const userConfirmPassword = formData.get('confirmPassword') as string;

    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: userName,
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword,
    });

    if (!validatedFields.success) {
        return {
            errors: zodErrorsToTree(validatedFields.error),
        };
    }
    try {
        // Gọi server action trực tiếp
        const user = await createUser(userName, userEmail, userPassword);
        await createSession(user.id);
        return { success: true, message: 'Tạo tài khoản thành công' };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message ?? 'Tạo tài khoản thất bại' };
        } else {
            console.log(error);
        }
    }
}

export async function logout() {
    try {
        await deleteSession();
        return { success: true, message: 'Đăng xuất thành công' };
    } catch (error) {
        if (error instanceof Error) {
            return { success: true, message: error.message };
        } else {
            console.log(error);
        }
    }
}

export async function signIn(state: FormState, formData: FormData): Promise<FormState> {
    const userEmail = formData.get('email') as string;
    const userPassword = formData.get('password') as string;

    // Validate form fields
    const validatedFields = SigninFormSchema.safeParse({
        email: userEmail,
        password: userPassword,
    });

    if (!validatedFields.success) {
        return {
            errors: zodErrorsToTree(validatedFields.error),
        };
    }

    try {
        // Check user Logged
        const isLogged = await getCurrentUser();
        if (isLogged) return { success: true, message: `Xin chào ${isLogged.name}` };

        // Gọi server action trực tiếp
        const user = await authorize(userEmail, userPassword);

        // Create new session
        await createSession(user.id);
        return { success: true, message: 'Đăng nhập thành công' };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message ?? 'Đăng nhập thất bại' };
        } else {
            console.log(error);
        }
    }
}
