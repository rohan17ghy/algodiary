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

export function convertToEpoch(dateTime: Date): Number {
    //console.log(`DateTime: ${dateTime}`);
    return Math.floor(dateTime.getTime() / 1000);
}

//Converting epoch to datetime
export function convertToLocalTime(epoch: number) {
    let utcTime = new Date(epoch * 1000);
    let localTime = utcTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
    });
    return localTime;
}
/**
 * Used to calculate the opening time of the previous candle depending on the timeframe.
 * @param timeframe
 * @returns date object
 */
export function calculatePreviousInterval(timeframe: number): Date {
    if (timeframe <= 0) {
        throw new Error("Timeframe must be greater than zero.");
    }

    // Define the fixed starting time: 9:15
    const startTime = new Date();
    startTime.setHours(9, 15, 0, 0);

    // Get the current time
    const currentTime = new Date();

    // Calculate the difference in minutes between the current time and the start time
    const minutesDifference = Math.floor(
        (currentTime.getTime() - startTime.getTime()) / (1000 * 60)
    );

    // Determine the number of complete intervals that have passed
    const completedIntervals = Math.floor(minutesDifference / timeframe);

    // Compute the start time of the second-to-last interval
    const previousIntervalStartTime = new Date(
        startTime.getTime() + (completedIntervals - 1) * timeframe * 60 * 1000
    );

    return previousIntervalStartTime;
}
