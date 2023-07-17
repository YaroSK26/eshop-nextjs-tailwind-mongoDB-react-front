import styled from "styled-components";
import StarOutline from "../icons/StarOutline";
import StarSolid from "../icons/StarSolid";
import { useState } from "react";
import { primary } from "../lib/colors";

const StarWrapper = styled.div`
  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  color: ${primary};
  ${(props) =>
    props.size === "md" &&
    `
    height: 1.4rem; 
    width: 1.4rem;
  `}
  ${(props) =>
    props.size === "sm" &&
    `
    height: 1rem; 
    width: 1rem;
  `}
     ${(props) =>
    !props.disabled &&
    `
     cursor: pointer;
  `}
`;

const StarsWrapper = styled.div`
  display: inline-flex;
  gap: 1px;
 
`;

const StarsRating = ({size="md",defaultHowMany=0,disabled,onChange=()=>{}}) => {
    const [howMany, setHowMany] = useState(defaultHowMany);
    const five = [1,2,3,4,5]
    function handleStartClick(n){
         if (disabled) {
           return;
         }
        setHowMany(n)
        onChange(n)
       
    }
  return (
    <StarsWrapper>
      {five.map(n => (
        <>
          <StarWrapper disabled={disabled} size={size} onClick={() =>handleStartClick(n)}>
            {howMany >= n ? <StarSolid /> : <StarOutline />}
          </StarWrapper>
         
        </>
      ))}
    </StarsWrapper>
  );
};

export default StarsRating;
