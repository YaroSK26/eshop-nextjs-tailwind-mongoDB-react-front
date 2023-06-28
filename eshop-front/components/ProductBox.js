/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import ButtonLink from "./ButtonLink";
import CartIcon from "../icons/CartIcon";
import Link from "next/link";
import { CartContext } from "./CartContext";
import { useContext } from "react";

const ProductWrapper = styled.div`

`;

const WhiteBox = styled(Link)`
  background-color: white;
  padding: 20px;
  height: 150px;
  text-align: center;
  display: Flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 1rem;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;
const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ProductBox = ({ _id, title, description, price, images }) => {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          {" "}
          <img src={images[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}> {title} </Title>
        <PriceRow>
          <Price>${price}</Price>
          <ButtonLink onClick={() => addProduct(_id)}  href={""} primary outline>
            <CartIcon />
            Add to cart
          </ButtonLink>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
