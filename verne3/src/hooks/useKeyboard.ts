import { useEvent } from "./useEvents";

export function useKeyboard() {
  const onKeyDown = useEvent("keydown");

  const onInput = (listener: (event: KeyboardEvent) => void) =>
    onKeyDown(listener);

  return { onInput };
}
