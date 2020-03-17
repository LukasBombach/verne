import React, { FC } from "react";
import { styled } from "linaria/react";
import useAutofocus from "../hooks/useAutofocus";

const Container = styled.div`
  border: 1px solid red;
  width: 100vw;
  height: 100vh;
  max-width: 500px;
  max-height: 300px;
`;

const TextField: FC = ({ children, ...props }) => {
  const ref = useAutofocus<HTMLDivElement>();

  return (
    <Container {...props} contentEditable={true} ref={ref}>
      {children}
    </Container>
  );
};

export default TextField;
