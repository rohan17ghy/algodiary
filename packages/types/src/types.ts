// export enum InstrumentType {
//   Stocks,
//   Options,
//   Futures,
// }

import { z } from "zod";
import {
    CandleSchema,
    OrderSchema,
    TimeframeSchema,
    TradeSchema,
} from "./zod/technicalSchema";

export type Symbol = {
    symbol: string;
    name: string;
    exchange?: string;
    price?: number;
    change?: number;
    category?: string;
    type?: "Stocks" | "Futures" | "Options";
};

// export type Order = {
//   id: string;
//   symbol: string;
//   type: "Buy" | "Sell";
//   quantity: number;
//   price: number;
//   status: "Executed" | "Pending" | "Cancelled";
// };

export type Position = {
    symbol: string;
    quantity: number;
    avgCost: number;
    currentPrice: number;
};

export type Account = {
    id: number;
    name: string;
    broker: string;
    type: string;
    balance: number;
    profitLoss: number;
    trades: number;
    tradeHistory: {
        id: string;
        openDate: string;
        symbol: string;
        status: "Open" | "Closed";
        closeDate: string;
        entryPrice: number;
        exitPrice: number | "-";
        netPL: number;
        netROI: number;
    }[];
};

export type Order = z.infer<typeof OrderSchema>;
export type Trade = z.infer<typeof TradeSchema>;
export type Timeframe = z.infer<typeof TimeframeSchema>;
export type Candle = z.infer<typeof CandleSchema>;
