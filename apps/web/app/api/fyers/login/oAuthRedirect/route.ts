import { NextRequest } from "next/server";
import { FyersModel } from "@algodiary/fyers";
import { AuthenticationFailedResponse, ValidResponse } from "@/lib/response";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;
        const code = searchParams.get("code");
        const auth_code = searchParams.get("auth_code");

        console.log(`Login successfull`);
        if (code == "200") {
            //const auth_code: string = auth_code as string;
            const fyersModel = FyersModel.getInstance();
            //fyersModel.setAuthCode(auth_code);
            //console.log(fyersModel.getAuthCode());
            fyersModel
                .generate_access_token({
                    secret_key: process.env.FYERS_SECRET_KEY,
                    auth_code: auth_code,
                })
                .then((response: any) => {
                    //setAccessToken(response.access_token);
                    fyersModel.setAccessToken(response.access_token);
                    console.log(`User authenticated successfully`);
                })
                .catch((error: any) => {
                    console.log(
                        `Error authenticating user: ${JSON.stringify(error)}`
                    );
                });

            return ValidResponse({
                message: "User authenticated successfully",
            });
        } else {
            return AuthenticationFailedResponse();
        }
    } catch (err: any) {
        return AuthenticationFailedResponse({ err });
    }
}
