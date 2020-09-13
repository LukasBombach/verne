import React, { FC } from "react";
import useDocument from "../hooks/useDocument";
import useEvents from "../hooks/useEvents";
import setSelection from "../lib/setSelection";
import { TextProps } from "../types";

const Text: FC<TextProps> = ({ id, text }) => {
  const { updateNode, ref } = useDocument<HTMLSpanElement>(id);
  const events = useEvents();

  events.on("keyDown", async ({ node, offset, str }) => {
    if (node.props.id !== id) return;
    const text =
      node.props.text.slice(0, offset) + str + node.props.text.slice(offset);
    const newOffset = offset + str.length;
    const newNode = await updateNode(node, { text });
    setSelection({ node: newNode, offset: newOffset });
  });

  return <span ref={ref}>{text}</span>;
};

export default Text;
