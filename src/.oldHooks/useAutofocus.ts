import { useRef, useEffect } from "react";

export default function useAutofocus<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  return ref;
}
