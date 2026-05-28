import { useCallback, useEffect, useRef } from "react";

type TCallbackFn<TArgs extends unknown[]> = (...args: TArgs) => Promise<void> | void;

const useDebouncedCallback = <TArgs extends unknown[]>(
  callback: TCallbackFn<TArgs>,
  delay = 300,
): ((...args: TArgs) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  const debouncedCallback = useCallback(
    (...args: TArgs) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout((): void => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );

  useEffect(() => {
    return (): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

export { useDebouncedCallback };
