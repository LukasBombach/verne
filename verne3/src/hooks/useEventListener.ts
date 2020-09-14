import { useRef, useEffect } from "react";

function useEventListener(eventName: string, eventListener: EventListener) {
  const elementRef = useRef<HTMLElement>();
  const element = elementRef.current;

  useEffect(() => {
    const isSupported = element?.addEventListener;
    if (!isSupported) return;

    element?.addEventListener(eventName, eventListener);

    return () => element?.removeEventListener(eventName, eventListener);
  }, [eventName, element]);

  return elementRef;
}

export default useEventListener;
