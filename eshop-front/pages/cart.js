/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import styled from "styled-components";
import Header from "../components/Header";
import Center from "../components/Center";
import PrimaryButton from "../components/PrimaryButton";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import axios from "axios";
import Table from "../components/Table";
import ButtonLink from "../components/ButtonLink";
import Input from "../components/Input";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin: 40px;
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.div`
  padding: 10px 0 ;

`

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantityLabel= styled.span`
  padding: 0 10px;
`
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`

const cartPage = () => {
  const { cartProducts,addProduct, removeProduct} = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAdress, setStreetAdress] = useState("");
  const [country, setCountry] = useState("");
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post("/api/cart", { ids: cartProducts })
        .then((response) => setProducts(response.data));
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  let total = 0
  for (const productId of cartProducts) {
      const price = products.find(p=> p._id === productId)?.price || 0 
      total += price
  }
  return (
    <>
      <Header></Header>
      <Center>
        <ColumnsWrapper>
          <Box>
            <h1>Cart</h1>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images} alt="" />
                        </ProductImageBox>
                        <td>{product.title}</td>
                      </ProductInfoCell>

                      <td>
                        <ButtonLink
                          onClick={() => lessOfThisProduct(product._id)}
                          primary
                          outline
                          href={""}
                        >
                          -
                        </ButtonLink>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>

                        <ButtonLink
                          onClick={() => moreOfThisProduct(product._id)}
                          primary
                          outline
                          href={""}
                        >
                          +
                        </ButtonLink>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td></td>
                    <td></td>
                    <td> ${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h1>Order Information</h1>
              <form method="POST" action="/api/checkout">
              <Input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
               onChange={(ev) => setEmail(ev.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal code"
                  name="postalCode"
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Street Adress"
                name="streetAdress"
                value={streetAdress}
                onChange={(ev) => setStreetAdress(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Country"
                name="country"
                value={country}
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <PrimaryButton type="submit" size={"l"} block primary>
                Continue to payment
              </PrimaryButton>
              </form>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
};

export default cartPage;
