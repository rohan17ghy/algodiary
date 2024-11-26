"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Info, Upload, FileText, X, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/useToast";
import { Progress } from "@/components/ui/progress";

type Account = {
  id: number;
  name: string;
  broker: "robinhood" | "etrade" | "tdameritrade";
};

const accounts: Account[] = [
  { id: 1, name: "Trading Account 1", broker: "robinhood" },
  { id: 2, name: "Investment Account", broker: "etrade" },
  { id: 3, name: "Retirement Account", broker: "tdameritrade" },
];

const brokerInstructions = {
  robinhood: [
    "Log in to your Robinhood account",
    "Go to Account > Statements & History",
    "Click on Export",
    "Download your trade history as a CSV file",
  ],
  etrade: [
    "Log in to E*TRADE",
    "Navigate to Accounts > Transactions",
    "Click on Export Transactions",
    "Select the date range",
    "Download the CSV file",
  ],
  tdameritrade: [
    "Access your TD Ameritrade account",
    "Go to My Account > History & Statements",
    "Click on Export History",
    "Choose your date range",
    "Download the CSV file",
  ],
};

export default function ImportPastTrades() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleAccountChange = (value: string) => {
    const account = accounts.find((a) => a.id.toString() === value) || null;
    setSelectedAccount(account);
  };

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (acceptedFiles.length > 0 && acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setFileError(null);
    } else if (fileRejections.length > 0) {
      setFileError("Please upload a .csv or .xlsx file");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    multiple: false,
  });

  const handleImport = async () => {
    if (selectedAccount && file) {
      setIsLoading(true);
      setProgress(0);
      try {
        // Simulate progress during file reading
        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 2, 90));
        }, 2000);

        const data = await readExcelFile(file);
        console.log(`JSON excel data: ${JSON.stringify(data)}`);

        clearInterval(progressInterval);
        setProgress(100);

        const response = await fetch("/api/ImportTrades", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountId: selectedAccount.id,
            trades: data,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to import trades");
        }

        const result = await response.json();
        toast({
          title: "Import Successful",
          description: `Imported ${result.importedCount} trades`,
        });
      } catch (error) {
        console.error("Import error:", error);
        toast({
          title: "Import Failed",
          description:
            "There was an error importing your trades. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setProgress(0);
      }
    }
  };

  const handleCancel = () => {
    setSelectedAccount(null);
    setFile(null);
    setFileError(null);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileError(null);
  };

  const readExcelFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName as string];
        const json = XLSX.utils.sheet_to_json(worksheet as XLSX.WorkSheet);
        resolve(json);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="flex gap-8 p-6 max-w-4xl mx-auto bg-background">
      <div className="flex-1 space-y-6">
        <h2 className="text-2xl font-bold">Import Past Trades</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account">Select Account</Label>
            <Select
              value={selectedAccount?.id.toString() || ""}
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
            <Label htmlFor="file">Upload CSV or XLSX File</Label>
            {file ? (
              <div className="border-2 border-dashed rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-primary bg-primary/10"
                    : "border-muted-foreground"
                }`}
              >
                <input {...getInputProps()} id="file" />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                {isDragActive ? (
                  <p className="text-sm">Drop the CSV or XLSX file here</p>
                ) : (
                  <p className="text-sm">
                    Drag and drop a CSV or XLSX file here, or click to select a
                    file
                  </p>
                )}
              </div>
            )}
            {fileError && (
              <Alert variant="destructive">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <AlertDescription>{fileError}</AlertDescription>
                </div>
              </Alert>
            )}
          </div>
        </div>
        <div className="space-y-4">
          {isLoading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Importing...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}
          <div className="flex justify-start space-x-4">
            <Button
              onClick={handleImport}
              disabled={!selectedAccount || !file || isLoading}
            >
              {isLoading ? "Importing" : "Import Trades"}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 bg-muted p-6 rounded-lg">
        <h3 className="text-xl font-semibold">Import Information</h3>
        <div className="flex items-start space-x-2 text-muted-foreground">
          <Info className="h-5 w-5 mt-1 flex-shrink-0" />
          <p>
            Importing past trades helps you analyze your trading history and
            performance. Follow the instructions below to download your trade
            history.
          </p>
        </div>
        {selectedAccount ? (
          <div className="space-y-2">
            <h4 className="font-semibold">
              Download Instructions for {selectedAccount.name}:
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {brokerInstructions[selectedAccount.broker].map(
                (instruction, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {instruction}
                  </li>
                )
              )}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Select an account to see specific download instructions.
          </p>
        )}
      </div>
    </div>
  );
}
