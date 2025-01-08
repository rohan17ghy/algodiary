import { z } from "zod";
import { CandleSchema } from "@algodiary/types";
import type { Symbol } from "@algodiary/types";

const Exchange = z.union([
    z.literal(10),
    z.literal(11),
    z.literal(12),
    z.literal(20),
]);

export const ProductType = z.enum(["CNC", "INTRADAY", "MARGIN", "CO", "BO"]);

export const Validity = z.enum(["IOC", "DAY"]);

const FyersCandleSchema = z.array(z.number()).length(6);

const FyersPositionSchema = z.object({
    netQty: z.number(),
    qty: z.number(),
    netAvg: z.number(),
    side: z.number(),
    productType: ProductType,
    realized_profit: z.number(),
    unrealized_profit: z.number(),
    pl: z.number(),
    ltp: z.number(),
    buyQty: z.number(),
    buyAvg: z.number(),
    buyVal: z.number(),
    sellQty: z.number(),
    sellAvg: z.number(),
    sellVal: z.number(),
    slNo: z.number(),
    fyToken: z.string(),
    crossCurrency: z.union([z.literal("Y"), z.literal("N"), z.literal("")]),
    rbiRefRate: z.number(),
    qtyMulti_com: z.number(),
    segment: Exchange,
    symbol: z.string(),
    id: z.string(),
    cfBuyQty: z.number(),
    cfSellQty: z.number(),
    dayBuyQty: z.number(),
    daySellQty: z.number(),
    exchange: Exchange,
});

export const FyersResponseSchema = z.object({
    s: z.literal("ok"),
    code: z.number(),
    message: z.string(),
});

export const FyersResponseHistorySchema = FyersResponseSchema.extend({
    candles: z.array(FyersCandleSchema),
});

export const FyersResponsePositionSchema = FyersResponseSchema.extend({
    netPositions: z.array(FyersPositionSchema),
    overall: z.object({
        count_total: z.number(),
        count_open: z.number(),
        pl_total: z.number(),
        pl_realized: z.number(),
        pl_unrealized: z.number(),
    }),
});

export const FyersResponseOrderSchema = FyersResponseSchema.extend({
    id: z.string(),
});
