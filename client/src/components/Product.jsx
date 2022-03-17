import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
  import { Link } from "react-router-dom";
  import styled from "styled-components";
  
  const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.7s ease;
    z-index: 3;
    cursor: pointer;
  `;
  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover ${Info} {
      opacity: 1; //!this hover effect on the container affects the  icons
    }
  `;
  const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;
  const Image = styled.img`
    height: 75%;
    z-index: 2;
  `;
  
  const IconContainer = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
  
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
      transition: all 0.5s ease;
    }
  `;
  
  const Product = ({item}) => {
    return (
      <Container key={item.id}>
        <Circle />
        <Image src={item.image} />
        <Info>
          <IconContainer>
            <ShoppingCartOutlined />
          </IconContainer>
  
          <IconContainer>
            <Link to={`/product/${item._id}`}>
              <SearchOutlined />
            </Link>
          </IconContainer>
  
          <IconContainer>
            <FavoriteBorderOutlined />
          </IconContainer>
        </Info>
      </Container>
    );
  };
  
  export default Product;
  