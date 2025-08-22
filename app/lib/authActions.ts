'use server';

import { SignupFormSchema, FormState, SigninFormSchema } from './definitions/definitions';
import { createSession, deleteSession } from '@/app/lib/session';
import { zodErrorsToTree } from '@/app/lib/zodErrorsToTree';
import { CreateUser, Authorize } from '@/app/lib/actions';
import { redirect } from 'next/navigation';

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
        const user = await CreateUser(userName, userEmail, userPassword);
        await createSession(user.id);
        console.log('User created: ', user);
        return { ...state, errors: {}, success: true, message: 'Tạo tài khoản thành công' };
    } catch (err: any) {
        return { ...state, errors: { [err.field]: [err.message] }, success: false, message: `Tạo tài khoản thất bại` };
    }
}

export async function logout() {
    await deleteSession();
    redirect('/login');
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
        // Gọi server action trực tiếp
        const user = await Authorize(userEmail, userPassword);
        await createSession(user.id);
        return { ...state, errors: {}, success: true, message: 'Đăng nhập thành công' };
    } catch (err: any) {
        return { ...state, errors: { [err.field]: [err.message] }, success: false, message: `Đăng nhập thất bại` };
    }
}
