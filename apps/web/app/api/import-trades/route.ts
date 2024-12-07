import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { Order, OrderSchema } from "@algodiary/types";
import { z } from "zod";
import { InvalidInputApiResponse } from "@/lib/utils";
import { parse } from "path";
import { error } from "console";

export async function POST(request: NextRequest) {
  try {
    let { reqAccountId, reqTrades } = await request.json();

    const parsedAccountId = z.string().min(1).safeParse(reqAccountId);
    if (!parsedAccountId.success) {
      return InvalidInputApiResponse(parsedAccountId.error.message);
    }

    const parsedTrades = z.array(OrderSchema).safeParse(reqTrades);
    if (!parsedTrades.success) {
      return InvalidInputApiResponse(parsedTrades.error.message);
    }

    const accountId = parsedAccountId.data;
    const trades = parsedTrades.data;

    trades.sort((obj1, obj2) => obj1.date.getTime() - obj2.date.getTime());
    for (let trade in trades) {
    }
  } catch (err) {
    return NextResponse.json({
      code: "failed",
      message: "Error occured",
      error: err,
    });
  }

  return NextResponse.json(
    {
      code: "success",
      message: "Trades imported successfully",
    },
    { status: 200 }
  );
}
