/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components"
import Center from "../components/Center"
import Header from "../components/Header"
import Input from "../components/Input"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import ProductsGrid from "../components/ProductsGrid"
import { debounce } from "lodash"
import Spinner from "../components/Spinner"

const SearchedInput = styled(Input)`
    padding: 5px 10px;
    border-radius: 0;
    margin: 30px 0 30px 0;
    font-size: 1.4rem;
`

const SearchPage = () => {
    const [phrase, setPhrase] = useState("")
    const [products, setProducts] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const debouncedSearch = useCallback( debounce(searchProducts, 500), []);

    useEffect( () => {
        if (phrase.length > 0){
            setIsLoading(true);
            debouncedSearch(phrase)
        } else {
            setProducts([])
        }
    }, [phrase]);


    function searchProducts(phrase){
          axios
            .get("/api/products?phrase=" + encodeURIComponent(phrase))
            .then((res) => {
              setProducts(res.data);
              setIsLoading(false);
            });
    }
    
  return (
    <>
      <Header></Header>
      <Center>
        <SearchedInput
          value={phrase}
          onChange={(ev) => setPhrase(ev.target.value)}
          autoFocus
          placeholder="Search for products..."
        />
        {!isLoading && phrase !== "" && products.length === 0 && (
          <h2>No products found for query: {phrase} </h2>
        )}
        {isLoading && <Spinner fullWidth={true}></Spinner>}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products}></ProductsGrid>
        )}
      </Center>
    </>
  );
}

export default SearchPage
