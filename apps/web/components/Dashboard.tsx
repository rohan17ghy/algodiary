"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { LineChart } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {["NIFTY 50", "SENSEX", "BANKNIFTY"].map((index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{index}</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(Math.random() * 10000 + 15000).toFixed(2)}
              </div>
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
  );
}
