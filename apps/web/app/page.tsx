//@ts-nocheck
'use client'

import { useState, useCallback, useEffect } from 'react'
import { Bell, ChevronDown, LineChart, Menu, Moon, Plus, Search, Sun, User, X, Check, Clock, CheckCircle2, ChevronLeft, ChevronRight, Trash2, FileDown, LayoutDashboard, List, ShoppingCart, BarChart3, Wallet, ChevronUp, UserCog, Edit, MoreVertical, Activity, Briefcase, Info, Building2, Landmark } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { debounce } from 'lodash'
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

function AddAccount({ onAddAccount, onCancel, isFormDirty, setIsFormDirty, editingAccount = null }: { 
onAddAccount: (account: any) => void, 
onCancel: () => void,
isFormDirty: boolean,
setIsFormDirty: (dirty: boolean) => void,
editingAccount?: any 
}) {
const [newAccount, setNewAccount] = useState(editingAccount || { name: "", broker: "", type: "" })
const [showConfirmDialog, setShowConfirmDialog] = useState(false);

useEffect(() => {
  const isDirty = newAccount.name !== '' || newAccount.broker !== '' || newAccount.type !== '';
  setIsFormDirty(isDirty);

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (isDirty) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, [newAccount, setIsFormDirty]);

const handleInputChange = (field: string, value: string) => {
  setNewAccount({ ...newAccount, [field]: value });
}

const handleAddOrUpdateAccount = () => {
  if (newAccount.name && newAccount.broker && newAccount.type) {
    onAddAccount(editingAccount ? { ...editingAccount, ...newAccount } : {
      ...newAccount,
      id: Date.now(),
      balance: 0,
      profitLoss: 0,
      trades: 0,
      tradeHistory: []
    })
    setIsFormDirty(false)
  }
}

const handleCancel = () => {
  if (isFormDirty) {
    setShowConfirmDialog(true);
  } else {
    onCancel();
  }
}

return (
  <>
    <div className="flex space-x-8">
      <Card className="w-full max-w-lg">
        <CardHeader />
        <CardContent className="space-y-4 text-left">
          <div className="space-y-2">
            <Label htmlFor="name">Account Name</Label>
            <Input
              id="name"
              value={newAccount.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter account name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="broker">Broker</Label>
            <Select
              value={newAccount.broker}
              onValueChange={(value) => handleInputChange('broker', value)}
            >
              <SelectTrigger id="broker" className="w-full">
                <SelectValue placeholder="Select a broker" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Zerodha">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>Zerodha</span>
                  </div>
                </SelectItem>
                <SelectItem value="Fyers">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Fyers</span>
                  </div>
                </SelectItem>
                <SelectItem value="Dhan">
                  <div className="flex items-center gap-2">
                    <Landmark className="h-4 w-4" />
                    <span>Dhan</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Account Type</Label>
            <Select
              value={newAccount.type}
              onValueChange={(value) => handleInputChange('type', value)}
            >
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Equity">Equity</SelectItem>
                <SelectItem value="Derivative">Derivative</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-start space-x-4">
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleAddOrUpdateAccount}>{editingAccount ? 'Update' : 'Add'} Account</Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>General Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Info className="h-5 w-5" />
            <p>Adding a new account helps you manage multiple trading portfolios.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Benefits of Multiple Accounts:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Separate strategies for different market segments</li>
              <li>Manage risk across various brokers</li>
              <li>Track performance of different trading styles</li>
              <li>Easily compare results between accounts</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Tips for Account Management:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Use descriptive names for easy identification</li>
              <li>Regularly review and update account details</li>
              <li>Keep track of login credentials securely</li>
              <li>Monitor each account's performance individually</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
    <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Are you sure you want to cancel? Your changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setShowConfirmDialog(false)}>Stay</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            setShowConfirmDialog(false);
            onCancel();
          }}>Leave</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
)
}

