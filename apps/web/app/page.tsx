"use client";

import { useState, useCallback, useEffect } from "react";
import Header from "@/components/navbar/Header";
import Alert from "@/components/Alert";
import NavContent from "@/components/navbar/NavContent";
import { MainArea } from "@/components/MainArea";
import { useSearch } from "@/hooks/useSearch";
import {
  accountsAtom,
  activeSectionAtom,
  isNavOpenAtom,
} from "@algodiary/store";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export default function UpdatedTradingInterface() {
  const [activeSection, setActiveSection] = useRecoilState(activeSectionAtom);
  const setIsNavOpen = useSetRecoilState(isNavOpenAtom);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tradesPerPage, setTradesPerPage] = useState(5);

  const [activeAccountId, setActiveAccountId] = useState<number | null>(null);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showLeaveConfirmDialog, setShowLeaveConfirmDialog] = useState(false);
  const [intendedSection, setIntendedSection] = useState("");
  const [showImportTrades, setShowImportTrades] = useState(false);

  const resetImportTradesState = () => {
    setShowImportTrades(false);
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleNavItemClick = (section: string) => {
    if (activeSection === "accounts" && showAddAccount && isFormDirty) {
      setIntendedSection(section);
      setShowLeaveConfirmDialog(true);
    } else {
      setActiveSection(section);
      setIsNavOpen(false);
      resetImportTradesState();
      if (section === "accounts") {
        setShowAddAccount(false);
      }
    }
  };

  return (
    <div className={`flex flex-col h-screen bg-background text-foreground`}>
      <style jsx global>{`
        /* Custom scrollbar styles */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 8px;
        }
        ::-webkit-scrollbar-thumb {
          background: hsl(var(--border));
          border-radius: 8px;
          border: 2px solid transparent;
          background-clip: content-box;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--border));
          border: 2px solid transparent;
          background-clip: content-box;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: hsl(var(--border)) transparent;
        }
      `}</style>
      <Header onNavItemClick={handleNavItemClick} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden lg:block w-64 border-r overflow-y-auto">
          <div className="p-4">
            <NavContent onNavItemClick={handleNavItemClick} />
          </div>
        </aside>
        <MainArea />
      </div>
      <Alert />
    </div>
  );
}
