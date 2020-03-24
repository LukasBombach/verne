import React from "react";
import useDocument from "../hooks/useDocument";
import useEvents from "../hooks/useEvents";
import { VC } from "../context/document";

const Text: VC<{ text: string }> = ({ node }) => {
  const { updateNode } = useDocument();
  const events = useEvents();

  events.on("keyDown", ({ offset, str }) => {
    const text = node.text.slice(0, offset) + str + node.text.slice(offset);
    updateNode(node, { text });
  });

  return <>{node.text}</>;
};

export default Text;
