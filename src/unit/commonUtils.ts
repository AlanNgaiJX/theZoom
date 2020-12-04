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

export function dateFormat(fmt: string, date: Date): string {
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const k in opt) {
        const ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(
                ret[1],
                ret[1].length == 1
                    ? opt[k]
                    : opt[k].padStart(ret[1].length, "0")
            );
        }
    }
    return fmt;
}
