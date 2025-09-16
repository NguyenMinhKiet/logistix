// Base interface for common form state properties
interface BaseFormState {
    success?: boolean;
    message?: string;
}

// Generic type for form errors
type FormErrors<T> = {
    errors?: Partial<T>;
};

// Driver form error fields
interface DriverFormErrors {
    name?: string[];
    phone?: string[];
    imageUrl?: string[];
    license?: string[];
}

// Auth form error fields
interface AuthFormErrors {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
}

// Specific form states using composition
export type FormState = (BaseFormState & FormErrors<DriverFormErrors>) | undefined;
export type SignUpFormState = (BaseFormState & FormErrors<AuthFormErrors>) | undefined;
export type LoginFormState = (BaseFormState & FormErrors<AuthFormErrors>) | undefined;
