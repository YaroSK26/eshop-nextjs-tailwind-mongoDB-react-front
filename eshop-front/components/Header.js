import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "../icons/Bars";
import SearchIcon from "../icons/SearchIcon";



const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top:0;
  z-index: 100;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
    display:block;

`
      : `display:none;
      `};

  gap: 40px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;

  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items:center;
    position: static;
    padding: 0px ;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  min-width: 25px;
  height: 20px;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;


const NavButton = styled.div`
  background-color: transparent;
  width: 20px;
  height: 20px;
  border: none;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap:10px;
  a {
    display: inline-block;
    min-width: 20px;
    color: white;
  }
  svg {
    width: inherit;
    height: inherit;
  }
`


export default function Header() {
  const {cartProducts} = useContext(CartContext) 
  const [mobileNavActive, setMobileNavActive] = useState(false)

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <SideIcons>
            <Link href={"/search"}>
              <SearchIcon />
            </Link>
            <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
              <BarsIcon></BarsIcon>
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
