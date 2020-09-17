import { useEvent } from "./useEvents";

export function useKeyboard() {
  const onKeyDown = useEvent("keydown");

  const onInput = (listener: (key: string) => void) => {
    onKeyDown((event) => {
      event.preventDefault();
      if (!/^[a-zA-Z0-9 ]$/.test(event?.key)) return;
      listener(event.key);
    });
  };

  return { onInput };
}
