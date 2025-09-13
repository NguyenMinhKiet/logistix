export class AppError extends Error {
    field?: string;
    status?: number;

    constructor(message: string, field?: string, status?: number) {
        super(message);
        this.name = 'AppError';
        this.field = field;
        this.status = status;
    }
}
