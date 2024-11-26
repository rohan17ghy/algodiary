import { z } from "zod";

export const Segment = z.enum(["NSE_EQ", "NSE_FNO"]);
export const OrderType = z.enum(["Buy", "Sell"]);
export const OrderStatus = z.enum(["Executed", "Pending", "Cancelled"]);

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
