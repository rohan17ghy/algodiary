import { ZodType, infer as ZodInfer, SafeParseReturnType } from "zod";
import { ZodValidationError } from "./error";
import { FyersResponse } from "@algodiary/types";

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
