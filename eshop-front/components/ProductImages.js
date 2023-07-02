/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */

import { useState } from "react";
import styled from "styled-components";

/* eslint-disable @next/next/no-img-element */



    const Image = styled.img`
      max-width: 100%;
      max-height: 100%;
    `;
    const ImageButtons = styled.div`
      display: flex;
      gap: 10px;
      flex-grow: 0;
      margin-top: 10px;
    `;
    const BigImage = styled.img`
        width:300px;
        height:200px;
    `
    const ImageButton = styled.div`
      border: 1px solid #aaa;
      ${(props) => (props.active ? `
      border-color:#ccc;`
       : `border-color:transparent; `)}
      height: 60px;
      padding: 5px;
      cursor: pointer;
      border-radius: 5px;
    `;

    const BigImageWrapper = styled.div`
        text-align: center;
    `

    
export default  function ProductImages({images}){

    const [activeImage, setActiveImage] = useState(images?.[0]);

    return (
      <>
      <BigImageWrapper>
        <BigImage   src={activeImage}/>
      </BigImageWrapper>
        <ImageButtons>
            {images.map(image => (
                <ImageButton key={image} active={image===activeImage} onClick={()=> setActiveImage(image)}>
                    <Image src={image}  />
                </ImageButton>
            ))}
        </ImageButtons>
      </>
    );
}