import { useState } from "react";
import useVerne from "../hooks/useVerne";

const Text = () => {
  const [value, setValue] = useState("");
  const { onInput } = useVerne();

  onInput((v) => setValue(v));

  return value;
};

export default Text;
