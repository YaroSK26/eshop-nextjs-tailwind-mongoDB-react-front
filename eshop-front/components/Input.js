import styled from "styled-components"


const StyledInput = styled.input`
    width: 100%;
    padding: 5px;
    margin-bottom: 5px;
    border : 1px solid #ccc;
    border-radius: 5px;
    font-size:18px;
    box-sizing: border-box;
`

export default function Input(props){
    return (
        <div>
            <StyledInput type="text" {...props} />
        </div>
    )
}