import React from "react";
import { css } from "linaria";
import { styled } from "linaria/react";
import Document from "./components/Document";

const Container = styled.div`
  border: 1px solid red;
  width: 100vw;
  height: 100vh;
  max-width: 500px;
  max-height: 300px;
`;

function App() {
  return (
    <Container>
      <Document />
    </Container>
  );
}

css`
  :global() {
    html,
    body {
      margin: 0px;
      padding: 0px;
    }

    body {
      background-color: #282c34;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      font-family: -apple-system, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }
`;

export default App;
