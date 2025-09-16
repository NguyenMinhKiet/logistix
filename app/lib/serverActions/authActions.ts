'use server';

import { zodErrorsToTree } from '@/app/helpers/zodErrorsToTree';
import { LoginFormState, SignUpFormState } from '@/app/types/formState';
import { SigninFormSchema, SignupFormSchema } from '../formSchema';
import { sessionService } from '@/app/services/sessionService';
import { authService } from '@/app/services/authService';

export async function signUp(state: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
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
        const user = await authService.createUser(userName, userEmail, userPassword);
        await sessionService.createSession(user.id);
        return { success: true, message: 'Tạo tài khoản thành công' };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Tạo tài khoản thất bại',
        };
    }
}

export async function signIn(state: LoginFormState, formData: FormData): Promise<LoginFormState> {
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
        const isLogged = await sessionService.getCurrentUser();
        if (isLogged) return { success: true, message: `Xin chào ${isLogged.name}` };

        // Gọi server action trực tiếp
        const user = await authService.authorize(userEmail, userPassword);

        // Create new session
        await sessionService.createSession(user.id);
        return { success: true, message: 'Đăng nhập thành công' };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Đăng nhập thất bại',
        };
    }
}

export async function logout() {
    try {
        await sessionService.deleteSession();
        return { success: true, message: 'Đăng xuất thành công' };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Đăng xuất thất bại',
        };
    }
}
