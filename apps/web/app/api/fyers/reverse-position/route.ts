import { NextRequest } from "next/server";
import { reversePosition } from "@algodiary/technicals";
import { ValidResponse } from "@algodiary/utils";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const currSym = body.currPosSym;
    const timeframe = body.timeframe;

    await reversePosition(currSym, currSym, 23400, 23500, timeframe);

    return ValidResponse({ message: `Monitoring for reversing position` });
}
