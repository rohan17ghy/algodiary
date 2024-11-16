"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  ChevronDown,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileDown,
  ChevronUp,
  Info,
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRecoilState } from "recoil";
import {
  accountsAtom,
  activeAccountIdAtom,
  currentPageAtom,
  showImportTradesAtom,
  tradesPerPageAtom,
} from "@algodiary/store";
import type { Account } from "@algodiary/types";

export const Trades = () => {
  const [showImportTrades, setShowImportTrades] =
    useRecoilState(showImportTradesAtom);
  const [accounts, setAccounts] = useRecoilState(accountsAtom);
  const [activeAccountId, setActiveAccountId] = useRecoilState<number | null>(
    activeAccountIdAtom
  );

  const activeAccount = useMemo(() => {
    return (
      accounts.find((account) => account.id === activeAccountId) || accounts[0]
    );
  }, [activeAccountId]);

  const tradeHistory = activeAccount?.tradeHistory || [];
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const [tradesPerPage, setTradesPerPage] = useRecoilState(tradesPerPageAtom);
  const indexOfLastTrade = currentPage * tradesPerPage;
  const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;
  const currentTrades = tradeHistory.slice(indexOfFirstTrade, indexOfLastTrade);
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleImportTrades = useCallback(() => {
    // Handle the import logic here
    console.log("Trades imported successfully");
    setShowImportTrades(false);
  }, [setShowImportTrades]);

  const handleCloseImportTrades = useCallback(() => {
    setShowImportTrades(false);
  }, [setShowImportTrades]);

  const resetImportTradesState = useCallback(() => {
    setShowImportTrades(false);
  }, [setShowImportTrades]);

  const handleOpenImportTrades = useCallback(() => {
    setShowImportTrades(true);
  }, [setShowImportTrades]);

  const handleSelectAllTrades = (checked: boolean) => {
    if (checked) {
      setSelectedTrades(currentTrades.map((trade) => trade.id));
    } else {
      setSelectedTrades([]);
    }
  };

  const handleTradeSelection = (tradeId: string) => {
    setSelectedTrades((prev) =>
      prev.includes(tradeId)
        ? prev.filter((id) => id !== tradeId)
        : [...prev, tradeId]
    );
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const sortedTrades = [...tradeHistory].sort((a, b) => {
    if (sortColumn === null) return 0;
    //@ts-ignore
    const aValue = a[sortColumn];
    //@ts-ignore
    const bValue = b[sortColumn];
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="space-y-6">
      {showImportTrades ? (
        <ImportPastTrades
          accounts={accounts}
          onImport={handleImportTrades}
          onCancel={handleCloseImportTrades}
        />
      ) : activeAccountId ? (
        <>
          {activeAccount && activeAccount.tradeHistory.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Net Cumulative P&L
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      $
                      {activeAccount.tradeHistory
                        .reduce((sum, trade) => sum + trade.netPL, 0)
                        .toFixed(2)}
                    </div>
                    <svg className="h-[60px] w-full" viewBox="0 0 200 60">
                      <path
                        d="M0 60 L40 45 L80 55 L120 30 L160 35 L200 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Profit Factor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(
                        activeAccount.tradeHistory.reduce(
                          (sum, trade) =>
                            sum + (trade.netPL > 0 ? trade.netPL : 0),
                          0
                        ) /
                        Math.abs(
                          activeAccount.tradeHistory.reduce(
                            (sum, trade) =>
                              sum + (trade.netPL < 0 ? trade.netPL : 0),
                            0
                          )
                        )
                      ).toFixed(2)}
                    </div>
                    <div className="mt-4 h-[60px] w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: "63.6%" }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Trade Win %
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(
                        (activeAccount.tradeHistory.filter(
                          (trade) => trade.netPL > 0
                        ).length /
                          activeAccount.tradeHistory.length) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                    <svg className="h-[60px] w-full" viewBox="0 0 200 60">
                      <circle
                        cx="100"
                        cy="30"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <circle
                        cx="100"
                        cy="30"
                        r="28"
                        fill="none"
                        stroke="green"
                        strokeWidth="4"
                        strokeDasharray="175.92"
                        strokeDashoffset="73.30"
                      />
                    </svg>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Avg Win/Loss Trade
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(
                        Math.abs(
                          activeAccount.tradeHistory.reduce(
                            (sum, trade) =>
                              sum + (trade.netPL > 0 ? trade.netPL : 0),
                            0
                          ) /
                            activeAccount.tradeHistory.filter(
                              (trade) => trade.netPL > 0
                            ).length
                        ) /
                        Math.abs(
                          activeAccount.tradeHistory.reduce(
                            (sum, trade) =>
                              sum + (trade.netPL < 0 ? trade.netPL : 0),
                            0
                          ) /
                            activeAccount.tradeHistory.filter(
                              (trade) => trade.netPL < 0
                            ).length
                        )
                      ).toFixed(2)}
                    </div>
                    <svg className="h-[60px] w-full" viewBox="0 0 200 60">
                      <rect x="10" y="20" width="70" height="40" fill="green" />
                      <rect x="120" y="30" width="70" height="30" fill="red" />
                    </svg>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Trade History</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={activeAccountId?.toString() || ""}
                      onValueChange={(value) => {
                        setActiveAccountId(Number(value));
                        resetImportTradesState();
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem
                            key={account.id}
                            value={account.id.toString()}
                          >
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={handleOpenImportTrades}
                      variant="outline"
                      size="sm"
                    >
                      Import Trades
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[40px]">
                            <Checkbox
                              checked={
                                currentTrades.length > 0 &&
                                selectedTrades.length === currentTrades.length
                              }
                              onCheckedChange={(checked) =>
                                handleSelectAllTrades(checked as boolean)
                              }
                              aria-label="Select all trades"
                            />
                          </TableHead>
                          {[
                            { key: "openDate", label: "Open Date" },
                            { key: "symbol", label: "Symbol" },
                            { key: "status", label: "Status" },
                            { key: "closeDate", label: "Close Date" },
                            { key: "entryPrice", label: "Entry Price" },
                            { key: "exitPrice", label: "Exit Price" },
                            { key: "netPL", label: "Net P&L" },
                            { key: "netROI", label: "Net ROI" },
                          ].map(({ key, label }) => (
                            <TableHead
                              key={key}
                              className="cursor-pointer"
                              onClick={() => {
                                if (sortColumn === key) {
                                  setSortDirection(
                                    sortDirection === "asc" ? "desc" : "asc"
                                  );
                                } else {
                                  setSortColumn(key);
                                  setSortDirection("asc");
                                }
                              }}
                            >
                              <div className="flex items-center">
                                {label}
                                {sortColumn === key &&
                                  (sortDirection === "asc" ? (
                                    <ChevronUp className="ml-2 h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                  ))}
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedTrades
                          .slice(indexOfFirstTrade, indexOfLastTrade)
                          .map((trade) => (
                            <TableRow key={trade.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedTrades.includes(trade.id)}
                                  onCheckedChange={() =>
                                    handleTradeSelection(trade.id)
                                  }
                                  aria-label={`Select trade ${trade.id}`}
                                />
                              </TableCell>
                              <TableCell>{trade.openDate}</TableCell>
                              <TableCell>{trade.symbol}</TableCell>
                              <TableCell>
                                {trade.status === "Open" ? (
                                  <div className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4 text-blue-500" />
                                    <span>Open</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                    <span>Closed</span>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>{trade.closeDate}</TableCell>
                              <TableCell>
                                ${trade.entryPrice.toFixed(2)}
                              </TableCell>
                              <TableCell>
                                {trade.exitPrice === "-"
                                  ? "-"
                                  : `$${trade.exitPrice.toFixed(2)}`}
                              </TableCell>
                              <TableCell
                                className={
                                  trade.netPL >= 0
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }
                              >
                                ${trade.netPL.toFixed(2)}
                              </TableCell>
                              <TableCell
                                className={
                                  trade.netROI >= 0
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }
                              >
                                {trade.netROI.toFixed(2)}%
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        Rows per page:
                      </span>
                      <Select
                        value={tradesPerPage.toString()}
                        onValueChange={(value) => {
                          setTradesPerPage(Number(value));
                          setCurrentPage(1);
                        }}
                      >
                        <SelectTrigger className="w-[70px]">
                          <SelectValue placeholder={tradesPerPage} />
                        </SelectTrigger>
                        <SelectContent>
                          {[5, 10, 15, 20].map((pageSize) => (
                            <SelectItem
                              key={pageSize}
                              value={pageSize.toString()}
                            >
                              {pageSize}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="sm"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      {Array.from(
                        {
                          length: Math.ceil(
                            sortedTrades.length / tradesPerPage
                          ),
                        },
                        (_, i) => i + 1
                      ).map((number) => (
                        <Button
                          key={number}
                          onClick={() => paginate(number)}
                          variant={
                            currentPage === number ? "secondary" : "outline"
                          }
                          size="sm"
                        >
                          {number}
                        </Button>
                      ))}
                      <Button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={
                          currentPage ===
                          Math.ceil(sortedTrades.length / tradesPerPage)
                        }
                        variant="outline"
                        size="sm"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-8 space-y-4">
                <p className="text-muted-foreground">
                  No trades available for this account.
                </p>
                <Button onClick={handleOpenImportTrades}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Import Past Trades
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              No active account selected. Please select an account to view
              trades.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

function ImportPastTrades({
  accounts,
  onImport,
  onCancel,
}: {
  accounts: Account[];
  onImport: () => void;
  onCancel: () => void;
}) {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [file, setFile] = useState(null);

  const handleAccountChange = (value: string) => {
    setSelectedAccount(value);
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (selectedAccount && file) {
      // Here you would implement the actual import logic
      console.log(`Importing file for account: ${selectedAccount}`);
      onImport();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="account">Select Account</Label>
        <Select value={selectedAccount} onValueChange={handleAccountChange}>
          <SelectTrigger id="account" className="w-full">
            <SelectValue placeholder="Select an account" />
          </SelectTrigger>
          <SelectContent>
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id.toString()}>
                {account.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">Upload CSV File</Label>
        <Input
          id="file"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleImport} disabled={!selectedAccount || !file}>
          Import Trades
        </Button>
      </div>
      <div className="mt-6 space-y-4">
        <h4 className="font-semibold">Import Information:</h4>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Info className="h-5 w-5" />
          <p>
            Importing past trades helps you analyze your trading history and
            performance.
          </p>
        </div>
        <div className="space-y-2">
          <h5 className="font-semibold">CSV File Format:</h5>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Each row should represent a single trade</li>
            <li>
              Include columns for date, symbol, entry price, exit price,
              quantity, etc.
            </li>
            <li>
              Ensure the CSV file is properly formatted to avoid import errors
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
