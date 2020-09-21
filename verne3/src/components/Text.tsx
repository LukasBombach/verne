import React from "react";
import { useVerne } from "../hooks";

import type { VC } from ".";

export const Text: VC = ({ node }) => {
  const { onKeyDown, insertText, caret } = useVerne();
  onKeyDown(key => insertText(node, caret.offset, key));
  return <span>{node.text}</span>;
};

Text.onKeyDown;
