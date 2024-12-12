import { HistorySchema } from "@algodiary/types";
import { FyersModel } from "@algodiary/fyers";
import { Candle, Symbol, Timeframe } from "@algodiary/types";
import {
    convertToEpoch,
    calculatePreviousInterval,
} from "@algodiary/technicals";
import { z } from "zod";

export async function getLastClosedCandle(
    symbol: Symbol,
    timeframe: Timeframe
) {
    const fyersModel = FyersModel.getInstance();
    const now = new Date();

    const lastCloseInterval = calculatePreviousInterval(timeframe);

    console.log(
        `Fetching historic candles for ${symbol.symbol} from: ${lastCloseInterval} to: ${now}`
    );

    const history = HistorySchema.parse(
        await fyersModel.getHistory({
            symbol: symbol.symbol,
            resolution: timeframe,
            date_format: "0",
            range_from: convertToEpoch(lastCloseInterval),
            range_to: convertToEpoch(now),
            cont_flag: "1",
        })
    );

    const candles = history.candles;

    if (candles.length < 2) {
        throw new Error(
            `Unable to fetch the last 2 candles for historic candle for ${symbol.symbol} between ${lastCloseInterval} and ${now}`
        );
    }

    console.log(`Candles: ${JSON.stringify(history)}`);

    return candles[candles.length - 2];
}
