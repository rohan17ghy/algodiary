"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Bell,
  ChevronDown,
  LineChart,
  Menu,
  Moon,
  Plus,
  Search,
  Sun,
  User,
  X,
  Check,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Trash2,
  FileDown,
  LayoutDashboard,
  List,
  ShoppingCart,
  BarChart3,
  Wallet,
  ChevronUp,
  UserCog,
  Edit,
  MoreVertical,
  Activity,
  Briefcase,
  Info,
  Building2,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { debounce } from "lodash";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Header from "@/components/navbar/Header";
import Alert from "@/components/Alert";
import { MainArea } from "@/components/MainArea";
import { useSearch } from "@/hooks/useSearch";
import { accountsAtom } from "@algodiary/store";
import { useRecoilValue } from "recoil";

export default function UpdatedTradingInterface() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [watchlistStocks, setWatchlistStocks] = useState([
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
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tradesPerPage, setTradesPerPage] = useState(5);
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [activeAccountId, setActiveAccountId] = useState<number | null>(null);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showLeaveConfirmDialog, setShowLeaveConfirmDialog] = useState(false);
  const [intendedSection, setIntendedSection] = useState("");
  const [editingAccount, setEditingAccount] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<number | null>(null);
  const [showImportForm, setShowImportForm] = useState(false);
  const [showImportTrades, setShowImportTrades] = useState(false);

  const resetImportTradesState = () => {
    setShowImportTrades(false);
  };

  // useEffect(() => {
  //   const isDarkMode = localStorage.getItem("darkMode") === "true";
  //   setDarkMode(isDarkMode);
  //   if (isDarkMode) {
  //     document.documentElement.classList.add("dark");
  //   }
  // }, []);

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

  // const handleSearch = useCallback(
  //   debounce((term) => {
  //     setSearchTerm(term);
  //     const filteredResults = allInstruments.filter(
  //       (instrument) =>
  //         (activeTab === "all" ||
  //           instrument.type.toLowerCase() === activeTab) &&
  //         (instrument.symbol.toLowerCase().includes(term.toLowerCase()) ||
  //           instrument.name.toLowerCase().includes(term.toLowerCase()))
  //     );
  //     setSearchResults(filteredResults);
  //   }, 300),
  //   [activeTab]
  // );

  // useEffect(() => {
  //   useSearch(searchTerm);
  // }, [activeTab, useSearch, searchTerm]);

  const NavContent = () => (
    <nav className="space-y-2">
      {[
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "Watchlist", icon: List },
        { name: "Orders", icon: ShoppingCart },
        { name: "Positions", icon: BarChart3 },
        { name: "Funds", icon: Wallet },
        { name: "Trades", icon: LineChart },
        { name: "Accounts", icon: UserCog },
      ].map((item) => (
        <Button
          key={item.name}
          variant={
            activeSection === item.name.toLowerCase() ? "secondary" : "ghost"
          }
          className="w-full justify-start"
          onClick={() => handleNavItemClick(item.name.toLowerCase())}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.name}</span>
        </Button>
      ))}
    </nav>
  );

  const accounts = useRecoilValue(accountsAtom);
  // Get current trades
  const activeAccount =
    accounts.find((account) => account.id === activeAccountId) || accounts[0];
  const tradeHistory = activeAccount?.tradeHistory || [];
  const indexOfLastTrade = currentPage * tradesPerPage;
  const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;
  const currentTrades = tradeHistory.slice(indexOfFirstTrade, indexOfLastTrade);

  // Change page
  // const handleExportSelectedTrades = () => {
  //   const selectedTradesData = tradeHistory.filter((trade) =>
  //     selectedTrades.includes(trade.id)
  //   );
  //   const csvContent = [
  //     [
  //       "ID",
  //       "Open Date",
  //       "Symbol",
  //       "Status",
  //       "Close Date",
  //       "Entry Price",
  //       "Exit Price",
  //       "Net P&L",
  //       "Net ROI",
  //     ],
  //     ...selectedTradesData.map((trade) => [
  //       trade.id,
  //       trade.openDate,
  //       trade.symbol,
  //       trade.status,
  //       trade.closeDate,
  //       trade.entryPrice,
  //       trade.exitPrice,
  //       trade.netPL,
  //       trade.netROI,
  //     ]),
  //   ]
  //     .map((e) => e.join(","))
  //     .join("\n");

  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  //   const link = document.createElement("a");
  //   if (link.download !== undefined) {
  //     const url = URL.createObjectURL(blob);
  //     link.setAttribute("href", url);
  //     link.setAttribute("download", "selected_trades.csv");
  //     link.style.visibility = "hidden";
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // };

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
      {/* Header */}

      <Header onNavItemClick={handleNavItemClick} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - visible on larger screens */}
        <aside className="hidden lg:block w-64 border-r overflow-y-auto">
          <div className="p-4">
            <NavContent />
          </div>
        </aside>

        {/* Main Content */}

        <MainArea />
      </div>

      <Alert />
    </div>
  );
}
