export interface ThrottleFun<T extends (...args: any[]) => any> {
    (...args: Parameters<T>): ReturnType<T> | undefined;
}

export function throttle<T extends (...args: any) => any>(
    fn: T,
    wait: number
): ThrottleFun<T> {
    let timer: number | null | undefined = undefined;
    const throttleFun: ThrottleFun<T> = function() {
        if (timer) {
            return;
        } else {
            fn();
            timer = setTimeout(function() {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
            }, wait);
        }
        return undefined;
    };
    return throttleFun;
}
