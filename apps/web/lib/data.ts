import { Instrument, Order } from "@algodiary/types";

export const allInstruments: Instrument[] = [
  { symbol: "AAPL", name: "Apple Inc.", exchange: "NASDAQ", type: "Stocks" },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    exchange: "NASDAQ",
    type: "Stocks",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    exchange: "NASDAQ",
    type: "Stocks",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    exchange: "NASDAQ",
    type: "Stocks",
  },
  {
    symbol: "FB",
    name: "Meta Platforms Inc.",
    exchange: "NASDAQ",
    type: "Stocks",
  },
  { symbol: "TSLA", name: "Tesla Inc.", exchange: "NASDAQ", type: "Stocks" },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    exchange: "NASDAQ",
    type: "Stocks",
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    exchange: "NYSE",
    type: "Stocks",
  },
  {
    symbol: "ES",
    name: "E-mini S&P 500 Futures",
    exchange: "CME",
    type: "Futures",
  },
  { symbol: "GC", name: "Gold Futures", exchange: "COMEX", type: "Futures" },
  {
    symbol: "AAPL220617C00150000",
    name: "AAPL Jun 17 2022 150 Call",
    exchange: "CBOE",
    type: "Options",
  },
  {
    symbol: "GOOGL220617P02000000",
    name: "GOOGL Jun 17 2022 2000 Put",
    exchange: "CBOE",
    type: "Options",
  },
];

export const stockInstruments = allInstruments.filter(
  (instrument) => instrument.type === "Stocks"
);
export const futureInstruments = allInstruments.filter(
  (instrument) => instrument.type === "Futures"
);
export const optionInstruments = allInstruments.filter(
  (instrument) => instrument.type === "Options"
);

export const sampleOrders: Order[] = [
  {
    id: "ORD001",
    symbol: "AAPL",
    type: "Buy",
    quantity: 100,
    price: 150.25,
    status: "Executed",
  },
  {
    id: "ORD002",
    symbol: "GOOGL",
    type: "Sell",
    quantity: 50,
    price: 2750.8,
    status: "Pending",
  },
  {
    id: "ORD003",
    symbol: "MSFT",
    type: "Buy",
    quantity: 75,
    price: 305.75,
    status: "Executed",
  },
  {
    id: "ORD004",
    symbol: "AMZN",
    type: "Sell",
    quantity: 25,
    price: 3380.5,
    status: "Cancelled",
  },
];
