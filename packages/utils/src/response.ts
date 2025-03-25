import { NextResponse } from "next/server";

export function AuthenticationFailedResponse(json: {} = {}) {
    return InvalidResponse({ message: "Authentication failed", ...json }, 401);
}

export function InvalidInputResponse(error?: any) {
    return InvalidResponse(
        { message: "Invalid input data", error: error },
        400
    );
}

export function ValidResponse(json: {}) {
    return NextResponse.json(
        {
            code: "success",
            ...json,
        },
        { status: 200 }
    );
}

export function InvalidResponse(json: {}, status: number = 500) {
    return NextResponse.json(
        {
            code: "failed",
            ...json,
        },
        { status }
    );
}
