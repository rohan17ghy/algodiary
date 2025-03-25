export class ZodValidationError extends Error {
    public error;
    constructor(message: string, error: any) {
        super();
        this.name = "ZodValidationError";
        this.message = message;
        this.error = error;
    }
}
