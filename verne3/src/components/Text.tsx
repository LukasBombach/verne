import React, { useState, useRef, useEffect } from "react";
import { useKeyboard, useCaret } from "../hooks";

export interface TextProps {
  text?: string;
}

const Text = ({ text }: TextProps) => {
  const [value, setValue] = useState(text);
  const valueRef = useRef(value);
  const spanRef = useRef<HTMLSpanElement>(null);
  const { onInput } = useKeyboard();
  const { getOffset, setOffset } = useCaret();

  valueRef.current = value;

  useEffect(() => {
    onInput((e) => {
      const offset = getOffset();

      if (!offset) return;

      const newValue =
        valueRef.current?.slice(0, offset) +
        e.key +
        valueRef.current?.slice(offset);

      e.preventDefault();

      setValue(newValue);

      if (spanRef.current?.firstChild) {
        setOffset(spanRef.current.firstChild, offset + 1);
      }
    });

    return () => console.log("todo: remove onInput listener");
  }, []);

  return <span ref={spanRef}>{value}</span>;
};

export default Text;
