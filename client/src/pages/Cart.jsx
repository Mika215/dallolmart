import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {Add, Remove} from "@material-ui/icons";
import styled from "styled-components";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import {useSelector} from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import Login from "./Login";
const axios = require("axios");

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 400;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"}; //!i like this cool
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTextContainer = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  text-transform: capitalize;
  margin: 0px 10px;
  cursor: pointer;
  &:hover {
    color: orange;
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 280px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: justify;
`;

const ProductName = styled.span`
  //   padding-bottom: 20px;
`;
const ProductId = styled.span`
  //   padding-bottom: 20px;
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span`
  //   padding-bottom: 20px;
`;

const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justifay-content: item;
`;
const ProductQuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 24px;
`;

const ProductQuantity = styled.span`
  font-size: 20px;
  margin: 5px;
`;

const ProductPrice = styled.span`
  font-size: 25px;
  font-weight: 400;
`;

const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: #eee;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  margin-top: 28px;
  height: 50vh;
  // display:flex;
  // flex-direction:column;
  // align-items:center;
  // justify-content:space-between;
`;
const SummaryTitle = styled.h3`
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`;
const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0px;
  justify-content: space-between;
`;
const SummaryItemText = styled.p`
  font-size: ${(props) => (props.type === "total" ? "22px" : "18px")};
  font-weight: ${(props) => props.type === "total" && 800};
`;
const SummaryItemPrice = styled.span`
  font-size: ${(props) => (props.type === "total" ? "22px" : "20px")};
  text-decoration: ${(props) => props.type === "total" && "underline"};
  font-weight: ${(props) => props.type === "total" && 800};
`;
const Button = styled.button`
  padding: 10px;
  width: 100%;

  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  background-color: black;
  color: white;
  border: none;
  font-size: 15px;
`;

const defaultProduct = {
  id: "888902",
  name: "Nick Shoe",
  color: "blue",
  size: "43",
  price: "24",
};
const Cart = () => {
  const history = useHistory();
  const initialPrice = defaultProduct.price;
  const [totalPrice, setTotalPrice] = useState(initialPrice);
  const [quantity, setQuantity] = useState(1);
  // const [isLogedIn, setIsLogedIn] = useState(false);
  const [stripeToken, setStripeToken] = useState(null);

  const user = useSelector((state) => state.user.currentUser);

  const STRIPE_PUB_KEY =
    "pk_test_51KM9NICwmXA1Le58gvk9arhAEtbD8OMJwMZwfHLwVoG9wBrtqx7cG6aR3qJxGUlatujpTElH43BGtTxfqZVI9IHt00d6w2KTHD";

  const onToken = (token) => {
    setStripeToken(token);
  };

  const cart = useSelector((state) => state.cart);
  //!tempo data
  let estShiping = 15;
  let shipDiscount = 5;

  // const hasToken = localStorage.getItem("accessToken");
  const checkUserAuth = () => {
    // if (hasToken) {
    //   setIsLogedIn(true);
    if (!user) {
      history.push("/login");
    }
    return;
  };
  // if (isLogedIn) {
  //   //!this woll be printed out if the user is logedin it prevents from printing out the default value which is False.
  //   console.log("User is logedin:" + isLogedIn);
  // }

  const add = () => {
    setQuantity(quantity + 1);
    let tempo = initialPrice * quantity;
    // tempo+=totalPrice;
    console.log(tempo);
    setTotalPrice(tempo);
  };

  const minus = () => {
    if (quantity === 0) {
      setQuantity(0);
      setTotalPrice(0);
    } else if (quantity === 1) {
      setTotalPrice(initialPrice);
    } else {
      setQuantity(quantity - 1);
      let tempo = initialPrice * quantity;
      setTotalPrice(tempo);
    }
  };

  useEffect(() => {
    let userData=user;
    // console.log(userData)
    
    const makePaymentRequest = async () => {
      try {
        const res = await axios.post("http://localhost:5000/checkout/payment", {
          tokenId: stripeToken.id,
          totalAmount:(cart.totalAmount + (estShiping - shipDiscount)) * 100,
          user:userData,
        });

        history.push("/success", {data: res.data});
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && cart.totalAmount >= 1 && makePaymentRequest();
  }, [stripeToken, cart.totalAmount, history]);

  return (
    <Container>
      <NavBar />
      <Advert />
      {user ? (
        <>
          <Wrapper>
            <Title>Your Shoping Cart</Title>
            <Top>
              <TopButton>Continue Shoping</TopButton>
              <TopTextContainer>
                <TopText>Your Shoping Bag {cart.products.length}</TopText>
                <TopText>Your Wish list(8)</TopText>
              </TopTextContainer>
              <TopButton
                onClick={() => {
                  // history.push("/pay");
                  console.log(
                    "are you sure you want to clear your shoping cart?"
                  );
                }}
                type="filled"
              >
                Clear Cart
              </TopButton>
            </Top>
            <Bottom>
              <Info>
                {cart.products.map((product) => (
                  <>
                    <Product>
                      <ProductDetails>
                        <Image src={product.image} />
                        <Details>
                          <ProductName>
                            <b>Product: </b>
                            {product.title}
                          </ProductName>
                          <ProductId>
                            <b>Id: </b>
                            {product._id}
                          </ProductId>
                          {/* //!for each product it will have it's own assigned collor in the DB;using the props we can dinamically change the colors */}
                          <ProductColor color={product.color}></ProductColor>
                          <ProductSize>
                            <b>Size: </b>
                            {product.size}
                          </ProductSize>
                        </Details>
                        <PriceDetails>
                          <ProductQuantityContainer>
                            <Remove onClick={minus} />
                            <ProductQuantity>
                              {product.quantity}
                            </ProductQuantity>
                            <Add onClick={add} />
                          </ProductQuantityContainer>
                          <ProductPrice>
                            € {product.price * product.quantity}
                          </ProductPrice>
                        </PriceDetails>
                      </ProductDetails>
                    </Product>
                    <Hr />
                  </>
                ))}
              </Info>

              {cart.totalAmount ? (
                <Summary>
                  <SummaryTitle>Order Summary</SummaryTitle>
                  <SummaryItem>
                    <SummaryItemText>Subtotal</SummaryItemText>
                    <SummaryItemPrice>€ {cart.totalAmount}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Estimated Shiping</SummaryItemText>
                    <SummaryItemPrice>
                      €{cart.totalAmount && estShiping}
                    </SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>Shiping Discount</SummaryItemText>
                    <SummaryItemPrice>
                      € {cart.totalAmount && -shipDiscount}
                    </SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText type="total">Total</SummaryItemText>
                    <SummaryItemPrice type="total">
                      €{" "}
                      {cart.totalAmount &&
                        cart.totalAmount + (estShiping - shipDiscount)}
                    </SummaryItemPrice>
                  </SummaryItem>

                  <StripeCheckout
                    name="DallolMart"
                    image="https://i.pinimg.com/280x280_RS/f0/c7/30/f0c730d4740bcf7ba03fcfa84bfdabbf.jpg"
                    description={`Your total amount is €${
                      cart.totalAmount + (estShiping - shipDiscount)
                    }`} //!the amount should be rearanged dynamically ={order.amount}?
                    billingAddress
                    shippingAddress
                    amount={
                      (cart.totalAmount + (estShiping - shipDiscount)) * 100
                    }
                    token={onToken}
                    stripeKey={STRIPE_PUB_KEY}
                  >
                    <Button
                      onClick={checkUserAuth}
                      // {isLogedIn && (()=>history.push("/pay"))}
                    >
                      Checkout Now
                    </Button>
                  </StripeCheckout>
                </Summary>
              ) : (
                <span style={{color:"red",margin:"2% 40%"}}>Ooops ! Your shoping Cart is Empty!</span>
                
              )}
            </Bottom>
          </Wrapper>
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </Container>
  );
};

export default Cart;
