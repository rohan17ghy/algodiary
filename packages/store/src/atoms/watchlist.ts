//import { Instrument } from "@/lib/";
import { atom } from "recoil";
import { Instrument } from "@/lib/types";

export const watchlistStocksAtom = atom<Instrument[]>({
  key: "watchlistStocks",
  default: [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 150.25,
      change: 2.5,
      category: "Technology",
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 2750.8,
      change: -1.2,
      category: "Technology",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 305.75,
      change: 0.8,
      category: "Technology",
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 3380.5,
      change: 1.5,
      category: "Consumer Cyclical",
    },
    {
      symbol: "FB",
      name: "Meta Platforms Inc.",
      price: 330.2,
      change: -0.5,
      category: "Communication Services",
    },
  ],
});
