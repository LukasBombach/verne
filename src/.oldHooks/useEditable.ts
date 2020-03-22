import { useState } from "react";

const defaultProps = {
  contentEditable: true,
  suppressContentEditableWarning: true,
  spellCheck: false
};

export default function useEditable() {
  const [props, setProps] = useState(defaultProps);
  return [props, setProps];
}
