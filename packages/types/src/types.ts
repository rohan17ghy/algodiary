// export enum InstrumentType {
//   Stocks,
//   Options,
//   Futures,
// }

export type Instrument = {
  symbol: string;
  name: string;
  exchange?: string;
  price?: number;
  change?: number;
  category?: string;
  type?: "Stocks" | "Futures" | "Options";
};

export type Order = {
  id: string;
  symbol: string;
  type: "Buy" | "Sell";
  quantity: number;
  price: number;
  status: "Executed" | "Pending" | "Cancelled";
};
