import Header from "../components/Header";
import Center from "../components/Center";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import ProductBox from "../components/ProductBox";
import styled from "styled-components";
import Link from "next/link";
import { RevealWrapper } from "../node_modules/next-reveal";
import { getServerSession } from "next-auth";
import { WishedProduct } from "../models/WishedProduct";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { mongooseConnect } from "../lib/mongoose";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.div`
  display: flex;
  align-items: center;

  gap: 15px;
  a {
    color: #555;
  }
  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }
`;
const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 190px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #555;
  text-decoration: none;
`;
const categoriesPage = ({
  mainCategories,
  categoriesProducts,
  wishedProducts=[],
}) => {
  return (
    <>
      <Header />
      <Center>
        {mainCategories.map((category) => (
          <CategoryWrapper key={category._id}>
            <CategoryTitle>
              <h2>{category.name}</h2>
              <div>
                <Link href={`/category/${category._id}`}>Show all</Link>
              </div>
            </CategoryTitle>
            <CategoryGrid>
              {categoriesProducts[category._id].map((p, index) => (
                <RevealWrapper
                  delay={index * 50}
                  key={`${category._id}-${p._id}`}
                >
                  <ProductBox {...p} wished={wishedProducts.includes(p._id)} />
                </RevealWrapper>
              ))}
              <RevealWrapper
                delay={categoriesProducts[category._id].length * 50}
              >
                <ShowAllSquare href={`/category/${category._id}`}>
                  Show all &rarr;
                </ShowAllSquare>
              </RevealWrapper>
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Center>
    </>
  );
};

export default categoriesPage;

export async function getServerSideProps(ctx) {
  await mongooseConnect()
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProducts = {};
    const allFetchedProductsId = [];
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c._id);
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 }});
    allFetchedProductsId.push(...products.map(p => p._id.toString()));
    categoriesProducts[mainCat._id] = products;
  }


    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    const wishedProducts = session?.user
      ? await WishedProduct.find({
          userEmail: session.user.email,
          product: allFetchedProductsId,
        })
      : [];

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      wishedProducts: wishedProducts.map(i => i.product.toString()),
    },
  };
}
