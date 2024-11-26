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
    const trades = [];
    while (orders.length > 0) {
      const curr_orders = orders.filter(
        (trade) => trade.symbol === orders[0]?.symbol
      );

      trades.push(...processOrders(curr_orders));

      // Remove curr_orders from the original orders array
      orders = orders.filter((trade) => !curr_orders.includes(trade));
    }

    resolve(trades);
  });
}

/**
 * Used to grooup equity trades only
 * @param orders
 */
export async function groupEquityOrdersToTrades(
  orders: Order[]
): Promise<Trade[]> {
  throw new Error("Method not implemented");
}

/**
 * Process orders of same symbols
 * @param orders
 * @returns
 */
export async function processOrders(orders: Order[]): Trade[] {
  return new Promise((resolve, reject) => {
    if (!orders || orders.length <= 0) {
      reject("Invalid orders provided");
      return;
    }

    orders.sort((a, b) => a.date.getTime() - b.date.getTime());
    const trade: Trade = {
      id: crypto.randomUUID(),
      symbol: orders[0]?.symbol || "",
      entryDate: orders[0]?.date || new Date(),
      exitDate: new Date(),
      entryPrice: orders[0]?.price || 0,
      exitPrice: NaN,
      pnl: NaN,
      roi: NaN,
    };

    let currentEntryPrice = orders[0]?.price || NaN;
    let currentPnL = NaN;
    let currentOpenQty = NaN;
    let isOptionBuying = orders[0]?.type == OrderType.Enum.Buy;

    for (let order in orders) {
    }
  });
}
