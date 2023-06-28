import styled from "styled-components"

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: #5542f6;
    font-weight: normal;
    font-size: 1.1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

`;

export default function Table(props){
    return (
        <StyledTable {...props}>
            
        </StyledTable>
    )
}