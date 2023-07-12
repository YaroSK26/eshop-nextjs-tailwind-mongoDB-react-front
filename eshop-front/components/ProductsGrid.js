/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
import styled from "styled-components";
import ProductBox from "./ProductBox";
import { RevealWrapper } from "../node_modules/next-reveal";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  @media screen and (min-width: 982px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const ProductsGrid = ({ products, wishedProducts=[] }) => {
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product, index) => (
          <RevealWrapper key={product._id} delay={index * 50}>
            <ProductBox {...product} wished={wishedProducts.includes(product._id)}></ProductBox>
          </RevealWrapper>
        ))}
    </StyledProductsGrid>
  );
};

export default ProductsGrid;
