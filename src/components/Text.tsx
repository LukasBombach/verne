import React from "react";
import useDocument from "../hooks/useDocument";
import useEvents from "../hooks/useEvents";
import setSelection from "../lib/setSelection";
import { VC, TextProps } from "../types";

const Text: VC<TextProps> = ({ node }) => {
  const { updateNode, ref } = useDocument<HTMLSpanElement>(node);
  const events = useEvents();

  events.on("keyDown", async ({ id, offset, str }) => {
    if (id !== node.id) return;
    const text = node.text.slice(0, offset) + str + node.text.slice(offset);
    const newOffset = offset + str.length;
    const newNode = await updateNode(node, { text });
    setSelection({ node: newNode, offset: newOffset });
  });

  return <span ref={ref}>{node.text}</span>;
};

export default Text;
