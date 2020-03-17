import React, { FC, useState } from "react";
import { styled } from "linaria/react";
import useAutofocus from "../hooks/useAutofocus";
import Text from "./Text";

const Div = styled.div`
  border: 1px solid red;
  width: 100vw;
  height: 100vh;
  max-width: 500px;
  max-height: 300px;
`;

type NodeType = "Text";
type NodeProps<T extends {}> = T;

interface Node<T = {}> {
  type: NodeType;
  props: NodeProps<T>;
}

const Container: FC = ({ children, ...props }) => {
  const ref = useAutofocus<HTMLDivElement>();
  const [contents, setContents] = useState<Node[]>([]);

  return (
    <Div
      {...props}
      ref={ref}
      contentEditable={true}
      suppressContentEditableWarning={true}
      spellCheck={false}
      onKeyDown={handleKeyDown}
    >
      <Text text="hello world" />
    </Div>
  );
};

function handleKeyDown(...args: any[]) {
  console.log(...args);
}

export default Container;
