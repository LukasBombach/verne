import React, { FC, KeyboardEvent } from "react";
import { styled } from "linaria/react";
import useAutofocus from "../hooks/useAutofocus";
import useEvents from "../hooks/useEvents";
import { initialState } from "../model";

const Div = styled.div`
  border: 1px solid red;
  width: 100vw;
  height: 100vh;
  max-width: 500px;
  max-height: 300px;
`;

const Container: FC = props => {
  const { emitNative } = useEvents();
  const ref = useAutofocus<HTMLDivElement>();

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
      {initialState.map(({ node, key, props }) =>
        React.createElement(node, { ...props, key })
      )}
    </Div>
  );
};

export default Container;
