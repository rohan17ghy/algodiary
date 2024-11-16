"use client";

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

export default function Funds() {
  return (
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
              <dd className="font-semibold text-green-600 dark:text-green-400">
                +$500.00
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <Button className="w-full">Deposit Funds</Button>
          <Button variant="outline" className="w-full">
            Withdraw Funds
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
