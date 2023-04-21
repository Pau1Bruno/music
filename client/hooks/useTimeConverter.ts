export const useTimeConverter = (seconds: number): string => {
    let sec: number;
    let min: number = 0;
    
    while (seconds > 59) {
        min++;
        seconds -= 60;
    }
    
    sec = seconds;
    if (sec < 10) return min + ":" + "0" + sec;
    else return min + ":" + sec;
};