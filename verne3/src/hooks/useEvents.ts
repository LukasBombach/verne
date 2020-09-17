import { useCallback } from "react";
import mitt from "mitt";

import type { Handler } from "mitt";

const emitter = mitt();

export function useEvent(eventName: string) {
  const onEvent = (listener: Handler) => {
    emitter.on(eventName, listener);
  };
  return onEvent;
}

export function useEventEmitter() {
  const elementRef = useCallback((element) => {
    if (element !== null) {
      element.addEventListener("keydown", (e: any) =>
        emitter.emit("keydown", e)
      );
    }
  }, []);

  return elementRef;
}
