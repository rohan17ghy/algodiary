import { Symbol } from "@algodiary/types";
import { FyersDataSocket } from "./fyers-data-socket";

export class LTPSocket {
    private static _instance: LTPSocket;
    public static ltpSocket: any;

    private static pendingSubscriptions: string[];

    private constructor() {}

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
        this.ltpSocket.autoreconnect(6);
    }

    static getInstance() {
        if (!LTPSocket._instance) {
            this.ltpSocket = FyersDataSocket.getInstance();
            this.init();
            this._instance = new LTPSocket();
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

    subscribeToSymbol(symbol: Symbol) {
        if (LTPSocket.ltpSocket.readyState === WebSocket.OPEN) {
            LTPSocket.ltpSocket.subscribe([symbol.symbol]);
            console.log(`subscribed to ltp for symbol ${symbol.symbol}`);
        } else {
            LTPSocket.pendingSubscriptions.push(symbol.symbol);
        }
    }

    unsubscribeFromSymbol(symbol: Symbol) {
        LTPSocket.ltpSocket.unsubscribe([symbol.symbol]);

        if (LTPSocket.ltpSocket.readyState === WebSocket.OPEN) {
            LTPSocket.ltpSocket.unsubscribe([symbol.symbol]);
        } else {
            // You might want to handle pending unsubscriptions similarly
            LTPSocket.pendingSubscriptions =
                LTPSocket.pendingSubscriptions.filter(
                    (sym) => sym !== symbol.symbol
                );
        }
    }

    addMessageHandler(messageHandler: (message: any) => Promise<void> | void) {
        LTPSocket.ltpSocket.on("message", messageHandler);
    }

    connect() {
        LTPSocket.ltpSocket.connect();
    }
}
