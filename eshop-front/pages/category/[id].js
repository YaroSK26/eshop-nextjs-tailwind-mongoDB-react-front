import Header from "../../components/Header";
import Center from "../../components/Center";
import Title from "../../components/Title";
import { Category } from "../../models/Category";
import { Product } from "../../models/Product";
import ProductsGrid from "../../components/ProductsGrid";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { WishedProduct } from "../../models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";


const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 730px) {
    flex-direction: column;
    margin-bottom: 1.5rem;
    align-items:flex-start;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 15px;
  @media screen and (max-width: 730px) {
    flex-direction: column;
  
  }
`;

const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: #444;
  select {
    background-color: transparent;
    border: 0;
    font-size: inherit;
    color: #444;
    outline: none;
  }
`;

export default function CategoryPage({
  category,
  subCategories,
  products: originalProducts,
  wishedProducts,
}) {
  const [products, setProducts] = useState(originalProducts);

  const defaulSorting = "_id-asc";
  const defaultFiltersValues = category.properties.map((p) => ({
    name: p.name,
    value: "all",
  }));
  const [sort, setSort] = useState(defaulSorting);
  const [filtersValues, setFiltersValues] = useState(defaultFiltersValues);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);

  function handleFilterChange(filterName, filterValue) {
    setFiltersValues((prev) => {
      const updatedFilters = prev.map((p) =>
        p.name === filterName ? { ...p, value: filterValue } : p
      );
      return updatedFilters;
    });
    setFiltersChanged(true);
  }
  useEffect(() => {
    if (!filtersChanged) {
      return;
    }

    setLoadingProducts(true);
    const activeFilters = filtersValues.filter(
      (filter) => filter.value !== "all"
    );

    const filteredProducts = originalProducts.filter((product) => {
      return activeFilters.every((filter) => {
        const filterValue = filter.value;
        const productValue = product.properties[filter.name];
        return filterValue === "all" || productValue === filterValue;
      });
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
      if (sort === "price-asc") {
        return a.price - b.price;
      } else if (sort === "price-desc") {
        return b.price - a.price;
      } else if (sort === "_id-desc") {
        return b._id.localeCompare(a._id);
      } else if (sort === "_id-asc") {
        return a._id.localeCompare(b._id);
      }
    });

    setTimeout(() => {
      setProducts(sortedProducts);
      setLoadingProducts(false);
    }, 100); // Oneskorzenie 1 sekunda
  }, [filtersValues, originalProducts, sort, filtersChanged]);

  return (
    <>
      <Header></Header>
      <Center>
        <CategoryHeader>
          <h1>{category.name}</h1>
          <FiltersWrapper>
            {category.properties.map((prop) => (
              <Filter key={prop.name}>
                <span>{prop.name}:</span>
                <select
                  onChange={(ev) =>
                    handleFilterChange(prop.name, ev.target.value)
                  }
                  value={filtersValues.find((f) => f.name === prop.name).value}
                  name={prop.name}
                  id={prop.name}
                >
                  <option value="all">All</option>
                  {prop.values.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </Filter>
            ))}

            <Filter>
              <span>Sort:</span>
              <select
                value={sort}
                onChange={(ev) => {
                  setSort(ev.target.value);
                  setFiltersChanged(true);
                }}
              >
                <option value="_id-asc">oldest first</option>
                <option value="_id-desc">newest first</option>
                <option value="price-asc">price, lowest first</option>
                <option value="price-desc">price, hightest first</option>
              </select>
            </Filter>
          </FiltersWrapper>
        </CategoryHeader>
        {loadingProducts && <Spinner fullWidth="true"></Spinner>}
        {!loadingProducts && (
          <div>
            {products.length > 0 && (
              <ProductsGrid
                wishedProducts={wishedProducts.map((i) => i.product.toString())}
                products={products}
              />
            )}

            {products.length === 0 && <div>Sorry, no products found.</div>}
          </div>
        )}
      </Center>
    </>
  );
}



 export async function getServerSideProps(ctx) {
   const session = await getServerSession(ctx.req, ctx.res, authOptions);
   const category = await Category.findById(ctx.query.id);
   const subCategories = await Category.find({ parent: category._id });
   const catIds = [category._id, ...subCategories.map((c) => c._id)];
   const products = await Product.find({ category: catIds });

   const allFetchedProductsId = products.map((p) => p._id.toString());

   const wishedProducts = session?.user
     ? await WishedProduct.find({
         userEmail: session.user.email,
         product: allFetchedProductsId,
       })
     : [];

   return {
     props: {
       category: JSON.parse(JSON.stringify(category)),
       subCategories: JSON.parse(JSON.stringify(subCategories)),
       products: JSON.parse(JSON.stringify(products)),
       wishedProducts: JSON.parse(JSON.stringify(wishedProducts)),
     },
   };
 }