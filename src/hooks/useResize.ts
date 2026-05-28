import { useEffect, useState } from "react";

const useResize = (breakpoint: number): boolean => {
  const [isVisible, toggleVisible] = useState<boolean>(document.body.clientWidth < breakpoint);

  const onResize: ResizeObserverCallback = (entries): void => {
    if ((entries[0]?.contentRect.width ?? 0) < breakpoint) {
      toggleVisible(true);

      return;
    }

    toggleVisible(false);
  };

  useEffect((): VoidFunction => {
    const observer = new ResizeObserver(onResize);

    observer.observe(document.body);

    return (): void => {
      observer.unobserve(document.body);
    };
  }, [document.body]);

  return isVisible;
};

export { useResize };
