import styled from "styled-components";
import {Send} from "@material-ui/icons";
const Container = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //   padding: 10px;
  background-color: #fcf5f5;
`;

const Title = styled.h1`
  font-size: 40px;
  margin: 20px;
  text-transform:capitalize;
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom:20px ;
`;
const InputContainer = styled.div`
width:30%;
height:40px;
background-color:white;
display:flex;
justify-content: space-between;
border:1px solid lightgray;
`;
const Input = styled.input`
flex:8;
border:none;
padding-left:20px;

`;
const Button = styled.button`
flex:1;
  background-color: red;
  color: white;
  border: none;
  cursor:pointer;
`;

const NewsLetter = () => {
  return (
    <Container>
      <Title>Subscribe to our Newsletter</Title>
      <Description>Get regular updates about our services!</Description>
      <InputContainer>
        <Input />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsLetter;
