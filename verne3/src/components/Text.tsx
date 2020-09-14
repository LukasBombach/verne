import React, { useState } from "react";
import useVerne from "../hooks/useVerne";

export interface TextProps {
  text?: string;
}

const Text = ({ text }: TextProps) => {
  const [value, setValue] = useState(text);
  const { onInput } = useVerne();

  onInput((v) => setValue(v));

  return <span>{value}</span>;
};

export default Text;
