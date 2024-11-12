import { useEffect, useCallback } from "react";
import { Plus, X, Check } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { debounce } from "lodash";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  searchTermAtom,
  activeTabAtom,
  searchResultsAtom,
  watchlistStocksAtom,
} from "@algodiary/store";
import type { Instrument } from "@algodiary/types";
import {
  allInstruments,
  stockInstruments,
  futureInstruments,
  optionInstruments,
} from "@/lib/data";

export const Watchlist = ({
  allInstruments,
}: {
  allInstruments: Instrument[];
}) => {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermAtom);
  const [activeTab, setActiveTab] = useRecoilState(activeTabAtom);
  const [searchResults, setSearchResults] = useRecoilState(searchResultsAtom);
  const [watchlistStocks, setWatchlistStocks] =
    useRecoilState(watchlistStocksAtom);

  const handleSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
      const filteredResults = allInstruments.filter(
        (instrument) =>
          (activeTab === "all" ||
            instrument.type?.toLowerCase() === activeTab) &&
          (instrument.symbol.toLowerCase().includes(term.toLowerCase()) ||
            instrument.name.toLowerCase().includes(term.toLowerCase()))
      );
      setSearchResults(filteredResults);
    }, 300),
    [activeTab]
  );

  const toggleWatchlist = useCallback((instrument: Instrument) => {
    setWatchlistStocks((prev) => {
      const exists = prev.some((s) => s.symbol === instrument.symbol);
      if (exists) {
        return prev.filter((s) => s.symbol !== instrument.symbol);
      } else {
        return [
          ...prev,
          {
            ...instrument,
            price: instrument.price || 0,
            change: instrument.change || 0,
            exchange: instrument.exchange || "-",
          },
        ];
      }
    });
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [activeTab, handleSearch, searchTerm]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] w-[90vw] p-0 bg-background border-border [&>button]:text-foreground">
            <DialogHeader className="p-4 pb-2">
              <DialogTitle className="text-foreground">
                Add to Watchlist
              </DialogTitle>
            </DialogHeader>
            <div className="p-4 pt-2">
              <Input
                placeholder="Search all instruments..."
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-background text-foreground"
              />
            </div>
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={(value) => setActiveTab(value)}
            >
              <TabsList className="px-4 w-full grid grid-cols-4 bg-background">
                <TabsTrigger
                  value="all"
                  className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-white"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="stocks"
                  className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-white"
                >
                  Stocks
                </TabsTrigger>
                <TabsTrigger
                  value="futures"
                  className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-white"
                >
                  Futures
                </TabsTrigger>
                <TabsTrigger
                  value="options"
                  className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-white"
                >
                  Options
                </TabsTrigger>
              </TabsList>
              <div className="px-2">
                <TabsContent value="all">
                  <ScrollArea className="h-[50vh] w-full rounded-md border border-border">
                    <div className="p-4">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead className="text-muted-foreground">
                              Symbol
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                              Description
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                              Exchange
                            </TableHead>
                            <TableHead className="text-muted-foreground"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {searchResults.map((instrument) => (
                            <TableRow
                              key={instrument.symbol}
                              className="border-border"
                            >
                              <TableCell className="text-foreground">
                                {instrument.symbol}
                              </TableCell>
                              <TableCell className="text-foreground">
                                {instrument.name}
                              </TableCell>
                              <TableCell className="text-foreground">
                                {instrument.exchange}
                              </TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  variant={
                                    watchlistStocks.some(
                                      (s) => s.symbol === instrument.symbol
                                    )
                                      ? "secondary"
                                      : "outline"
                                  }
                                  onClick={() => toggleWatchlist(instrument)}
                                >
                                  {watchlistStocks.some(
                                    (s) => s.symbol === instrument.symbol
                                  ) ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    <Plus className="h-4 w-4" />
                                  )}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="stocks">
                  <ScrollArea className="h-[50vh] w-full rounded-md border border-border">
                    <div className="p-4">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead className="text-muted-foreground">
                              Symbol
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                              Description
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                              Exchange
                            </TableHead>
                            <TableHead className="text-muted-foreground"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(searchTerm ? searchResults : stockInstruments).map(
                            (stock) => (
                              <TableRow
                                key={stock.symbol}
                                className="border-border"
                              >
                                <TableCell className="text-foreground">
                                  {stock.symbol}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {stock.name}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {stock.exchange}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    size="sm"
                                    variant={
                                      watchlistStocks.some(
                                        (s) => s.symbol === stock.symbol
                                      )
                                        ? "secondary"
                                        : "outline"
                                    }
                                    onClick={() => toggleWatchlist(stock)}
                                    className="text-foreground hover:text-foreground"
                                  >
                                    {watchlistStocks.some(
                                      (s) => s.symbol === stock.symbol
                                    ) ? (
                                      <Check className="h-4 w-4" />
                                    ) : (
                                      <Plus className="h-4 w-4" />
                                    )}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="futures">
                  <ScrollArea className="h-[50vh] w-full rounded-md border border-border">
                    <div className="p-4">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead className="text-muted-foreground">
                              Symbol
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                              Description
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                              Exchange
                            </TableHead>
                            <TableHead className="text-muted-foreground"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(searchTerm ? searchResults : futureInstruments).map(
                            (future) => (
                              <TableRow
                                key={future.symbol}
                                className="border-border"
                              >
                                <TableCell className="text-foreground">
                                  {future.symbol}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {future.name}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {future.exchange}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    size="sm"
                                    variant={
                                      watchlistStocks.some(
                                        (s) => s.symbol === future.symbol
                                      )
                                        ? "secondary"
                                        : "outline"
                                    }
                                    onClick={() => toggleWatchlist(future)}
                                    className="text-foreground hover:text-foreground"
                                  >
                                    {watchlistStocks.some(
                                      (s) => s.symbol === future.symbol
                                    ) ? (
                                      <Check className="h-4 w-4" />
                                    ) : (
                                      <Plus className="h-4 w-4" />
                                    )}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="options">
                  <ScrollArea className="h-[50vh] w-full rounded-md border border-border">
                    <div className="p-4">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead className="text-muted-foreground">
                              Symbol
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                              Description
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                              Exchange
                            </TableHead>
                            <TableHead className="text-muted-foreground"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(searchTerm ? searchResults : optionInstruments).map(
                            (option) => (
                              <TableRow
                                key={option.symbol}
                                className="border-border"
                              >
                                <TableCell className="text-foreground">
                                  {option.symbol}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {option.name}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {option.exchange}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    size="sm"
                                    variant={
                                      watchlistStocks.some(
                                        (s) => s.symbol === option.symbol
                                      )
                                        ? "secondary"
                                        : "outline"
                                    }
                                    onClick={() => toggleWatchlist(option)}
                                    className="text-foreground hover:text-foreground"
                                  >
                                    {watchlistStocks.some(
                                      (s) => s.symbol === option.symbol
                                    ) ? (
                                      <Check className="h-4 w-4" />
                                    ) : (
                                      <Plus className="h-4 w-4" />
                                    )}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Symbol</TableHead>
                <TableHead className="w-[16.67%] text-right">Last</TableHead>
                <TableHead className="w-[16.67%] text-right">Change</TableHead>
                <TableHead className="w-[16.67%] text-right">Change%</TableHead>
                <TableHead className="w-[16.67%] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {watchlistStocks.map((stock) => (
                <TableRow key={stock.symbol}>
                  <TableCell className="w-[50%] font-medium">
                    {stock.symbol}
                  </TableCell>
                  <TableCell className="w-[16.67%] text-right">
                    {stock.price?.toFixed(2)}
                  </TableCell>
                  <TableCell className="w-[16.67%] text-right">
                    <span
                      className={
                        stock.change && stock.change > 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {stock.change && stock.change > 0 ? "+" : ""}
                      {stock.change && stock.change.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="w-[16.67%] text-right">
                    <span
                      className={
                        stock.change && stock.change > 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {stock.change && stock.change > 0 ? "+" : ""}
                      {stock.change &&
                        stock.price &&
                        ((stock.change / stock.price) * 100).toFixed(2)}
                      %
                    </span>
                  </TableCell>
                  <TableCell className="w-[16.67%] text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleWatchlist(stock)}
                      className="text-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
