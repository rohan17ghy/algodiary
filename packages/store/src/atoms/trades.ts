import { atom } from "recoil";

export const showImportTradesAtom = atom({
  key: "showImportTrades",
  default: false,
});

export const currentPageAtom = atom({
  key: "currentPage",
  default: 1,
});

export const tradesPerPageAtom = atom({
  key: "tradesPerPage",
  default: 5,
});
