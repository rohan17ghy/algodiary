const fyers = require("fyers-api-v3");

export class FyersDataSocket {
    private static _instance: FyersDataSocket;
    protected static _fyersDataSocket: any;

    protected constructor() {}

    public static getInstance(access_token: string) {
        if (!FyersDataSocket._instance) {
            FyersDataSocket._fyersDataSocket = new fyers.fyersDataSocket(
                access_token
            );
            FyersDataSocket._instance = new FyersDataSocket();
            console.log(`Fyers data socket initialized successfully`);
        }

        return FyersDataSocket._fyersDataSocket;
    }
}
