import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { samplePositions } from "@/lib/data";

export const Postions = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead className="hidden sm:table-cell">Quantity</TableHead>
                <TableHead>Avg. Cost</TableHead>
                <TableHead className="hidden md:table-cell">
                  Current Price
                </TableHead>
                <TableHead>P&L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {samplePositions.map((position) => (
                <TableRow key={position.symbol}>
                  <TableCell className="font-medium">
                    {position.symbol}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {position.quantity}
                  </TableCell>
                  <TableCell>{position.avgCost.toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {position.currentPrice.toFixed(2)}
                  </TableCell>
                  <TableCell
                    className={
                      (position.currentPrice - position.avgCost) *
                        position.quantity >
                      0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  >
                    {(
                      (position.currentPrice - position.avgCost) *
                      position.quantity
                    ).toFixed(2)}
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
