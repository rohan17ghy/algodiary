// export function reversePostion(
//     currPos: string,
//     reversePos: string,
//     brkLevel: number,
//     brkFailLevel: string,
//     timeframe: string
// ) {

//     const minuteEmitter = new MinuteEventEmitter(1);
//     minuteEmitter.on("minuteEvent", async (date) => {
//         for (const sub of this.subscribedAggrOptions) {
//             const candles = await get1minAggrCandles(sub.aggrInp);
//             if (candles) {
//                 const lastClosedCandle = candles[candles.length - 2];
//                 sub.lastTime = lastClosedCandle.time;
//                 console.log(
//                     `Date: ${date},  Candle: ${JSON.stringify(lastClosedCandle)}`
//                 );
//                 ws.send(JSON.stringify(lastClosedCandle));
//             }
//         }
//     });
// }
