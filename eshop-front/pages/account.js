/* eslint-disable react/jsx-key */
import Header from "../components/Header";
import Center from "../components/Center";
import Title from "../components/Title";
import { signOut, useSession, signIn } from "next-auth/react";
import PrimaryButton from "../components/PrimaryButton";
import styled from "styled-components";
import WhiteBox from "../components/Box";
import { RevealWrapper } from "next-reveal";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { withSwal } from "react-sweetalert2";
import ProductBox from "../components/ProductBox";
import Tabs from "../components/Tabs";
import SingleOrder from "../components/SingleOrder";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 25px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

const BorderWishlist = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
`

const AccountPage = ({ swal }) => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [WishlistLoaded, setWishlistLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Orders");
  const [orders , setOrders] = useState([])
  const [orderLoaded, setOrderLoaded] = useState(true)

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function login() {
    await signIn("google");
  }

  function saveAddress() {
    const data = { name, email, city, streetAddress, country, postalCode };
    axios.put("/api/address", data);
  }

  function saveCompleted() {
    swal.fire({
      title: "Your account informations has been saved",
      icon : "success",
    });
  }
  useEffect(() => {
    if (!session) {
      return;
    }
    setOrderLoaded(false);
    setLoaded(false);
    axios.get("/api/address").then((res) => {
      setName(res.data.name);
      setEmail(res.data.email);
      setCity(res.data.city);
      setPostalCode(res.data.postalCode);
      setStreetAddress(res.data.streetAddress);
      setCountry(res.data.country);
      setLoaded(true);
    });

        axios.get("api/orders").then((response) => {
          setOrders(response.data);
          setOrderLoaded(true);
        });
  }, [session ,setOrderLoaded, setOrders]);

  useEffect(() => {
    if (!session) {
      return;
    }
    
    setWishlistLoaded(false);
    axios.get("/api/wishlist").then((response) => {
      setWishedProducts(response.data.map((wp) => wp.product));
      setWishlistLoaded(true);
    });


  }, [session]);
  function productRemovedFromWishlist(_id) {
    setWishedProducts((products) => {
      return [...products.filter((p) => p._id.toString() !== _id)];
    });
  }

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <Tabs
                  
                  tabs={["Orders", "Wishlist"]}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === "Orders" && (
                  <div>
                    {!orderLoaded && <Spinner fullWidth={true}></Spinner>}
                    {orderLoaded && (
                      <div>
                        {!orders.length > 0 && !session && (
                          <div>
                            <p>Login to see your orders </p>
                          </div>
                        )}

                        {!orders.length > 0 && session && (
                          <div>
                            <p>You dont have any orders yet </p>
                          </div>
                        )}
                        {orders.length > 0 &&
                          orders.map((o) => <SingleOrder {...o}></SingleOrder>)}
                      </div>
                    )}
                  </div>
                )}


                
                {activeTab === "Wishlist" && (
                  <div>
                    {!WishlistLoaded && <Spinner fullWidth={true}></Spinner>}
                    {!session && WishlistLoaded && (
                      <div>
                        <p>Login to add products to wishlist</p>
                      </div>
                    )}
                    {WishlistLoaded && session && (
                      <WishedProductsGrid>
                        {wishedProducts.length > 0 ? (
                          wishedProducts.map((wp) => (
                            <BorderWishlist>
                              <ProductBox
                                key={wp._id}
                                wished={true}
                                {...wp}
                                onRemoveFromWishlist={
                                  productRemovedFromWishlist
                                }
                              />
                            </BorderWishlist>
                          ))
                        ) : (
                          <p>Your wishlist is empty </p>
                        )}
                      </WishedProductsGrid>
                    )}
                  </div>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>Account details</h2>
                {!loaded && <Spinner fullWidth={true}></Spinner>}

                {loaded && !session && (
                  <div>
                    <p>Login to change your information</p>
                  </div>
                )}

                {loaded && session && (
                  <>
                    <Input
                      type="text"
                      placeholder="Name"
                      value={name}
                      name="name"
                      onChange={(ev) => setName(ev.target.value)}
                    />
                    <Input
                      type="text"
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
                      onClick={() => {
                        saveAddress();
                        saveCompleted();
                      }}
                    >
                      Save
                    </PrimaryButton>

                    <hr />
                  </>
                )}
                {session && (
                  <PrimaryButton onClick={() => logout()}>Logout</PrimaryButton>
                )}
                {!session && (
                  <PrimaryButton onClick={() => login()}>
                    Login with Google
                  </PrimaryButton>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
};

export default withSwal(AccountPage);
