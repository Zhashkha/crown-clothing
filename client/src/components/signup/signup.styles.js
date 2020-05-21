import styled from "styled-components";

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  @media screen and (max-width: 800px) {
    width: 295px;    
    
    button {
      min-width: unset;
      font-size: 12px;
    }
  }
`;

export const TitleContainer = styled.h2`
  margin: 10px 0;
`;
