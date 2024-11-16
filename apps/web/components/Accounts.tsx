"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
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
import { useRecoilState } from "recoil";
import {
  accountsAtom,
  accountToDeleteAtom,
  activeAccountIdAtom,
  activeSectionAtom,
  currentPageAtom,
  editingAccountAtom,
  isFormDirtyAtom,
  showAddAccountAtom,
  showDeleteConfirmAtom,
  showImportTradesAtom,
  tradesPerPageAtom,
} from "@algodiary/store";
import type { Account } from "@algodiary/types";

function AddAccount({
  onAddAccount,
  onCancel,
  isFormDirty,
  setIsFormDirty,
  editingAccount = null,
}: {
  onAddAccount: (account: any) => void;
  onCancel: () => void;
  isFormDirty: boolean;
  setIsFormDirty: (dirty: boolean) => void;
  editingAccount?: any;
}) {
  const [newAccount, setNewAccount] = useState(
    editingAccount || { name: "", broker: "", type: "" }
  );
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const isDirty =
      newAccount.name !== "" ||
      newAccount.broker !== "" ||
      newAccount.type !== "";
    setIsFormDirty(isDirty);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [newAccount, setIsFormDirty]);

  const handleInputChange = (field: string, value: string) => {
    setNewAccount({ ...newAccount, [field]: value });
  };

  const handleAddOrUpdateAccount = () => {
    if (newAccount.name && newAccount.broker && newAccount.type) {
      onAddAccount(
        editingAccount
          ? { ...editingAccount, ...newAccount }
          : {
              ...newAccount,
              id: Date.now(),
              balance: 0,
              profitLoss: 0,
              trades: 0,
              tradeHistory: [],
            }
      );
      setIsFormDirty(false);
    }
  };

  const handleCancel = () => {
    if (isFormDirty) {
      setShowConfirmDialog(true);
    } else {
      onCancel();
    }
  };

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
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter account name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="broker">Broker</Label>
              <Select
                value={newAccount.broker}
                onValueChange={(value) => handleInputChange("broker", value)}
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
                onValueChange={(value) => handleInputChange("type", value)}
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
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleAddOrUpdateAccount}>
              {editingAccount ? "Update" : "Add"} Account
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Info className="h-5 w-5" />
              <p>
                Adding a new account helps you manage multiple trading
                portfolios.
              </p>
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
              You have unsaved changes. Are you sure you want to cancel? Your
              changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmDialog(false)}>
              Stay
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowConfirmDialog(false);
                onCancel();
              }}
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function Accounts() {
  const [activeSection, setActiveSection] = useRecoilState(activeSectionAtom);
  const [showAddAccount, setShowAddAccount] =
    useRecoilState(showAddAccountAtom);
  const [editingAccount, setEditingAccount] = useRecoilState<number | null>(
    editingAccountAtom
  );
  const [accounts, setAccounts] = useRecoilState(accountsAtom);
  const [isFormDirty, setIsFormDirty] = useRecoilState(isFormDirtyAtom);
  const [activeAccountId, setActiveAccountId] =
    useRecoilState(activeAccountIdAtom);
  const [accountToDelete, setAccountToDelete] = useRecoilState<number | null>(
    accountToDeleteAtom
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useRecoilState(
    showDeleteConfirmAtom
  );

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
      setAccounts(accounts.filter((account) => account.id !== accountToDelete));
      setShowDeleteConfirm(false);
      setAccountToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      {activeSection === "accounts" && !showAddAccount && (
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
              setAccounts(
                accounts.map((account) =>
                  account.id === editingAccount ? updatedAccount : account
                )
              );
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
          editingAccount={
            editingAccount
              ? accounts.find((account) => account.id === editingAccount)
              : null
          }
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
                    <DropdownMenuItem
                      onClick={() => handleEditAccount(account.id)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteAccount(account.id)}
                    >
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
                    <span className="text-xs text-muted-foreground">
                      Balance
                    </span>
                    <span className="font-medium">
                      ${account.balance.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-muted-foreground">P&L</span>
                    <span
                      className={`font-medium ${account.profitLoss >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      ${Math.abs(account.profitLoss).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {account.trades} trades
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center mt-auto pt-4">
                <span className="text-sm font-medium">Active</span>
                <Switch
                  checked={activeAccountId === account.id}
                  onCheckedChange={() => {
                    setActiveAccountId(
                      activeAccountId === account.id ? null : account.id
                    );
                  }}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
