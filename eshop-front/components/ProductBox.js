/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Link from "next/link";
import FlyingButton from "../components/FlyingButton";
import HeartOutlineIcon from "../icons/HeartOutlineIcon"; 
import HeartSolidIcon from "../icons/HeartSolidIcon";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { withSwal } from "react-sweetalert2";
import { useRouter } from "next/router";


const ProductWrapper = styled.div`
  button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
 
`;


const WhiteBox = styled(Link)`
  background-color: white;
  padding: 20px;
  height: 150px;
  text-align: center;
  display: Flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 1rem;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  gap: 10px;

  @media screen and (min-width: 768px) {
    display: flex;
    margin-top: 2px;

  
  }
`;
const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  font-weight: bold;
  text-align: right;
`;


const WishlistButton = styled.button`
  border: 0;
  width: 50px !important;
  height: 40px;
  padding: 10px;
  top: 0;
  right: 0;
  background-color: transparent ;
  position: absolute;
  cursor: pointer;
  svg {
    width: 26px;
    
  }
  ${(props) => (props.wished ? `color: red` : `color : black;`)}


`;





const ProductBox = ({ _id, title, description, price, images,wished=false,onRemoveFromWishlist=() => {}, swal }) => {

   const { data: session } = useSession();

  const url = "/product/" + _id;
  const [isWished, setIsWished] = useState(wished);
  const router = useRouter();
  function addToWishlist (ev){
     ev.preventDefault();
       const nextValue = !isWished;
       if (nextValue == false && onRemoveFromWishlist) { 
          onRemoveFromWishlist(_id)
       }
       axios.post("/api/wishlist" , {
        product: _id
       }).then(()=> {})
         setIsWished(nextValue);
     
  }
    function wishlistHeart(ev) {
       ev.preventDefault();
      swal.fire({
        title: "To add products to the wishlist, log in to your account",
        confirmButtonText: "Okey",
        confirmButtonColor: "#5542f6k",
      });
    }
      const search = router.asPath.includes("/search");

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          {session &&  !search &&(
            <WishlistButton wished={isWished} onClick={addToWishlist}>
              {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
            </WishlistButton>
          )}

          {!session && (
            <WishlistButton onClick={wishlistHeart}>
              <HeartOutlineIcon />
            </WishlistButton>
          )}

         

          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}> {title} </Title>
        <PriceRow>
          <Price>{price}€</Price>
          <FlyingButton _id={_id} src={images?.[0]}>
            Add to cart
          </FlyingButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default withSwal(ProductBox);
