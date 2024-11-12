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
