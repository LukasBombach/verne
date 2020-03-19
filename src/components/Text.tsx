import React from "react";
import useDomMap from "../hooks/useDomMap";

interface TextProps {
  text: string;
  id: number;
}

const Text = ({ text, id }: TextProps) => {
  const { ref } = useDomMap(id);
  return <span ref={ref}>{text}</span>;
};

export default Text;
