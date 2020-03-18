import React, { FC, KeyboardEvent, useState } from "react";
import { styled } from "linaria/react";
import useAutofocus from "../hooks/useAutofocus";
import useEvents from "../hooks/useEvents";
import TextNode from "./Text";

const Div = styled.div`
  border: 1px solid red;
  width: 100vw;
  height: 100vh;
  max-width: 500px;
  max-height: 300px;
`;

type NodeType = typeof TextNode;
type Props<T extends NodeType> = T extends NodeType ? Parameters<T>[0] : never;

interface Node<T extends NodeType> {
  node: T;
  key: number;
  props: Props<T>;
}

const initialState: Node<typeof TextNode>[] = [
  { node: TextNode, key: 1, props: { text: "hello world" } }
];

const Container: FC = props => {
  const [contents] = useState<Node<typeof TextNode>[]>(initialState);
  const { emitNative } = useEvents();
  const ref = useAutofocus<HTMLDivElement>();

  const children = contents.map(({ node, key, props }) => {
    const element = React.createElement(node, { ...props, key });
    return element;
  });

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    emitNative("keyDown", event);
  }

  return (
    <Div
      {...props}
      ref={ref}
      contentEditable={true}
      suppressContentEditableWarning={true}
      spellCheck={false}
      onKeyDown={handleKeyDown}
    >
      {children}
    </Div>
  );
};

export default Container;
