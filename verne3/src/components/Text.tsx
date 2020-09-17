import React, { useState } from "react";
import { useKeyboard, useCaret } from "../hooks";

export interface TextProps {
  text?: string;
}

const Text = ({ text }: TextProps) => {
  const [value, setValue] = useState(text);
  const { onInput } = useKeyboard();
  const { offset } = useCaret();

  onInput((e) => {
    const newValue = value?.slice(0, offset) + e.key + value?.slice(offset);
    e.preventDefault();
    setValue(newValue);
  });

  return <span>{value}</span>;
};

export default Text;
