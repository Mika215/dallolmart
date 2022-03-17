import {Add, Remove} from "@material-ui/icons";
import {useState, useEffect} from "react";
import {useLocation, useHistory} from "react-router-dom";
import styled from "styled-components";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import NewsLetter from "../components/NewsLetter";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../redux/cartRedux";
const axios = require("axios");

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  text-align: justify; //! check this out
`;
const Title = styled.h1`
  font-weight: 300;
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-size: 1.7rem;
  font-weight: 600;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 30px 0px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 300;
`;

const FilterColor = styled.div`
  width: ${(props) =>
    props.color === "White" || props.color === "white" ? "18px" : "20px"};
  height: ${(props) =>
    props.color === "White" || props.color === "white" ? "18px" : "20px"};
  border-radius: 50%;
  margin: 0px 5px;
  cursor: pointer;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.color === "White" || props.color === "white"
      ? "0.5px solid gray"
      : "none"};
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
  font-size: 0.9rem;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Quantity = styled.span`
  width: 30px;
  height: 30px;
  font-size: 1.3rem;
  border-radius: 8px;
  border: 2px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  padding: 12px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  &:hover {
    background-color: #fffde7;
    transform: scale(1.1);
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch(); //this hook tells our app that the action we are implementing is of redux there for the effect should be dispatched all over the app which are related to the specific action
  const history = useHistory();
  const user = useSelector((state) => state.user.currentUser);
  const incQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decQuantity = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handlCart = () => {
    if (user) {
      if (color === "" || size === "") {
        alert("Please select Color and Size of the product!");
      } else {
        dispatch(addProduct({...product, quantity, color, size}));
      }
    } else {
      history.push("/login");
    }
    // {
    //   user
    //     ? (color=== dispatch(addProduct({...product, quantity, color, size})))
    //     : history.push("/login");
    // }
  };

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/products/find/${id}`
        );
        // console.log(res.data);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getSingleProduct();
  }, [id]);

  return (
    <Container>
      <NavBar />
      <Advert />
      <Wrapper>
        <ImageContainer>
          <Image src={product.image} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>

              {product.color?.map(
                (
                  c //!checking if the array does exist with ternery operator was life saving
                ) => (
                  <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                )
              )}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map(
                  (
                    s //!same here the map throws error if you don't use the ternary operator. thanks to stackOverFlow ...uufffff!
                  ) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  )
                )}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <QuantityContainer>
              <Remove onClick={decQuantity} style={{cursor: "pointer"}} />
              <Quantity>{quantity}</Quantity>
              <Add onClick={incQuantity} style={{cursor: "pointer"}} />
            </QuantityContainer>
            <Button onClick={() => handlCart()}>Add to Cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Product;
