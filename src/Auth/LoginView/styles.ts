import styled from "styled-components";

export const Form = styled.form`
  && {
    & > * + * {
      margin-top: ${({ theme }) => theme.spacing(1)}px;
    }
  }
`;
