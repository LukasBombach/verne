import { createContext } from "react";
import { Node, TextProps } from "../types";

export const domMap = new Map<globalThis.Node, Node<TextProps>>();

const domContext = createContext(domMap);

export default domContext;
