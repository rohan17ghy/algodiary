import { z } from "zod";

export const Segment = z.enum(["NSE_EQ", "NSE_FNO"]);
export const OrderType = z.enum(["Buy", "Sell"]);
export const OrderStatus = z.enum(["Executed", "Pending", "Cancelled"]);

export const SymbolSchema = z.object({
    symbol: z.string(),
    name: z.string(),
    qty: z.number().optional(),
    exchange: z.string().optional(),
    price: z.number().optional(),
    change: z.number().optional(),
    category: z.string().optional(),
    type: z.enum(["Stocks", "Futures", "Options"]).optional(),
});

export const TimeframeSchema = z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(5),
    z.literal(10),
    z.literal(15),
    z.literal(20),
    z.literal(30),
    z.literal(60),
    z.literal(120),
    z.literal(240),
]);

export const OrderSchema = z.object({
    id: z.string().uuid(),
    date: z.date(),
    segment: Segment,
    symbol: z.string(),
    type: OrderType,
    quantity: z.number(),
    price: z.number(),
    trade_val: z.number(),
    order_id: z.string(),
    status: OrderStatus.optional(),
});

export const TradeSchema = z.object({
    id: z.string(),
    entryDate: z.date(),
    exitDate: z.date(),
    symbol: z.string(),
    entryPrice: z.number(),
    exitPrice: z.number(),
    pnl: z.number(),
    roi: z.number().optional(),
});

export const CandleSchema = z.object({
    time: z.number(),
    open: z.number(),
    high: z.number(),
    low: z.number(),
    close: z.number(),
    volume: z.number(),
});
