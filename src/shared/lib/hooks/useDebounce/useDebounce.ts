import { MutableRefObject, useCallback, useRef } from 'react';

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
    const timerRef = useRef() as MutableRefObject<any>;

    return useCallback(
        (...args: any[]) => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );
}
