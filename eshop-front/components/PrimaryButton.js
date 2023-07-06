import styled, { css } from "styled-components";
import { primary } from "../lib/colors";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 0px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  gap: 10px;
  font-weight: 600;
  font-family: "Poppins ", sans-serif;
  text-align: center;

  svg {
    height: 16px;
    margin-right: 10px;
  }
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}

  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid white;
    `}
    ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      color: #fff;
      border: 1px solid ${primary};
    `}
     ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${primary};
      border: 1px solid ${primary};
    `}
    ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
    ${(props) =>
    props.padding === "5" &&
    css`
      padding: 5px 5px;
    `}
 ${(props) =>
    props.padding === "10" &&
    css`
      padding: 5px 10px;
      @media screen and (max-width: 768px) {
        margin-left: 32px;
        padding: 5px 10px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
    `}

   
`;

export const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function PrimaryButton({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
