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
import Input from "../components/Input";
import { RevealWrapper } from "../node_modules/next-reveal";
import CrossIcon from "../icons/CrossIcon";
import { primary } from "../lib/colors";
import { useSession } from "next-auth/react";
import Spinner from "../components/Spinner";
import Link from "next/link";
import { withSwal } from "react-sweetalert2";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  gap: 40px;
  margin-top: 40px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2) {
    text-align: right;
  }

  table tr.subtotal td {
    padding: 15px 0;
  }

  table tbody tr.subtotal td:nth-child(2) {
    font-size: 1.2rem;
  }

  .total {
    font-weight: bold;
  }

  
   @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 40px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-between;
`;

const StyledButtonCross = styled.button`
  border: 0;
  background-color: ${primary};
  border-radius: 5px;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    color: white;
    display: block;
    padding: 5px 0px;
  }
`;

const CartHeaderFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SpinnerWrapper = styled.div`
  position: relative;
`;

const SpinnerOverlay = styled.div`
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;
 function CartPage({swal}) {
  const { cartProducts, addProduct, removeProduct, clearCart, clearCartWithX } =
    useContext(CartContext);
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [shippingFee, setShippingFee] = useState(null); 


  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }

    if (
      typeof window !== "undefined" &&
      window.location.href.includes("success")
    ) {
      setIsSuccess(true);
      clearCart();
    }
    axios.get("/api/settings?name=shippingFee").then(res => {
     
        setShippingFee(res.data.value);
    })
  }, [cartProducts, clearCart, shippingFee]);
  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get("/api/address").then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
      setLoaded(true);
    });
  }, [session]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
     if (
       name === "" ||
       email === "" ||
       city === "" ||
       postalCode === "" ||
       streetAddress === "" ||
       country === ""
     ) {
       swal.fire({
         title: "Please fill in all required fields",
         icon: "error",
       });
       return;
     }
    if (response.data.url) {
      window.location = response.data.url;
      if (window.location.href.includes("success")) {
        setIsSuccess(true);
        clearCart();
      }
    }
  }

  function  goToAlertPayment(){
    swal.fire({
      title: "This is a test store. No real payments are accepted",
      text: "but the payment system works, don't worry :)",
      icon: "error",
    });
  }

 
  let productsTotal = cartProducts.reduce((sum, productId) => {
    const price = products.find((p) => p._id === productId)?.price || 0;
    return sum + price;
  }, 0);

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <RevealWrapper delay={0}>
            <Box>
              <CartHeaderFlex>
                <h2>Cart</h2>
                {cartProducts?.length > 0 && (
                  <StyledButtonCross onClick={() => clearCartWithX()}>
                    <CrossIcon />
                  </StyledButtonCross>
                )}
              </CartHeaderFlex>

              {!cartProducts?.length && (
                <div>
                  Your cart is empty. <Link href="/">Go shopping</Link>
                </div>
              )}
              {products?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={product.images[0]} alt="" />
                          </ProductImageBox>
                          {product.title}
                        </ProductInfoCell>
                        <td>
                          <PrimaryButton
                            padding={"11"}
                            onClick={() => lessOfThisProduct(product._id)}
                          >
                            -
                          </PrimaryButton>
                          <QuantityLabel>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </QuantityLabel>
                          <PrimaryButton
                            padding={"10"}
                            onClick={() => moreOfThisProduct(product._id)}
                          >
                            +
                          </PrimaryButton>
                        </td>
                        <td>
                          {cartProducts.filter((id) => id === product._id)
                            .length * product.price}
                          €
                        </td>
                      </tr>
                    ))}
                    <tr className="subtotal">
                      <td colSpan={2}>Products</td>

                      <td>{productsTotal}€</td>
                    </tr>
                    <tr className="subtotal">
                      <td colSpan={2}>Shipping</td>
                      <td>{shippingFee}€</td>
                    </tr>
                    <tr className=" subtotal total">
                      <td colSpan={2}>Total</td>
                      <td>{productsTotal + parseInt( shippingFee || 0)}€</td>
                    </tr>
                     
                  </tbody>
                </Table>
              )}
            </Box>
          </RevealWrapper>

          <RevealWrapper>
            <Box>
              <h2>Order information</h2>
              {!cartProducts?.length && (
                <div>Add something to cart to see your order information</div>
              )}
              {!loaded && cartProducts?.length > 0 && session && (
                <SpinnerWrapper>
                  <SpinnerOverlay>
                    <Spinner />
                  </SpinnerOverlay>
                </SpinnerWrapper>
              )}
              {!!cartProducts?.length && (
                <>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    name="name"
                    onChange={(ev) => setName(ev.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                  <CityHolder>
                    <Input
                      type="text"
                      placeholder="City"
                      value={city}
                      name="city"
                      onChange={(ev) => setCity(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      name="postalCode"
                      onChange={(ev) => setPostalCode(ev.target.value)}
                    />
                  </CityHolder>
                  <Input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Country"
                    value={country}
                    name="country"
                    onChange={(ev) => setCountry(ev.target.value)}
                  />
                  <PrimaryButton
                    primary="true"
                    block="true"
                     onClick={goToPayment}
                   // onClick={goToAlertPayment}
                  >
                    Continue to payment
                  </PrimaryButton>
                </>
              )}
            </Box>
          </RevealWrapper>
        </ColumnsWrapper>
      </Center>
    </>
  );
}



export default withSwal(CartPage);