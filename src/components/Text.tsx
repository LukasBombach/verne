import React from "react";
import useDocument from "../hooks/useDocument";
import useEvents from "../hooks/useEvents";
import { VC, TextProps } from "../types";

const Text: VC<TextProps> = ({ node }) => {
  const { updateNode } = useDocument();
  const events = useEvents();

  events.on("keyDown", ({ id, offset, str }) => {
    if (id !== node.id) return;
    const text = node.text.slice(0, offset) + str + node.text.slice(offset);
    updateNode(node, { text });
  });

  return <>{node.text}</>;
};

export default Text;
