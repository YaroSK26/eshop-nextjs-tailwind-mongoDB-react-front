import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "../../models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { categories, sort, ...filters } = req.query;
  const [sortFields, sortOrder] = sort.split("-");
  const productsQuery = {};

  if (categories) {
    productsQuery.category = categories.split(",");
  }

  Object.keys(filters).forEach((filterName) => {
    if (filters[filterName] !== "all") {
      productsQuery[`properties.${filterName}`] = filters[filterName];
    }
  });

  const sortQuery = { [sortFields]: sortOrder === "asc" ? 1 : -1 };

  const products = await Product.find({
    ...productsQuery,
    ...sortQuery,
  });

  res.json(products);
}
