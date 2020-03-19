import React from "react";
import { styled } from "linaria/react";
import useEventHandlers from "../hooks/useEventHandlers";
import useDocument from "../hooks/useDocument";
import useAutofocus from "../hooks/useAutofocus";

const Div = styled.div`
  border: 1px solid red;
  width: 100vw;
  height: 100vh;
  max-width: 500px;
  max-height: 300px;
`;

const Container = () => {
  const eventHandlers = useEventHandlers();
  const ref = useAutofocus<HTMLDivElement>();
  const doc = useDocument();

  const props = {
    ...eventHandlers,
    contentEditable: true,
    suppressContentEditableWarning: true,
    spellCheck: false,
    ref: ref
  };

  return (
    <Div {...props}>
      {doc.nodes.map(node =>
        React.createElement(node, { ...props, key: props.id })
      )}
    </Div>
  );
};

export default Container;
