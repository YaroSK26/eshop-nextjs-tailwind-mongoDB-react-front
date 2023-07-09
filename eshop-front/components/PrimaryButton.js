import styled, { css } from "styled-components";
import { primary } from "../lib/colors";

export const ButtonStyle = css`
  border: 0;
  font-size: 1.1rem;
  padding: 12px 10px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  gap: 10px;
  color: #fff;
  font-weight: 600;
  font-family: "Poppins ", sans-serif;
  text-align: center;
  background-color: #5542f6;

  svg {
    height: 1.2rem;
    text-align: center;
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
      font-size: 1.1rem;
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
      color: #fff;
      @media screen and (max-width: 768px) {
        margin-left: 32px;
        padding: 5px 10px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
    `}

     ${(props) =>
    props.padding === "11" &&
    css`
      padding: 5px 11px;
      color: #fff;
      @media screen and (max-width: 768px) {
        margin-left: 32px;
        padding: 5px 12px;
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
