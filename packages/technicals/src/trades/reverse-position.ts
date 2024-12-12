import type { Symbol, Timeframe } from "@algodiary/types";
import { MinuteEventEmitter } from "@algodiary/technicals";
import { getLastClosedCandle } from "@algodiary/technicals";
import { FyersModel, LTPSocket } from "@algodiary/fyers";

export async function reversePosition(
    currSym: Symbol,
    reversePos: Symbol,
    brkLevel: number,
    brkFailLevel: number,
    timeframe: Timeframe
) {
    const timeInNumber = timeframe;
    const minuteEmitter = new MinuteEventEmitter(timeInNumber);
    minuteEmitter.on("minuteEvent", async (date) => {
        console.log(
            `Recieved the minute event for ${timeInNumber}. Current time: ${Date.now}`
        );

        //Fetching the last closed candle
        await getLastClosedCandle(currSym, timeframe);
    });

    const ltpSocket = LTPSocket.getInstance();
    ltpSocket.subscribeToSymbol(currSym);
    ltpSocket.addMessageHandler((message: any) => {
        console.log(`Symbol: ${currSym.symbol}, LTP: ${message.ltp}`);
    });

    ltpSocket.connect();
}
