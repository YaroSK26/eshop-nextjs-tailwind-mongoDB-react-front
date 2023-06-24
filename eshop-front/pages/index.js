import Featured from "../components/Featured";
import Header from "../components/Header";
import { mongooseConnect } from "../lib/mongoose";
import {Product} from "../models/Product";

export default function HomePage({ featuredProduct }) {
  return (
    <div>
      <Header></Header>
      <Featured product={featuredProduct}></Featured>
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "648f4137afb88f149d29541d";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
    },
  };
}
