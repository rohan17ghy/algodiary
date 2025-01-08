import { NextRequest } from "next/server";
import { z } from "zod";
import {
    FyersResponseOrderSchema,
    ProductType,
    SymbolSchema,
    Validity,
    type Symbol,
} from "@algodiary/types";
import { parse } from "path";
import { InvalidResponse, ValidResponse } from "@/lib/response";
import { InvalidInputResponse } from "@/lib/response";
import { FyersModel } from "@algodiary/fyers";
import { FyersResponsePositionSchema } from "@algodiary/types";
import { validateResponse } from "@/lib/zod";

const ReversePositionNowSchema = z.object({
    firstSymbol: SymbolSchema,
    secondSymbol: SymbolSchema,
});

export async function POST(req: NextRequest) {
    try {
        const rawInput = ReversePositionNowSchema.safeParse(await req.json());
        if (!rawInput.success) {
            return InvalidInputResponse(rawInput.error);
        }

        const inputData = rawInput.data;
        const fyersModel = FyersModel.getInstance();
        const { firstSymbol, secondSymbol } = inputData;

        console.log(
            `POST req for /api/fyers/reverse-position-now with input: ${JSON.stringify(inputData)}`
        );

        //Find open positions
        const positions = validateResponse(
            await fyersModel.get_positions(),
            FyersResponsePositionSchema
        ).netPositions;
        console.log(`Positions: ${JSON.stringify(positions)}`);

        //const positions = rawPositions.data.netPositions;
        const relevantOpenPositions = positions.filter(
            (p) =>
                p.netQty != 0 &&
                (p.symbol === inputData.firstSymbol.symbol ||
                    p.symbol === inputData.secondSymbol.symbol)
        );

        //Check which symbol is currently in position between firstSymbol and second Symbol
        if (relevantOpenPositions.length < 1) {
            return InvalidInputResponse("No open positions");
        }

        if (relevantOpenPositions.length > 1) {
            return InvalidInputResponse("More than 1 open positions found");
        }

        const openPosition = relevantOpenPositions[0];

        const [currOpenPos, posToOpen] =
            openPosition?.symbol === firstSymbol.symbol
                ? [firstSymbol, secondSymbol]
                : [secondSymbol, firstSymbol];

        console.log(
            `Current open Position: ${JSON.stringify(currOpenPos)}, To be entered pos: ${JSON.stringify(posToOpen)}`
        );

        //Now need to close the openPos and take an entry into the reversePos
        //Closing the existing openPos
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

        console.log(
            `Order placed for ${openPosition?.symbol} with response: ${JSON.stringify(closedPosRes)}`
        );

        //Taking an entry into the reversePos
        const openedPosRes = validateResponse(
            await fyersModel.place_order({
                symbol: posToOpen.symbol,
                qty: openPosition?.qty,
                type: 2,
                side: openPosition?.side,
                productType: ProductType.Enum.INTRADAY,
                validity: Validity.Enum.IOC,
            }),
            FyersResponseOrderSchema
        );

        console.log(
            `Order placed for ${posToOpen.symbol} with response: ${JSON.stringify(openedPosRes)}`
        );

        console.log(
            `Position reversed successfully from ${currOpenPos.symbol} to ${posToOpen}`
        );

        return ValidResponse({
            closedPosition: closedPosRes,
            openPosition: openedPosRes,
        });
    } catch (err: any) {
        return InvalidResponse({ message: err?.message, err: err?.error });
    }
}
