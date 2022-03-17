import {React, useState} from "react";
import styled from "styled-components";
import {Facebook, GitHub, Instagram} from "@material-ui/icons";
import {Link,  useHistory} from "react-router-dom";
import {login} from "../redux/serverConnect"; //!this is the login function from serverConnect
import {useDispatch, useSelector} from "react-redux";

const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 550px;
  height: 650px;
  margin: 3% 30%;
`;

const MainWrraper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10% 0%; //!why it is not proportional
  box-sizing: border-box;
`;

const TopWrraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  cursor:pointer;
`;
const Logo = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  border: 2.8px solid lightgray;
`;
const TextWrraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;
const Paragraph = styled.p`
  font-size: 10px;
  letter-spacing: 3.5px;
  margin: 0;
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const Form = styled.form`
  background-color: white;
  display: flex;
  flex-direction: column;
  //   padding: 0px 10px;
  height: 100px;
  width: 70%;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  background: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 86%;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 7px;
  margin-top: 25px; //!check this and remove
  background: black;
  color: white;
  font-weight: 600;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  };
  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
`;

const SocialContainer = styled.div`
  margin: 5px 0;
`;

const SocialLink = styled.a`
  color: #333;
  text-decoration: none;
  margin: 15px 0;
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  transition: transform 80ms ease-in;

  &:hover {
    color: white;
    background-color: #${(props) => props.color};
    transition: all 0.4s ease-in-out;
  }

  &:active {
    transform: scale(0.9);
  }
`;
const OptionalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const OptionalLine = styled.li`
  color: red;
  margin-top: 30px;
  border-bottom: 1.8px solid red;
  width: 80px;
  list-style: none;
`;
const OptionlParagraph = styled.p`
  font-size: 12px;
  font-weight: 200;
  letter-spacing: 1.5px;
  margin: 0px 10px;
  margin-top: 30px;
`;

const BottomWrraper = styled.ul`
  display: flex;
  text-decoration: none;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
`;
const BottomLinks = styled.li`
  list-style: none;
  cursor: pointer;
  margin-top: 10px;
  margin-right: ${(props) => props.name === "forgotp" && "100px"};
  margin-left: ${(props) => props.name === "signup" && "1px"};
`;
const Error = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const {isFetching, error} = useSelector((state) => state.user);
  // const user = useSelector((state) => state.user);
  
  
  const handleLogin = async (e) => {
    e.preventDefault();
    login(dispatch, {username, password});
    const response = await login.dispatch;
    console.log(response);
    // const userLogedIn= await user.currentUser!==null & user.isFetching===false;
if(isFetching===false && !error)
{
  history.go(-1);
}    
  };

  return (
    <Container>
      <MainWrraper>
        <TopWrraper  onClick={() => {
              history.push("/");
            }}>
          <Logo
            src={
              "https://firebasestorage.googleapis.com/v0/b/dallolmart-react.appspot.com/o/1647445330892dallol.jpg?alt=media&token=8d01b478-5d41-4e09-be8e-f4e067362c43"
            }
          />
          <TextWrraper>
            <Title>DallolMart</Title>
            <Paragraph>HOTEST & DEEPEST</Paragraph>
          </TextWrraper>
        </TopWrraper>
        <Form>
          <Input
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="username or email"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="password"
          />
          <Button onClick={handleLogin} disabled={isFetching}>
            Login
          </Button>
          {error && (
            <Error>
              Something went wrong! Please enter your credentials correctly! Or check your connection
            </Error>
          )}
        </Form>
        <OptionalWrapper>
          <OptionalLine></OptionalLine>
          <OptionlParagraph>Or Login with </OptionlParagraph>
          <OptionalLine></OptionalLine>
        </OptionalWrapper>
        <SocialContainer>
          <SocialLink color="3f51b5">
            <Facebook />
          </SocialLink>
          <SocialLink color="42a5f5">
            <GitHub />
          </SocialLink>
          <SocialLink color="4a148c">
            <Instagram />
          </SocialLink>
        </SocialContainer>
        <BottomWrraper>
          <Link
            to={"/forgotpassword"}
            style={{textDecorationLine: "none", color: "#2196f3"}}
          >
            <BottomLinks name="forgotp">Forgot Password ?</BottomLinks>
          </Link>
          <Link
            to={"/register"}
            style={{
              textDecorationLine: "none",
              color: "#ef5350",
              fontWeight: "bold",
            }}
          >
            <BottomLinks name="signup">Create Account</BottomLinks>
          </Link>
        </BottomWrraper>
      </MainWrraper>
    </Container>
  );
};

export default Login;
