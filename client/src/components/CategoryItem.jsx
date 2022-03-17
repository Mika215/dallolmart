import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  // &:hover {
  //   transform: scale(1.1);
  //   z-index: 2;
  //   transition: all 0.5s ease-in-out;
  // }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  text-transform: uppercase;
`;
const Button = styled.button`
  padding: 10px;
  text-transform: uppercase;
  background-color: white;
  color: gray;
  border: none;
  cursor: pointer;
  font-weight: 800;
`;

const CategoryItem = ({item}) => {
  return (
    <Container key={item.id}>
      <Link to={`/products/${item.category}`}>
        <Image src={item.img} />
        <InfoContainer>
          <Title>{item.title}</Title>
          <Button>Shop Now</Button>
        </InfoContainer>
      </Link>
    </Container>
  );
};

export default CategoryItem;
