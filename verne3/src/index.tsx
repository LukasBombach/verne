import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import Verne from "./Verne";

export { useVerne } from "./useVerne";
export { useDocument } from "./useDocument";
export { useDom } from "./useDom";
export { useKeyboard } from "./useKeyboard";
export { useMouse } from "./useMouse";
export type { Node } from "./useDocument";
export type { Caret } from "./useMouse";
export type { UseVerne, UseVerneRef } from "./useVerne";

const document = {
  children: [{ text: "hello " }, { text: "world" }],
};

ReactDOM.render(
  <StrictMode>
    <Verne document={document} />
  </StrictMode>,
  window.document.getElementById("root")
);
