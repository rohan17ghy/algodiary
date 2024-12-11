import { FyersDataSocket } from "./fyers-data-socket";

export class LTPSocket {
    private static _instance: LTPSocket;
    public static ltpSocket: any;

    private static pendingSubscriptions: string[];

    public constructor(access_token: string) {
        return LTPSocket.getInstance(access_token);
    }

    static init() {
        this.pendingSubscriptions = [];
        this.ltpSocket.on("connect", () => {
            console.log("Connected to fyers ltp socket.");

            this.processPendingSubscriptions();
        });
        this.ltpSocket.on("error", (err: any) => {
            console.error(`Error on fyers ltp socket: ${JSON.stringify(err)}`);
        });
        this.ltpSocket.on("close", () => {
            console.log("Fyers ltp socket closed");
        });
        this.connect();
    }

    private static getInstance(access_token: string) {
        if (!LTPSocket._instance) {
            this.ltpSocket = FyersDataSocket.getInstance(access_token);
            this.init();
            this._instance = new LTPSocket(access_token);
            console.log(`LTP socket initialized`);
        }
        return LTPSocket._instance;
    }

    private static processPendingSubscriptions() {
        while (this.pendingSubscriptions.length > 0) {
            const symbol = this.pendingSubscriptions.shift();
            if (symbol) {
                this.ltpSocket.subscribe([symbol]);
                console.log(`subscribed to ltp for symbol ${symbol}`);
            }
        }
    }

    subscribeToSymbol(symbol: string) {
        if (LTPSocket.ltpSocket.readyState === WebSocket.OPEN) {
            LTPSocket.ltpSocket.subscribe([symbol]);
            console.log(`subscribed to ltp for symbol ${symbol}`);
            LTPSocket.ltpSocket.autoreconnect(6);
        } else {
            LTPSocket.pendingSubscriptions.push(symbol);
        }
    }

    unsubscribeFromSymbol(symbol: string) {
        LTPSocket.ltpSocket.unsubscribe([symbol]);

        if (LTPSocket.ltpSocket.readyState === WebSocket.OPEN) {
            LTPSocket.ltpSocket.unsubscribe([symbol]);
        } else {
            // You might want to handle pending unsubscriptions similarly
            LTPSocket.pendingSubscriptions =
                LTPSocket.pendingSubscriptions.filter((sym) => sym !== symbol);
        }
    }

    addMessageHandler(messageHandler: (message: any) => Promise<void> | void) {
        LTPSocket.ltpSocket.on("message", messageHandler);
    }

    static connect() {
        LTPSocket.ltpSocket.connect();
    }
}
