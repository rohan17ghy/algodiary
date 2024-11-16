"use client";

import { useSetRecoilState, useRecoilValue } from "recoil";
import { allInstruments } from "@/lib/data";
import { debounce } from "lodash";
import {
  activeTabAtom,
  searchResultsAtom,
  searchTermAtom,
} from "@algodiary/store";

export const useSearch = (term: string) => {
  const setSearchTerm = useSetRecoilState(searchTermAtom);
  const setSearchResults = useSetRecoilState(searchResultsAtom);
  const activeTab = useRecoilValue(activeTabAtom);

  debounce(() => {
    setSearchTerm(term);
    const filteredResults = allInstruments.filter(
      (instrument) =>
        (activeTab === "all" || instrument.type?.toLowerCase() === activeTab) &&
        (instrument.symbol.toLowerCase().includes(term.toLowerCase()) ||
          instrument.name.toLowerCase().includes(term.toLowerCase()))
    );
    setSearchResults(filteredResults);
  }, 300);
};
