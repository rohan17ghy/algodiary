import { EventEmitter } from "events";

export class MinuteEventEmitter extends EventEmitter {
    private intervalMinutes: number;

    constructor(intervalMinutes: number) {
        super();
        this.intervalMinutes = intervalMinutes;
        this.setupInitialTimeout();
    }

    private setupInitialTimeout() {
        const now = new Date();
        const nextEventTime = this.calculateNextEventTime(now);
        //1sec buffer is given to avoid any corner cases where time is exactly at the starting minute. For ex: 5:31:00 AM
        const msUntilNextEvent = nextEventTime.getTime() - now.getTime() + 1000;

        setTimeout(() => {
            this.emit("minuteEvent", new Date());
            this.setupRecurringInterval();
        }, msUntilNextEvent);
    }

    private setupRecurringInterval() {
        setInterval(() => {
            this.emit("minuteEvent", new Date());
        }, this.intervalMinutes * 60000); // intervalMinutes * 60000 milliseconds
    }

    private calculateNextEventTime(currentTime: Date): Date {
        const startPoint = new Date(currentTime);
        startPoint.setHours(9, 15, 0, 0);

        if (currentTime < startPoint) {
            return startPoint;
        }

        const intervalSeconds = this.intervalMinutes * 60;
        const elapsedTime =
            (currentTime.getTime() - startPoint.getTime()) / 1000;
        const elapsedSeconds = Math.floor(elapsedTime);
        const nextEventSeconds =
            Math.ceil(elapsedSeconds / intervalSeconds) * intervalSeconds;
        const nextEventTime = new Date(
            startPoint.getTime() + nextEventSeconds * 1000
        );

        return nextEventTime;
    }
}
