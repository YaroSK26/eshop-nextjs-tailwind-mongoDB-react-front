/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 40px;
`;

const ProductsGrid = ({products}) => {
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product) => <ProductBox key={product._id} {...product}></ProductBox>)}
    </StyledProductsGrid>
  );
}

export default ProductsGrid