function ImportPastTrades({ accounts, onImport, onCancel }) {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [file, setFile] = useState(null);

  const handleAccountChange = (value) => {
    setSelectedAccount(value);
  };

  const handleFileChange = (e) => {
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
        <Select
          value={selectedAccount}
          onValueChange={handleAccountChange}
        >
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
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleImport} disabled={!selectedAccount || !file}>Import Trades</Button>
      </div>
      <div className="mt-6 space-y-4">
        <h4 className="font-semibold">Import Information:</h4>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Info className="h-5 w-5" />
          <p>Importing past trades helps you analyze your trading history and performance.</p>
        </div>
        <div className="space-y-2">
          <h5 className="font-semibold">CSV File Format:</h5>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Each row should represent a single trade</li>
            <li>Include columns for date, symbol, entry price, exit price, quantity, etc.</li>
            <li>Ensure the CSV file is properly formatted to avoid import errors</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function UpdatedTradingInterface() {
const [activeSection, setActiveSection] = useState('dashboard')
const [isNavOpen, setIsNavOpen] = useState(false)
const [watchlistStocks, setWatchlistStocks] = useState([
  { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.5, category: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -1.2, category: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 305.75, change: 0.8, category: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3380.50, change: 1.5, category: 'Consumer Cyclical' },
  { symbol: 'FB', name: 'Meta Platforms Inc.', price: 330.20, change: -0.5, category: 'Communication Services' },
])
const [searchTerm, setSearchTerm] = useState('')
const [searchResults, setSearchResults] = useState([])
const [activeTab, setActiveTab] = useState('all')
const [darkMode, setDarkMode] = useState(false)
const [currentPage, setCurrentPage] = useState(1)
const [tradesPerPage, setTradesPerPage] = useState(5)
const [selectedTrades, setSelectedTrades] = useState<string[]>([])
const [sortColumn, setSortColumn] = useState<string | null>(null);
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
const [accounts, setAccounts] = useState([
  { 
    id: 1, 
    name: "Option Selling Strategy", 
    broker: "Zerodha", 
    type: "Derivative", 
    balance: 50000, 
    profitLoss: 1500, 
    trades: 25,
    tradeHistory: [
      { id: '1', openDate: '2023-05-01', symbol: 'NIFTY', status: 'Closed', closeDate: '2023-05-03', entryPrice: 17500, exitPrice: 17550, netPL: 5000, netROI: 2.86 },
      { id: '2', openDate: '2023-05-02', symbol: 'BANKNIFTY', status: 'Open', closeDate: '-', entryPrice: 40000, exitPrice: '-', netPL: 1500, netROI: 0.75 },
    ]
  },
  { 
    id: 2, 
    name: "Long-term Equity", 
    broker: "Fyers", 
    type: "Equity", 
    balance: 100000, 
    profitLoss: 0, 
    trades: 0,
    tradeHistory: []
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
      { id: '5', openDate: '2023-05-15', symbol: 'INFY', status: 'Closed', closeDate: '2023-05-15', entryPrice: 1300, exitPrice: 1320, netPL: 1000, netROI: 1.54 },
      { id: '6', openDate: '2023-05-16', symbol: 'HDFCBANK', status: 'Closed', closeDate: '2023-05-16', entryPrice: 1600, exitPrice: 1590, netPL: -500, netROI: -0.63 },
    ]
  },
])
const [activeAccountId, setActiveAccountId] = useState<number | null>(null);
const [showAddAccount, setShowAddAccount] = useState(false)
const [isFormDirty, setIsFormDirty] = useState(false); 
const [showLeaveConfirmDialog, setShowLeaveConfirmDialog] = useState(false);
const [intendedSection, setIntendedSection] = useState('');
const [editingAccount, setEditingAccount] = useState<number | null>(null);
const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
const [accountToDelete, setAccountToDelete] = useState<number | null>(null);
const [showImportForm, setShowImportForm] = useState(false);
const [showImportTrades, setShowImportTrades] = useState(false);

const resetImportTradesState = () => {
  setShowImportTrades(false);
};

useEffect(() => {
  const isDarkMode = localStorage.getItem('darkMode') === 'true'
  setDarkMode(isDarkMode)
  if (isDarkMode) {
    document.documentElement.classList.add('dark')
  }
}, [])

const toggleDarkMode = () => {
  setDarkMode(!darkMode)
  localStorage.setItem('darkMode', (!darkMode).toString())
  document.documentElement.classList.toggle('dark')
}

const allInstruments = [
  { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', type: 'Stocks' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ', type: 'Stocks' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', type: 'Stocks' },
  { symbol:  'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ', type: 'Stocks' },
  { symbol: 'FB', name: 'Meta Platforms Inc.', exchange: 'NASDAQ', type: 'Stocks' },
  { symbol: 'TSLA', name: 'Tesla Inc.', exchange: 'NASDAQ', type: 'Stocks' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', type: 'Stocks' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE', type: 'Stocks' },
  { symbol: 'ES', name: 'E-mini S&P 500 Futures', exchange: 'CME', type: 'Futures' },
  { symbol: 'GC', name: 'Gold Futures', exchange: 'COMEX', type: 'Futures' },
  { symbol: 'AAPL220617C00150000', name: 'AAPL Jun 17 2022 150 Call', exchange: 'CBOE', type: 'Options' },
  { symbol: 'GOOGL220617P02000000', name: 'GOOGL Jun 17 2022 2000 Put', exchange: 'CBOE', type: 'Options' },
]

const stockInstruments = allInstruments.filter(instrument => instrument.type === 'Stocks')
const futureInstruments = allInstruments.filter(instrument => instrument.type === 'Futures')
const optionInstruments = allInstruments.filter(instrument => instrument.type === 'Options')

const handleNavItemClick = (section: string) => {
  if (activeSection === 'accounts' && showAddAccount && isFormDirty) {
    setIntendedSection(section);
    setShowLeaveConfirmDialog(true);
  } else {
    setActiveSection(section);
    setIsNavOpen(false);
    resetImportTradesState();
    if (section === 'accounts') {
      setShowAddAccount(false);
    }
  }
}

const handleSearch = useCallback(
  debounce((term) => {
    setSearchTerm(term)
    const filteredResults = allInstruments.filter(
      (instrument) =>
        (activeTab === 'all' || instrument.type.toLowerCase() === activeTab) &&
        (instrument.symbol.toLowerCase().includes(term.toLowerCase()) ||
         instrument.name.toLowerCase().includes(term.toLowerCase()))
    )
    setSearchResults(filteredResults)
  }, 300),
  [activeTab]
)

useEffect(() => {
  handleSearch(searchTerm)
}, [activeTab, handleSearch, searchTerm])

const toggleWatchlist = useCallback((instrument) => {
  setWatchlistStocks((prev) => {
    const exists = prev.some((s) => s.symbol === instrument.symbol);
    if (exists) {
      return prev.filter((s) => s.symbol !== instrument.symbol);
    } else {
      return [...prev, { ...instrument, price: instrument.price || 0, change: instrument.change || 0, exchange: instrument.exchange || '-' }];
    }
  });
}, []);

const NavContent = () => (
  <nav className="space-y-2">
    {[
      { name: 'Dashboard', icon: LayoutDashboard },
      { name: 'Watchlist', icon: List },
      { name: 'Orders', icon: ShoppingCart },
      { name: 'Positions', icon: BarChart3 },
      { name: 'Funds', icon: Wallet },
      { name: 'Trades', icon: LineChart },
      { name: 'Accounts', icon: UserCog },
    ].map((item) => (
      <Button 
        key={item.name}
        variant={activeSection === item.name.toLowerCase() ? "secondary" : "ghost"} 
        className="w-full justify-start"
        onClick={() => handleNavItemClick(item.name.toLowerCase())}
      >
        <item.icon className="mr-2 h-4 w-4" />
        <span>{item.name}</span>
      </Button>
    ))}
  </nav>
)

// Get current trades
const activeAccount = accounts.find(account => account.id === activeAccountId) || accounts[0];
const tradeHistory = activeAccount?.tradeHistory || [];
const indexOfLastTrade = currentPage * tradesPerPage;
const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;
const currentTrades = tradeHistory.slice(indexOfFirstTrade, indexOfLastTrade);

// Change page
const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

// Generate page numbers
const pageNumbers = [];
for (let i = 1; i <= Math.ceil(tradeHistory.length / tradesPerPage); i++) {
  pageNumbers.push(i);
}

const handleTradeSelection = (tradeId: string) => {
  setSelectedTrades(prev => 
    prev.includes(tradeId)
      ? prev.filter(id => id !== tradeId)
      : [...prev, tradeId]
  );
};

const handleSelectAllTrades = (checked: boolean) => {
  if (checked) {
    setSelectedTrades(currentTrades.map(trade => trade.id));
  } else {
    setSelectedTrades([]);
  }
};

const handleDeleteSelectedTrades = () => {
  setAccounts(prevAccounts => prevAccounts.map(account => {
    if (account.id === activeAccountId) {
      return {
        ...account,
        tradeHistory: account.tradeHistory.filter(trade => !selectedTrades.includes(trade.id))
      };
    }
    return account;
  }));
  setSelectedTrades([]);
};

const handleExportSelectedTrades = () => {
  const selectedTradesData = tradeHistory.filter(trade => 
    selectedTrades.includes(trade.id)
  );
  const csvContent = [
    [
      "ID",
      "Open Date",
      "Symbol",
      "Status",
      "Close Date",
      "Entry Price",
      "Exit Price",
      "Net P&L",
      "Net ROI",
    ],
    ...selectedTradesData.map((trade) => [
      trade.id,
      trade.openDate,
      trade.symbol,
      trade.status,
      trade.closeDate,
      trade.entryPrice,
      trade.exitPrice,
      trade.netPL,
      trade.netROI,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "selected_trades.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const sortedTrades = [...tradeHistory].sort((a, b) => {
  if (sortColumn === null) return 0;
  const aValue = a[sortColumn];
  const bValue = b[sortColumn];
  if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
  if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
  return 0;
});

const handleConfirmNavigation = () => {
  setShowLeaveConfirmDialog(false);
  setActiveSection(intendedSection);
  setIsNavOpen(false);
  if (intendedSection === 'accounts') {
    setShowAddAccount(false);
  }
  setIsFormDirty(false);
}

const handleEditAccount = (accountId: number) => {
  setEditingAccount(accountId);
  setShowAddAccount(true);
};

const handleDeleteAccount = (accountId: number) => {
  setAccountToDelete(accountId);
  setShowDeleteConfirm(true);
};

const confirmDeleteAccount = () => {
  if (accountToDelete) {
    setAccounts(accounts.filter(account => account.id !== accountToDelete));
    setShowDeleteConfirm(false);
    setAccountToDelete(null);
  }
};

const handleOpenImportTrades = () => {
  setShowImportTrades(true);
};

const handleCloseImportTrades = () => {
  setShowImportTrades(false);
};

const handleImportTrades = () => {
  // Handle the import logic here
  console.log("Trades imported successfully");
  setShowImportTrades(false);
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
    {/* Header */}
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
              <NavContent />
            </div>
          </SheetContent>
        </Sheet>
        <span className="text-xl font-semibold">TradePro</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-8 w-[200px] md:w-[300px]" onChange={(e) => handleSearch(e.target.value)} />
        </div>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
            <DropdownMenuItem onClick={() => handleNavItemClick('accounts')}>Manage Account</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>

    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar - visible on larger screens */}
      <aside className="hidden lg:block w-64 border-r overflow-y-auto">
        <div className="p-4">
          <NavContent />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
        <h1 className="text-2xl font-semibold mb-6">
          {activeSection === 'accounts' && showAddAccount
            ? (editingAccount ? "Edit Account" : "Add Account")
            : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </h1>

        {activeSection === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['NIFTY 50', 'SENSEX', 'BANKNIFTY'].map((index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{index}</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{(Math.random() * 10000 + 15000).toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                      {(Math.random() * 2 - 1).toFixed(2)}%
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="aspect-[2/1] bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Market Overview Chart</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'watchlist' && (
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
                    <DialogTitle className="text-foreground">Add to Watchlist</DialogTitle>
                  </DialogHeader>
                  <div className="p-4 pt-2">
                    <Input placeholder="Search all instruments..." onChange={(e) => handleSearch(e.target.value)} className="bg-background text-foreground" />
                  </div>
                  <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveTab(value)}>
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
                                  <TableHead className="text-muted-foreground">Symbol</TableHead>
                                  <TableHead className="text-muted-foreground">Description</TableHead>
                                  <TableHead className="text-muted-foreground">Exchange</TableHead>
                                  <TableHead className="text-muted-foreground"></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {searchResults.map((instrument) => (
                                  <TableRow  key={instrument.symbol} className="border-border">
                                    <TableCell className="text-foreground">{instrument.symbol}</TableCell>
                                    <TableCell  className="text-foreground">{instrument.name}</TableCell>
                                    <TableCell className="text-foreground">{instrument.exchange}</TableCell>
                                    <TableCell>
                                      <Button 
                                        size="sm" 
                                                                                variant={watchlistStocks.some((s) => s.symbol === instrument.symbol) ? "secondary" : "outline"}
                                        onClick={() => toggleWatchlist(instrument)}
                                                                              >
                                        {watchlistStocks.some((s) => s.symbol === instrument.symbol) ? (
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
                                <TableRow                                   className="border-border">
                                  <TableHead className="text-muted-foreground">Symbol</TableHead>
                                  <TableHead className="text-muted-foreground">Description</TableHead>
                                  <TableHead className="text-muted-foreground">Exchange</TableHead>
                                  <TableHead className="text-muted-foreground"></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {(searchTerm ? searchResults : stockInstruments).map((stock) => (
                                  <TableRow key={stock.symbol}   className="border-border">
                                    <TableCell className="text-foreground">{stock.symbol}</TableCell>
                                    <TableCell className="text-foreground">{stock.name}</TableCell>
                                    <TableCell className="text-foreground">{stock.exchange}</TableCell>
                                    <TableCell>
                                      <Button 
                                        size="sm" 
                                        variant={watchlistStocks.some((s) => s.symbol === stock.symbol) ? "secondary" : "outline"}
                                        onClick={() => toggleWatchlist(stock)}
                                        className="text-foreground hover:text-foreground"
                                      >
                                        {watchlistStocks.some((s) => s.symbol === stock.symbol) ? (
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
                      <TabsContent value="futures">
                        <ScrollArea className="h-[50vh] w-full rounded-md border border-border">
                          <div className="p-4">
                            <Table>
                              <TableHeader>
                                <TableRow className="border-border">
                                  <TableHead className="text-muted-foreground">Symbol</TableHead>
                                  <TableHead className="text-muted-foreground">Description</TableHead>
                                  <TableHead className="text-muted-foreground">Exchange</TableHead>
                                  <TableHead className="text-muted-foreground"></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {(searchTerm ? searchResults : futureInstruments).map((future) => (
                                  <TableRow key={future.symbol} className="border-border">
                                    <TableCell className="text-foreground">{future.symbol}</TableCell>
                                    <TableCell className="text-foreground">{future.name}</TableCell>
                                    <TableCell className="text-foreground">{future.exchange}</TableCell>
                                    <TableCell>
                                      <Button 
                                        size="sm" 
                                        variant={watchlistStocks.some((s) => s.symbol === future.symbol) ? "secondary" : "outline"}
                                        onClick={() => toggleWatchlist(future)}
                                        className="text-foreground hover:text-foreground"
                                      >
                                        {watchlistStocks.some((s) => s.symbol === future.symbol) ? (
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
                      <TabsContent value="options">
                        <ScrollArea className="h-[50vh] w-full rounded-md border border-border">
                          <div className="p-4">
                            <Table>
                              <TableHeader>
                                <TableRow className="border-border">
                                  <TableHead className="text-muted-foreground">Symbol</TableHead>
                                  <TableHead className="text-muted-foreground">Description</TableHead>
                                  <TableHead className="text-muted-foreground">Exchange</TableHead>
                                  <TableHead className="text-muted-foreground"></TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {(searchTerm ? searchResults : optionInstruments).map((option) => (
                                  <TableRow key={option.symbol} className="border-border">
                                    <TableCell className="text-foreground">{option.symbol}</TableCell>
                                    <TableCell className="text-foreground">{option.name}</TableCell>
                                    <TableCell className="text-foreground">{option.exchange}</TableCell>
                                    <TableCell>
                                      <Button 
                                        size="sm" 
                                        variant={watchlistStocks.some((s) => s.symbol === option.symbol) ? "secondary" : "outline"}
                                        onClick={() => toggleWatchlist(option)}
                                        className="text-foreground hover:text-foreground"
                                      >
                                        {watchlistStocks.some((s) => s.symbol === option.symbol) ? (
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
                        <TableCell className="w-[50%] font-medium">{stock.symbol}</TableCell>
                        <TableCell className="w-[16.67%] text-right">{stock.price.toFixed(2)}</TableCell>
                        <TableCell className="w-[16.67%] text-right">
                          <span className={stock.change > 0  ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                            {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell className="w-[16.67%] text-right">
                          <span className={stock.change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                            {stock.change > 0 ? '+' : ''}{((stock.change / stock.price) * 100).toFixed(2)}%
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
        )}

        {activeSection === 'orders' && (
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="hidden sm:table-cell">Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: 'ORD001', symbol: 'AAPL', type: 'Buy', quantity: 100, price: 150.25, status: 'Executed' },
                      { id: 'ORD002', symbol: 'GOOGL', type: 'Sell', quantity: 50, price: 2750.80, status: 'Pending' },
                      { id: 'ORD003', symbol: 'MSFT', type: 'Buy', quantity: 75, price: 305.75, status: 'Executed' },
                      { id: 'ORD004', symbol: 'AMZN', type: 'Sell', quantity: 25, price: 3380.50, status: 'Cancelled' },
                    ].map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.symbol}</TableCell>
                        <TableCell>{order.type}</TableCell>
                        <TableCell className="hidden sm:table-cell">{order.quantity}</TableCell>
                        <TableCell>{order.price.toFixed(2)}</TableCell>
                        <TableCell className="hidden md:table-cell">{order.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'positions' && (
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead className="hidden sm:table-cell">Quantity</TableHead>
                      <TableHead>Avg. Cost</TableHead>
                      <TableHead className="hidden md:table-cell">Current Price</TableHead>
                      <TableHead>P&L</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { symbol: 'AAPL', quantity: 100, avgCost: 145.50, currentPrice: 150.25 },
                      { symbol: 'MSFT', quantity: 75, avgCost: 300.00, currentPrice: 305.75 },
                      { symbol: 'AMZN', quantity: 25, avgCost: 3350.00, currentPrice: 3380.50 },
                    ].map((position) => (
                      <TableRow key={position.symbol}>
                        <TableCell className="font-medium">{position.symbol}</TableCell>
                        <TableCell className="hidden sm:table-cell">{position.quantity}</TableCell>
                        <TableCell>{position.avgCost.toFixed(2)}</TableCell>
                        <TableCell className="hidden md:table-cell">{position.currentPrice.toFixed(2)}</TableCell>
                        <TableCell className={(position.currentPrice - position.avgCost) * position.quantity > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                          {((position.currentPrice - position.avgCost) * position.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'funds' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt>Available Balance</dt>
                    <dd className="font-semibold">$10,000.00</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Margin Used</dt>
                    <dd className="font-semibold">$5,000.00</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Open P&L</dt>
                    <dd className="font-semibold text-green-600 dark:text-green-400">+$500.00</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <Button className="w-full">Deposit Funds</Button>
                <Button variant="outline" className="w-full">Withdraw Funds</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'trades' && (
          <div className="space-y-6">
            {showImportTrades ? (
              <ImportPastTrades
                accounts={accounts}
                onImport={handleImportTrades}
                onCancel={handleCloseImportTrades}
              />
            ) : activeAccountId ? (
              <>
                {activeAccount.tradeHistory.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Net Cumulative P&L</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            ${activeAccount.tradeHistory.reduce((sum, trade) => sum + trade.netPL, 0).toFixed(2)}
                          </div>
                          <svg className="h-[60px] w-full" viewBox="0 0 200 60">
                            <path d="M0 60 L40 45 L80 55 L120 30 L160 35 L200 10" fill="none" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Profit Factor</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {(activeAccount.tradeHistory.reduce((sum, trade) => sum + (trade.netPL > 0 ? trade.netPL : 0), 0) / 
                              Math.abs(activeAccount.tradeHistory.reduce((sum, trade) => sum + (trade.netPL < 0 ? trade.netPL : 0), 0))).toFixed(2)}
                          </div>
                          <div className="mt-4 h-[60px] w-full bg-muted rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full" style={{ width: '63.6%' }}></div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Trade Win %</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {((activeAccount.tradeHistory.filter(trade => trade.netPL > 0).length / activeAccount.tradeHistory.length) * 100).toFixed(1)}%
                          </div>
                          <svg className="h-[60px] w-full" viewBox="0 0 200 60">
                            <circle cx="100" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="4" />
                            <circle cx="100" cy="30" r="28" fill="none" stroke="green" strokeWidth="4" strokeDasharray="175.92" strokeDashoffset="73.30" />
                          </svg>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Avg Win/Loss Trade</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {(Math.abs(activeAccount.tradeHistory.reduce((sum, trade) => sum + (trade.netPL > 0 ? trade.netPL : 0), 0) / 
                              activeAccount.tradeHistory.filter(trade => trade.netPL > 0).length) / 
                              Math.abs(activeAccount.tradeHistory.reduce((sum, trade) => sum + (trade.netPL < 0 ? trade.netPL : 0), 0) / 
                              activeAccount.tradeHistory.filter(trade => trade.netPL < 0).length)).toFixed(2)}
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
                            value={activeAccountId?.toString() || ''}
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
                                <SelectItem key={account.id} value={account.id.toString()}>
                                  {account.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button onClick={handleOpenImportTrades} variant="outline" size="sm">
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
                                    checked={currentTrades.length > 0 && selectedTrades.length === currentTrades.length}
                                    onCheckedChange={(checked) => handleSelectAllTrades(checked as boolean)}
                                    aria-label="Select all trades"
                                  />
                                </TableHead>
                                {[
                                  { key: 'openDate', label: 'Open Date' },
                                  { key: 'symbol', label: 'Symbol' },
                                  { key: 'status', label: 'Status' },
                                  { key: 'closeDate', label: 'Close Date' },
                                  { key: 'entryPrice', label: 'Entry Price' },
                                  { key: 'exitPrice', label: 'Exit Price' },
                                  { key: 'netPL', label: 'Net P&L' },
                                  { key: 'netROI', label: 'Net ROI' },
                                ].map(({ key, label }) =>
                                  <TableHead key={key} className="cursor-pointer" onClick={() => {
                                    if (sortColumn === key) {
                                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                                    } else {
                                      setSortColumn(key);
                                      setSortDirection('asc');
                                    }
                                  }}>
                                    <div className="flex items-center">
                                      {label}
                                      {sortColumn === key && (
                                        sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
                                      )}
                                    </div>
                                  </TableHead>
                                )}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {sortedTrades.slice(indexOfFirstTrade, indexOfLastTrade).map((trade) => (
                                <TableRow key={trade.id}>
                                  <TableCell>
                                    <Checkbox
                                      checked={selectedTrades.includes(trade.id)}
                                      onCheckedChange={() => handleTradeSelection(trade.id)}
                                      aria-label={`Select trade ${trade.id}`}
                                    />
                                  </TableCell>
                                  <TableCell>{trade.openDate}</TableCell>
                                  <TableCell>{trade.symbol}</TableCell>
                                  <TableCell>
                                    {trade.status === 'Open' ? (
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
                                  <TableCell>${trade.entryPrice.toFixed(2)}</TableCell>
                                  <TableCell>{trade.exitPrice === '-' ? '-' : `$${trade.exitPrice.toFixed(2)}`}</TableCell>
                                  <TableCell className={trade.netPL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                    ${trade.netPL.toFixed(2)}
                                  </TableCell>
                                  <TableCell className={trade.netROI >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                    {trade.netROI.toFixed(2)}%
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Rows per page:</span>
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
                                  <SelectItem key={pageSize} value={pageSize.toString()}>
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
                            {Array.from({ length: Math.ceil(sortedTrades.length / tradesPerPage) }, (_, i) => i + 1).map((number) => (
                              <Button
                                key={number}
                                onClick={() => paginate(number)}
                                variant={currentPage === number ? "secondary" : "outline"}
                                size="sm"
                              >
                                {number}
                              </Button>
                            ))}
                            <Button
                              onClick={() => paginate(currentPage + 1)}
                              disabled={currentPage === Math.ceil(sortedTrades.length / tradesPerPage)}
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
                      <p className="text-muted-foreground">No trades available for this account.</p>
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
                  <p className="text-muted-foreground">No active account selected. Please select an account to view trades.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
        {activeSection === 'accounts' && (
          <div className="space-y-4">
            {activeSection === 'accounts' && !showAddAccount && (
              <div className="flex justify-end mb-6">
                <Button onClick={() => setShowAddAccount(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Account
                </Button>
              </div>
            )}
            {showAddAccount && (
              <AddAccount
                onAddAccount={(updatedAccount) => {
                  if (editingAccount) {
                    setAccounts(accounts.map(account => account.id === editingAccount ? updatedAccount : account));
                    setEditingAccount(null);
                  } else {
                    setAccounts([...accounts, updatedAccount]);
                  }
                  setShowAddAccount(false);
                  setIsFormDirty(false);
                }}
                onCancel={() => {
                  setShowAddAccount(false);
                  setEditingAccount(null);
                }}
                isFormDirty={isFormDirty}
                setIsFormDirty={setIsFormDirty}
                editingAccount={editingAccount ? accounts.find(account => account.id === editingAccount) : null}
              />
            )}
            {!showAddAccount && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((account) => (
                  <Card key={account.id} className="flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {account.name}
                      </CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditAccount(account.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteAccount(account.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span>{account.broker}</span>
                        <span>•</span>
                        <span>{account.type}</span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs text-muted-foreground">Balance</span>
                          <span className="font-medium">
                            ${account.balance.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs text-muted-foreground">P&L</span>
                          <span className={`font-medium ${account.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${Math.abs(account.profitLoss).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{account.trades} trades</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center mt-auto pt-4">
                      <span className="text-sm font-medium">Active</span>
                      <Switch
                        checked={activeAccountId === account.id}
                        onCheckedChange={() => {
                          setActiveAccountId(activeAccountId === account.id ? null : account.id);
                        }}
                      />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
    <AlertDialog open={showLeaveConfirmDialog} onOpenChange={setShowLeaveConfirmDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes in the Add Account form. Are you sure you want to leave? Your changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setShowLeaveConfirmDialog(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmNavigation}>Leave</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this account? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setShowDeleteConfirm(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDeleteAccount}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
)
}