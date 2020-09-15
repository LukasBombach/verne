import { useCallback } from "react";

function useEventListener(eventName: string, eventListener: EventListener) {
  const elementRef = useCallback((element) => {
    if (element !== null) {
      console.log("addEventListener", eventName);
      element.addEventListener(eventName, eventListener);
    }
  }, []);

  return elementRef;
}

export default useEventListener;
