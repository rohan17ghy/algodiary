import { z } from "zod";
import { CandleSchema } from "@algodiary/types";

const FyersCandleSchema = z.array(z.number()).length(6);

export const HistorySchema = z.object({
    s: z.literal("ok"),
    code: z.number(),
    message: z.string(),
    candles: z.array(FyersCandleSchema),
});
