import { Instrument } from "./../../../../apps/web/lib/types";
import { atom } from "recoil";

export const searchTermAtom = atom({
  key: "searchTerm",
  default: "",
});

export const searchResultsAtom = atom<Instrument[]>({
  key: "searchResults",
  default: [],
});
