import React from "react";
import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin-top: 30px 0 20px;
`;

export default function NewProducts({ products, wishedProducts }) {
  // Function to compare the dates of two products
  const compareDates = (a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Sort from newest to oldest
  };

  // Sort the products array based on their date in descending order (newest first)
  const sortedProducts = [...products].sort(compareDates);

  // Get the latest 8 products
  const latestEightProducts = sortedProducts.slice(0, 8);

  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid
        products={latestEightProducts}
        wishedProducts={wishedProducts}
      />
    </Center>
  );
}
