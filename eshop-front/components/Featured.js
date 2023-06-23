import Center from "./Center";
import styled from "styled-components";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0 ;
`

const Title = styled.h1`
    margin: 0;
    font-weight: normal;

`

const Desc = styled.p `
    color: #aaa;
    font-size: 0.8rem;
`

const Wrapper = styled.div `
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 40px;
    img {
        max-width: 100%;
            }
`

export default function Featured() {
    return (
        <Bg>
            <Center>
                <Wrapper>
                    <div> 
                        <Title>Pro anywhere</Title>
                        <Desc>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium soluta praesentium mollitia minima, voluptate illum id harum facere adipisci cumque ipsam neque in nam eius debitis rerum pariatur obcaecati? Animi.</Desc>
                </div>
                    <div>
                            <img src="https://dawid-next-ecommerce.s3.amazonaws.com/1679151719649.png" alt="" />
                    </div>
                </Wrapper>
                
            </Center>
           
        </Bg>
    )
}