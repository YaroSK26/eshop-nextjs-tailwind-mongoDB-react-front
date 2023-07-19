/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import { ButtonStyle } from "./PrimaryButton";
import CartIcon from "../icons/CartIcon";
import { useContext, useEffect, useRef } from "react";
import { CartContext } from "./CartContext";

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle};
   
  }

  @keyframes fly {
    100% {
      top: 0;
      left: 65%;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }

  @media (max-width: 768px) {
    @keyframes fly {
      100% {
        top: 0;
        opacity: 0;
        display: none;
        max-width: 50px;
        max-height: 50px;
        left: 90%;
      }
    }
  }

  img {
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    display: none;
    animation: fly 1s;
    z-index: 5;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  const imgRef = useRef();

  function sendImageToCart(ev) {
    if (imgRef.current) {
      imgRef.current.style.display = "inline-block";
      imgRef.current.style.left = ev.clientX - 50 + "px";
      imgRef.current.style.top = ev.clientY - 50 + "px";

      setTimeout(() => {
        if (imgRef.current) {
          imgRef.current.style.display = "none";
        }
      }, 1000);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imgRef.current?.closest("div[data-sr-id]");
      if (reveal?.style.opacity === "1") {
        reveal.style.transform = "none";
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <FlyingButtonWrapper onClick={() => addProduct(props._id)}>
        <img style={{ display: "none" }} src={props.src} alt="" ref={imgRef} />
        <button onClick={(ev) => sendImageToCart(ev)} {...props}>
          <Flex>
            <CartIcon margin> </CartIcon> Add to cart
          </Flex>
        </button>
      </FlyingButtonWrapper>
    </>
  );
}
