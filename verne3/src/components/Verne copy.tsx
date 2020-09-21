// import React, { useState, useRef } from "react";
// import { Provider, insertText } from "../document";
// import { Text } from "./Text";
//
// import type { Node } from "../document";
//
// type OnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => void;
//
// const initalDocument: Node = {
//   id: 0,
//   children: [
//     { id: 1, text: "hello " },
//     { id: 2, text: "world" },
//   ],
// };
//
// const containerProps = {
//   contentEditable: true,
//   spellCheck: false,
//   suppressContentEditableWarning: true,
//   style: { whiteSpace: "pre-wrap" },
// } as const;
//
// export const Verne = () => {
//   const [document, setDocument] = useState<Node>(initalDocument);
//   const elementRef = useRef<HTMLDivElement>(null);
//
//   const children =
//     document.children?.map((node) => <Text key={node.id} text={node.text} />) ??
//     null;
//
//   const getCurrentlySelectedNode = () /* : Node */ => {
//     if (!elementRef.current) {
//       throw new Error("Missing Element Ref");
//     }
//     const selection = window.document.getSelection();
//     const range = selection?.getRangeAt(0);
//     let el = range?.startContainer?.parentNode;
//     if (!el) {
//       throw new Error("Missing startContainer of selection");
//     }
//     const indices = [];
//     while (el !== elementRef.current) {
//       if (!el.parentNode || el.parentNode === window.document) {
//         throw new Error("Missing el.parentNode");
//       }
//       indices.push(Array.prototype.indexOf.call(el.parentNode.children, el));
//       el = el.parentNode;
//     }
//
//     let node = document;
//
//     for (let i = 0; i < indices.length; i++) {
//       if (!node.children) throw new Error("node.children are undefined");
//       node = node.children[indices[i]];
//     }
//
//     return node;
//   };
//
//   const getCurrentlySelectedOffset = () => {
//     const selection = window.document.getSelection();
//     const range = selection?.getRangeAt(0);
//     const offset = range?.startOffset;
//     if (offset === undefined) {
//       throw new Error("Cannot get offset");
//     }
//     return offset;
//   };
//
//   function setOffset(node: any /* Node */, offset: number) {
//     const range = new Range();
//     range.setStart(node, offset);
//     range.setEnd(node, offset);
//     window.document.getSelection()?.removeAllRanges();
//     window.document.getSelection()?.addRange(range);
//   }
//
//   const onKeyDown: OnKeyDown = (event) => {
//     event.preventDefault();
//     if (!/^[a-zA-Z0-9 ]$/.test(event?.key)) return;
//     const selection = window.document.getSelection();
//     const range = selection?.getRangeAt(0);
//     const span = range?.startContainer.parentNode;
//     const node = getCurrentlySelectedNode();
//     const offset = getCurrentlySelectedOffset();
//     const newNode = insertText(node, offset, event?.key);
//     const children = document.children?.slice();
//     children?.splice(children?.indexOf(node), 1, newNode);
//     const newDocument = { ...document, children };
//     console.log("before", span?.firstChild?.textContent);
//     setDocument(newDocument);
//     console.log("after", span?.firstChild?.textContent);
//     setOffset(span?.firstChild, offset + 1);
//   };
//
//   return (
//     <Provider value={{ document, setDocument }}>
//       <div {...containerProps} onKeyDown={onKeyDown} ref={elementRef}>
//         {children}
//       </div>
//     </Provider>
//   );
// };
//
// export default Verne;

export default null;
