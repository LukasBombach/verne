import { domMap } from "../context/dom";

import { Selection } from "../types";

export default function setSelection({ props, offset }: Selection): void {
  const [domNode] = [...domMap.entries()].find(([, { id }]) => id == props.id);
  debugger;
}
