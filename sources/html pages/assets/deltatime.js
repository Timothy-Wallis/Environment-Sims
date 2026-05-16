export class DeltaTime{
    intervalId = null;
    constructor(){
    }
    onTick(callback, frequency = 1000){
        this.destroy();
        this.intervalId = setInterval(() => {
            callback();
        }, frequency);
    }
    destroy(){
        if(this.intervalId !== null){
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
export const Second = 1000;
export const Minute = 60 * Second;
export const Hour = 60 * Minute;
export const Day = 24 * Hour;
export const Week = 7 * Day;
export const Year = 365 * Day;  