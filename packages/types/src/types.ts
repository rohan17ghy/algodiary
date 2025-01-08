import { z } from "zod";
import {
    CandleSchema,
    OrderSchema,
    SymbolSchema,
    TimeframeSchema,
    TradeSchema,
} from "./zod/schema/technicalSchema";
import { FyersResponseSchema } from "./zod/schema/fyersSchema";

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

export type Margin = {
    symbol: string;
    qty: number;
    side: 1 | -1;
    type: 1 | 2 | 3 | 4;
    productType: "CNC" | "INTRADAY" | "MARGIN" | "CO" | "BO";
    limitPrice: number;
    stopLoss: number;
};

export type FyersResponse = z.infer<typeof FyersResponseSchema>;
export type Symbol = z.infer<typeof SymbolSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type Trade = z.infer<typeof TradeSchema>;
export type Timeframe = z.infer<typeof TimeframeSchema>;
export type Candle = z.infer<typeof CandleSchema>;
