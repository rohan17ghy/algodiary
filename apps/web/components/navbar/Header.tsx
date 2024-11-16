"use client";

import { useState, useCallback } from "react";
import { Bell, Menu, Moon, Search, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { debounce } from "lodash";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeSectionAtom,
  darkModeAtom,
  showAddAccountAtom,
  isFormDirtyAtom,
  isNavOpenAtom,
  showLeaveConfirmDialogAtom,
  intendedSectionAtom,
  showImportTradesAtom,
  searchTermAtom,
  searchResultsAtom,
  activeTabAtom,
} from "@algodiary/store";
import { NavContent } from "@/components/navbar/NavContent";
import type { Instrument } from "@algodiary/types";
import { useSearch } from "@/hooks/useSearch";

const allInstruments: Instrument[] = [
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

export const Header = ({
  onNavItemClick,
}: {
  onNavItemClick: (section: string) => void;
}) => {
  const [darkMode, setDarkMode] = useRecoilState(darkModeAtom);
  const [showAddAccount, setShowAddAccount] =
    useRecoilState(showAddAccountAtom);
  const isFormDirty = useRecoilValue(isFormDirtyAtom);
  const [isNavOpen, setIsNavOpen] = useRecoilState(isNavOpenAtom);
  const [activeSection, setActiveSection] = useRecoilState(activeSectionAtom);
  const setShowLeaveConfirmDialog = useSetRecoilState(
    showLeaveConfirmDialogAtom
  );
  const setIntendedSection = useSetRecoilState(intendedSectionAtom);
  const setShowImportTrades = useSetRecoilState(showImportTradesAtom);
  const setSearchTerm = useSetRecoilState(searchTermAtom);
  const setSearchResults = useSetRecoilState(searchResultsAtom);
  const activeTab = useRecoilValue(activeTabAtom);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", (!darkMode).toString());
    document.documentElement.classList.toggle("dark");
  };

  const resetImportTradesState = () => {
    setShowImportTrades(false);
  };

  // const handleSearch = useCallback(
  //   debounce((term) => {
  //     setSearchTerm(term);
  //     const filteredResults = allInstruments.filter(
  //       (instrument) =>
  //         (activeTab === "all" ||
  //           instrument.type?.toLowerCase() === activeTab) &&
  //         (instrument.symbol.toLowerCase().includes(term.toLowerCase()) ||
  //           instrument.name.toLowerCase().includes(term.toLowerCase()))
  //     );
  //     setSearchResults(filteredResults);
  //   }, 300),
  //   [activeTab]
  // );

  return (
    <header className="flex items-center justify-between h-16 px-4 border-b">
      <div className="flex items-center space-x-4">
        <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex items-center h-16 px-4 border-b">
              <span className="text-2xl font-semibold">TradePro</span>
            </div>
            <div className="p-4">
              <NavContent onNavItemClick={onNavItemClick} />
            </div>
          </SheetContent>
        </Sheet>
        <span className="text-xl font-semibold">TradePro</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 w-[200px] md:w-[300px]"
            onChange={(e) => useSearch(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onNavItemClick("accounts")}>
              Manage Account
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
