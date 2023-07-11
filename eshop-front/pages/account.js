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

const AccountPage = ({ swal }) => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [loaded, setLoaded] = useState(false);

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
      confirmButtonText: "Okey",
      confirmButtonColor: "#5542f6k",
    });
  }

  useEffect(() => {
    axios.get("/api/address").then((res) => {
      setName(res.data.name);
      setEmail(res.data.email);
      setCity(res.data.city);
      setPostalCode(res.data.postalCode);
      setStreetAddress(res.data.streetAddress);
      setCountry(res.data.country);
      setLoaded(true);
    });
  }, [loaded]);

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <h2>Wishlist</h2>
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
                      <p>Login to be able to change your information</p>
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
                  <PrimaryButton onClick={() => login()}>Login</PrimaryButton>
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
