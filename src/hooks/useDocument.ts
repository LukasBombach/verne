import { useContext } from "react";
import documentContext from "../context/document";
import useDomMap from "../hooks/useDomMap";
import { TextProps } from "../types";

export default function useDocument<T extends HTMLElement>(node: TextProps) {
  const ref = useDomMap<T>(node);
  const doc = useContext(documentContext);
  return { ...doc, ref };
}
