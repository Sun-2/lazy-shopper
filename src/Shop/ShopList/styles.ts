import styled from "styled-components";

export const Root = styled.div<{ state: "open" | "closed" }>`
  opacity: ${({ state }) => (state === "open" ? 1 : 0)};
  pointer-events: ${({ state }) => (state === "open" ? "all" : "none")};

  ${() => ({})}

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: white; //todo theme
`;
