import { clsx, type ClassValue } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function InvalidInputApiResponse(error?: any) {
  return NextResponse.json(
    {
      code: "failed",
      message: "Invalid input data",
      error: error,
    },
    { status: 400 }
  );
}
