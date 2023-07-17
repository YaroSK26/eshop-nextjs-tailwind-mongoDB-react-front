import styled from "styled-components";



const StyledArea = styled.textarea`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 18px;
  box-sizing: border-box;
  resize: none;
  font-family: inherit;
`;

const Textarea = (props) => {
  return (
    <StyledArea {...props}/>
  )
}

export default Textarea
