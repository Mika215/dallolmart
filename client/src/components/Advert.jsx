import styled from "styled-components";

const Container=styled.div`
height:20px;
background-color: red;
color:white;
align-items:center;
justify-content:center;
font-size:14px;
font-weight:bolder;

`;

//!try to wrapp the text so that users can be redirected into a different route where they can get info
//regarding the PREMIUM membership and free shipping
const Advert = () => {
    return (
       
 <Container>
<p>Explore our PREMIUM membership benefits. ... Free shipping & Return!</p>
 </Container>
    )
}

export default Advert
