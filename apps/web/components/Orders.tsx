"use client";

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
  allInstruments,
  stockInstruments,
  futureInstruments,
  optionInstruments,
  sampleOrders,
} from "@/lib/data";

export const Orders = () => {
  return (
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
              {sampleOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.symbol}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {order.quantity}
                  </TableCell>
                  <TableCell>{order.price.toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.status}
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
