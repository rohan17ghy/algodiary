import { Account } from "@algodiary/types";
import { atom } from "recoil";

export const accountsAtom = atom<Account[]>({
  key: "accounts",
  default: [
    {
      id: 1,
      name: "Option Selling Strategy",
      broker: "Zerodha",
      type: "Derivative",
      balance: 50000,
      profitLoss: 1500,
      trades: 25,
      tradeHistory: [
        {
          id: "1",
          openDate: "2023-05-01",
          symbol: "NIFTY",
          status: "Closed",
          closeDate: "2023-05-03",
          entryPrice: 17500,
          exitPrice: 17550,
          netPL: 5000,
          netROI: 2.86,
        },
        {
          id: "2",
          openDate: "2023-05-02",
          symbol: "BANKNIFTY",
          status: "Open",
          closeDate: "-",
          entryPrice: 40000,
          exitPrice: "-",
          netPL: 1500,
          netROI: 0.75,
        },
      ],
    },
    {
      id: 2,
      name: "Long-term Equity",
      broker: "Fyers",
      type: "Equity",
      balance: 100000,
      profitLoss: 0,
      trades: 0,
      tradeHistory: [],
    },
    {
      id: 3,
      name: "Day Trading",
      broker: "Dhan",
      type: "Equity",
      balance: 25000,
      profitLoss: 750,
      trades: 50,
      tradeHistory: [
        {
          id: "5",
          openDate: "2023-05-15",
          symbol: "INFY",
          status: "Closed",
          closeDate: "2023-05-15",
          entryPrice: 1300,
          exitPrice: 1320,
          netPL: 1000,
          netROI: 1.54,
        },
        {
          id: "6",
          openDate: "2023-05-16",
          symbol: "HDFCBANK",
          status: "Closed",
          closeDate: "2023-05-16",
          entryPrice: 1600,
          exitPrice: 1590,
          netPL: -500,
          netROI: -0.63,
        },
      ],
    },
  ],
});

export const activeAccountIdAtom = atom<number | null>({
  key: "activeAccountId",
  default: null,
});

export const showAddAccountAtom = atom({
  key: "showAddAccount",
  default: false,
});

export const accountToDeleteAtom = atom<number | null>({
  key: "accountToDelete",
  default: null,
});

export const editingAccountAtom = atom<number | null>({
  key: "editingAtom",
  default: null,
});
