import { Order, OrderType, Trade } from "@algodiary/types";

/**
 * Group the orders and return the trades
 * @param orders
 */
export async function groupOrdersToTrades(orders: Order[]): Promise<Trade[]> {
    //Need toadd equity trades also later
    //const equityTrades = await groupEquityOrdersToTrades(trades);

    const fnoTrades = await groupFnoOrdersToTrades(orders);

    return fnoTrades;
}

/**
 * Used to group futures and options trades only
 * @param orders
 */
export async function groupFnoOrdersToTrades(
    orders: Order[]
): Promise<Trade[]> {
    return new Promise((resolve, reject) => {
        const trades: Trade[] = [];
        while (orders.length > 0) {
            const curr_orders = orders.filter(
                (trade) => trade.symbol === orders[0]?.symbol
            );

            //trades.push(...processOrders(curr_orders));

            // Remove curr_orders from the original orders array
            orders = orders.filter((trade) => !curr_orders.includes(trade));
        }

        resolve(trades);
    });
}

/**
 * Used to group equity trades only
 * @param orders
 */
export async function groupEquityOrdersToTrades(
    orders: Order[]
): Promise<Trade[]> {
    throw new Error("Method not implemented");
}

type ProcessedOrdersResult = {
    trades: Trade[];
    openPositions: {
        symbol: string;
        quantity: number;
        entryPrice: number;
        date: Date;
        isShort: boolean;
    }[];
};

export function processOrders(orders: Order[]): ProcessedOrdersResult {
    const trades: Trade[] = [];
    const openPositions: Map<
        string,
        { quantity: number; cost: number; date: Date; isShort: boolean }
    > = new Map();

    for (const order of orders) {
        const { symbol, type, quantity, price, date } = order;

        if (type === OrderType.Enum.Buy) {
            if (openPositions.has(symbol)) {
                const position = openPositions.get(symbol)!;

                if (position.isShort) {
                    // Closing short position
                    const entryPrice =
                        position.cost / Math.abs(position.quantity); // Short entry price
                    const pnl =
                        (entryPrice - price) *
                        Math.min(quantity, Math.abs(position.quantity)); // Profit for closing short
                    const remainingQuantity =
                        Math.abs(position.quantity) - quantity;

                    trades.push({
                        id: crypto.randomUUID(),
                        entryDate: position.date,
                        exitDate: date,
                        symbol,
                        entryPrice: parseFloat(entryPrice.toFixed(2)),
                        exitPrice: parseFloat(price.toFixed(2)),
                        pnl: parseFloat(pnl.toFixed(2)),
                    });

                    if (remainingQuantity > 0) {
                        // Adjust remaining short position
                        position.quantity = -remainingQuantity; // Still short
                        position.cost = remainingQuantity * entryPrice;
                    } else {
                        // Close the short position
                        openPositions.delete(symbol);
                    }
                } else {
                    // Increasing or closing a long position
                    position.quantity += quantity;
                    position.cost += quantity * price;
                }
            } else {
                // Opening a new long position
                openPositions.set(symbol, {
                    quantity,
                    cost: quantity * price,
                    date,
                    isShort: false,
                });
            }
        } else if (type === OrderType.Enum.Sell) {
            if (openPositions.has(symbol)) {
                const position = openPositions.get(symbol)!;

                if (position.isShort) {
                    // Increasing a short position
                    position.quantity -= quantity; // Short quantity increases (more negative)
                    position.cost += quantity * price;
                } else {
                    // Closing or reducing a long position
                    if (quantity > position.quantity) {
                        throw new Error(
                            `Cannot sell ${quantity} ${symbol} - only ${position.quantity} available`
                        );
                    }

                    const entryPrice = position.cost / position.quantity; // Long entry price
                    const pnl = (price - entryPrice) * quantity; // Profit for closing long
                    const roi = ((price - entryPrice) / entryPrice) * 100;

                    trades.push({
                        id: crypto.randomUUID(),
                        entryDate: position.date,
                        exitDate: date,
                        symbol,
                        entryPrice: parseFloat(entryPrice.toFixed(2)),
                        exitPrice: parseFloat(price.toFixed(2)),
                        pnl: parseFloat(pnl.toFixed(2)),
                        roi: parseFloat(roi.toFixed(2)),
                    });

                    position.quantity -= quantity;
                    position.cost -= quantity * entryPrice;

                    if (position.quantity === 0) {
                        openPositions.delete(symbol);
                    }
                }
            } else {
                // Opening a new short position
                openPositions.set(symbol, {
                    quantity: -quantity,
                    cost: quantity * price,
                    date,
                    isShort: true,
                });
            }
        }
    }

    // Convert open positions map to an array of open positions
    const openPositionsArray = Array.from(openPositions.entries()).map(
        ([symbol, position]) => ({
            symbol,
            quantity: position.quantity,
            entryPrice: parseFloat(
                (position.cost / Math.abs(position.quantity)).toFixed(2)
            ),
            date: position.date,
            isShort: position.isShort,
        })
    );

    return { trades, openPositions: openPositionsArray };
}
