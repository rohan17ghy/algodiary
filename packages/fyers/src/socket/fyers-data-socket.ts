const fyers = require("fyers-api-v3");
const FyersSocket = require("fyers-api-v3").fyersDataSocket;

export class FyersDataSocket {
    private static _instance: FyersDataSocket;
    protected static _fyersDataSocket: any;

    protected constructor() {}

    public static getInstance() {
        if (!FyersDataSocket._instance) {
            const token = `${process.env.FYERS_CLIENT_ID}:${process.env.FYERS_ACCESS_TOKEN}`;
            console.log(`Token ${token}`);
            console.log(`FyersSocket: ${JSON.stringify(FyersSocket)}`);
            FyersDataSocket._fyersDataSocket = new FyersSocket(
                process.env.FYERS_ACCESS_TOKEN
            );
            FyersDataSocket._instance = new FyersDataSocket();
            console.log(`Fyers data socket initialized successfully`);
        }

        return FyersDataSocket._fyersDataSocket;
    }
}
