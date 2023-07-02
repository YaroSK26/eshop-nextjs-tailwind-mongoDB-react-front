/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Center from "../../components/Center"
import Header from "../../components/Header";
import Title from "../../components/Title";
import {mongooseConnect} from "../../lib/mongoose";
import { Product } from "../../models/Product";
import WhiteBox from "../../components/Box";
import ProductImages from "../../components/ProductImages";
import PrimaryButton from "../../components/PrimaryButton";
import CartIcon from "../../icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "../../components/CartContext";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
`;

const PriceRow = styled.div`
    gap: 20px;
    display: flex;
    align-items:center;
`

const Price = styled.span`
    font-size: 1.4rem;
`

export default function ProductPage({product}){
    const {addProduct} = useContext(CartContext)
    return (
      <>
        <Header></Header>
        <Center>
          <ColumnsWrapper>
            <WhiteBox>
              <ProductImages
                images={product.images}
                src={product.images?.[0]}
                alt=""
              />
            </WhiteBox>
            <div>
              <Title>{product.title}</Title>
              <p>{product.description}</p>
              <PriceRow>
                <Price>${product.price}</Price>
                <div>
                  <PrimaryButton primary onClick={()=> addProduct(product._id)}>
                    <CartIcon></CartIcon>Add to Cart
                  </PrimaryButton>
                </div>
              </PriceRow>
            </div>
          </ColumnsWrapper>
        </Center>
      </>
    );
}

export async function getServerSideProps(context){
    await mongooseConnect()
    const {id} = context.query
    const product = await Product.findById(context.params.id)
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}