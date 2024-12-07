import { FyersModel } from "@algodiary/fyers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    let url;
    try {
        const fyersModel = FyersModel.getInstance();
        console.log(`FyersModel: ${fyersModel}`);
        url = fyersModel.getBrokerLoginURL(); //`${JSON.stringify(fyersAPI)}`;
    } catch (err) {
        return NextResponse.json({
            code: "failed",
            message: "Error fetching the broker login url",
            err: `${JSON.stringify(err)}`,
        });
    }

    return NextResponse.json(
        {
            code: "success",
            message: "Broker login url generated",
            url: url,
        },
        { status: 200 }
    );
}
