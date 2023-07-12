/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Center from "../../components/Center"
import Header from "../../components/Header";
import Title from "../../components/Title";
import {mongooseConnect} from "../../lib/mongoose";
import { Product } from "../../models/Product";
import WhiteBox from "../../components/Box";
import ProductImages from "../../components/ProductImages";
import CartIcon from "../../icons/CartIcon";
import FlyingButton from "../../components/FlyingButton";


const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({ product }) {
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <FlyingButton main _id={product._id} src={product.images?.[0]}>
                  <CartIcon />
                  Add to cart
                </FlyingButton>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;

  console.log("id:", id);
  console.log("typeof id:", typeof id);

  const product = await Product.findById(id);

  console.log("product:", product);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
