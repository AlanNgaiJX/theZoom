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

interface ShowOption extends NotificationOptions {
    duration?: number;
}
export function showNotification(title: string, showOption?: ShowOption) {
    if (!window.Notification) {
        console.warn("notification is not support!!");
        return;
    }

    // 整合 全局配置 和 实时配置
    const options = Object.assign(
        {},
        window.notificationConfig || {},
        showOption || {}
    );
    
    function show() {
        const n = new Notification(title, options);
        setTimeout(() => {
            n.close();
        }, options?.duration || 3000);
    }

    if (window.Notification.permission === "granted") {
        show();
    } else if (window.Notification.permission === "default") {
        window.Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                show();
            }
        });
    }
}

export function initNotification(config?: ShowOption) {
    window.Notification.requestPermission();
    Object.assign(window, {
        notificationConfig: config,
    });
}
