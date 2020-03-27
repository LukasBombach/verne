import { createContext } from "react";
import { TextProps } from "../types";

export const domMap = new Map<globalThis.Node, TextProps>();

const domContext = createContext(domMap);

export default domContext;
