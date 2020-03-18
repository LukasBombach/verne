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
  const [doc] = useDocument();
  const ref = useAutofocus<HTMLDivElement>();

  const props = {
    ...eventHandlers,
    contentEditable: true,
    suppressContentEditableWarning: true,
    spellCheck: false,
    ref: ref
  };

  return <Div {...props}>{doc}</Div>;
};

export default Container;
