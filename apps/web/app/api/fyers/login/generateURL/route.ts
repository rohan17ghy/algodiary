import { InvalidResponse, ValidResponse } from "@algodiary/utils";
import { FyersModel } from "@algodiary/fyers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    let url;
    try {
        const fyersModel = FyersModel.getInstance();
        console.log(`FyersModel: ${fyersModel}`);
        url = fyersModel.generateAuthCode(); //`${JSON.stringify(fyersAPI)}`;
    } catch (err) {
        return InvalidResponse({
            message: "Error fetching the broker login url",
            error: err,
        });
    }

    return ValidResponse({ message: "Broker login url generated", url });
}
