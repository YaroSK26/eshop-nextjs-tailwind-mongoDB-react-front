import styled from 'styled-components'
import Header from '../components/Header'
import Center from '../components/Center'
import { mongooseConnect } from '../lib/mongoose';
import {Product} from '../models/Product'
import ProductsGrid from '../components/ProductsGrid';

const Title = styled.h1`
    font-size: 1.5em;
`

export default function ProductPage({products}){
    return (
      <div>
        <Header></Header>
        <Center>
          <Title>Product Page</Title>
          <ProductsGrid products={products}></ProductsGrid>
        </Center>
      </div>
    );
}

export async function getServerSideProps(){
   await  mongooseConnect()
    const products = await  Product.find({},null ,{sort:{_id:-1}})
    return { props: {
        products: JSON.parse(JSON.stringify(products))
    } }
}