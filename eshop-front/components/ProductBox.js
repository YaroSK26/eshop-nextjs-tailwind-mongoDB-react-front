/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Link from "next/link";
import FlyingButton from "../components/FlyingButton";
const ProductWrapper = styled.div`
button {
  width: 100%;
  text-align: center;
  justify-content: center;
}
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
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  gap: 10px;

  @media screen and (min-width: 768px) {
    display: flex;
    margin-top: 2px;

  
  }
`;
const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  font-weight: bold;
  text-align: right;
`;





const ProductBox = ({ _id, title, description, price, images }) => {
  
  const url = "/product/" + _id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}> {title} </Title>
        <PriceRow>
          <Price>${price}</Price>
                  <FlyingButton   _id={_id} src={images?.[0]}>Add to cart</FlyingButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
