import { validateResponse } from "@algodiary/utils";
import type { Symbol } from "@algodiary/types";
import { FyersModel } from "@algodiary/fyers";

export async function placeMarketOrder(symbol: Symbol, type: number) {
    console.log(
        `Placing ${type > 0 ? "BUY" : "SELL"} order as a market order for symbol: ${symbol?.symbol}`
    );

    const fyersModel = FyersModel.getInstance();

    const closedPosRes = validateResponse(
        await fyersModel.place_order({
            symbol: openPosition?.symbol,
            qty: openPosition?.qty,
            type: 2,
            side: -1 * (openPosition?.side ?? 0),
            productType: ProductType.Enum.INTRADAY,
            validity: Validity.Enum.IOC,
            offlineOrder: false,
            stopLoss: 0,
            takeProfit: 0,
        }),
        FyersResponseOrderSchema
    );
}
