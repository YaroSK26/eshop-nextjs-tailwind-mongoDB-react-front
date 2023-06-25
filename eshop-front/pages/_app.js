import { createGlobalStyle } from "styled-components"

const GlobalStyles =  createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
  body{
    padding:0;
    margin:0;
    font-family: "Poppins" , sans-serif;
    background-color:#eee;
  }
`

function MyApp({ Component, pageProps }) {
  return( 
    <>
    <GlobalStyles/>
  <Component {...pageProps}/>
  
  </>
  )
}

export default MyApp
