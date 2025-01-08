import { ZodType, infer as ZodInfer, SafeParseReturnType } from "zod";
import { ZodValidationError } from "./error";
import { FyersResponse } from "@algodiary/types";

export function parseResponse<T extends ZodType>(
    rawRes: FyersResponse,
    schema: T
): ZodInfer<T> {
    const rawOrderRes = schema.safeParse(rawRes);
    if (!rawOrderRes.success) {
        throw new ZodValidationError(
            `Zod validation failed`,
            rawOrderRes.error
        );
    }
    return rawOrderRes.data;
}

export function validateResponse<T>(
    rawResponse: unknown,
    schema: ZodType<T>
): T {
    const parsed = schema.safeParse(rawResponse);
    if (!parsed.success) {
        throw new ZodValidationError("Zod validation failed", parsed.error);
    }
    return parsed.data;
}
