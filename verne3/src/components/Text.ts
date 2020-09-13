import { useState } from "react";

function useVerne() {
  const onInput = (callback: (value: string) => void) => {};

  return { onInput };
}

/* function useKeyboard() {
  const onInput = (callback: (value: string) => void) => {};

  return { onInput };
} */

const Text = () => {
  const [value, setValue] = useState("");
  const { onInput } = useVerne();

  onInput((v) => setValue(v));

  return value;
};

export default Text;
