const fyers = require("fyers-api-v3");

export class FyersModel {
    private static _instance: FyersModel;
    //`any` type  as there is no type provided by the fyers-api-v3 library
    private static _fyersModel: any;

    private constructor() {}

    public static getInstance() {
        if (!FyersModel._instance) {
            FyersModel._instance = new FyersModel();
            FyersModel._fyersModel = new fyers.fyersModel();
            console.log(`Fyers model initialized successfully`);

            FyersModel._fyersModel.setAppId(process.env.FYERS_CLIENT_ID);
            FyersModel._fyersModel.setRedirectUrl(
                process.env.FYERS_REDIRECT_URL
            );
            FyersModel._fyersModel.setAccessToken(
                process.env.FYERS_ACCESS_TOKEN
            );
            console.log(`AppId, redirectUrl & access token set successfully`);
            console.log(
                `ClientID: ${process.env.FYERS_CLIENT_ID}, REDIRECT_URL: ${process.env.FYERS_REDIRECT_URL}`
            );
        }

        return FyersModel._fyersModel;
    }

    public getBrokerLoginURL = (): URL => {
        return FyersModel._fyersModel.generateAuthCode();
    };
}
