import styled from "styled-components";

const StyledTabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const StyledTab = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
  ${(props) =>
    props.active
      ? `
        color: black;
        border-bottom: 2px solid black;
    `
      : `
        color: #999;
    `}
`;

const Tabs = ({ tabs, active, onChange }) => {
  return (
    <StyledTabs>
      {tabs.map((tabName) => (
        <StyledTab
          active={tabName === active}
          key={tabName}
          className={tabName === active ? "active" : ""}
          onClick={() => onChange(tabName)}
        >
          {tabName}
        </StyledTab>
      ))}
    </StyledTabs>
  );
};



export default Tabs;
