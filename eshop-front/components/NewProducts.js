import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin-top: 30px 0 20px;
`;

export default function NewProducts({ products, wishedProducts }) {
  // Get the last 8 products
  const lastEightProducts = products.slice(-8);

  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid
        products={lastEightProducts}
        wishedProducts={wishedProducts}
      />
    </Center>
  );
}
