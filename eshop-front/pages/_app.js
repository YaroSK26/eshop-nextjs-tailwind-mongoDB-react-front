import { createGlobalStyle } from "styled-components";
import {CartContextProvider} from "../components/CartContext";
import { SessionProvider } from "next-auth/react";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
  body{
    padding:0;
    margin:0;
    font-family: "Poppins" , sans-serif;
    background-color:#eee;
  }

  hr{
    display:block;
    border:0;
    border-top : 1px solid #ccc;
  }
`;

function MyApp({ Component, pageProps : {session , ...pageProps} }) {
  return (
    <>
      <SessionProvider>
      
        <GlobalStyles />
        <CartContextProvider session={session}>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
