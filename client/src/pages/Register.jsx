import {React, useState,useEffect} from "react";
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
const axios = require("axios");

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
  cursor: pointer;
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

  height: 100px;
  width: 70%;
  justify-content: center;
  align-items: center;
  margin-botom: 40px;
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
  }
`;

const BottomWrraper = styled.ul`
  display: flex;
  text-decoration: none;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  // background-color:red;//!check the overlaping margin with the button and remove it
`;
const BottomLinks = styled.li`
  list-style: none;
  cursor: pointer;
  margin-left: ${(props) => props.name === "login" && "-25px"};
`;
// const Error = styled.span`
//   color: red;
//   font-size: 14px;
//   margin-top: 5px;
// `;

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const history = useHistory();


  // useEffect(()=>{

    // const handleRegistartion = async (e) => {
    //   e.preventDefault();
  
    //   if (password !== confirmedPassword) {
    //     alert("Password confirmation failed!\nPlease enter matching passwords !");
    //     return;
    //   } else {
    //     const newUser = {
    //       username: username,
    //       password: confirmedPassword,
    //       firstName: firstName,
    //       lastName: lastName,
    //       email: email,
    //     };
    //     const res = await axios.post(
    //       "http://localhost:5000/users/register",
    //       newUser
    //     );
    //     console.log(res.data.firstName + res.data.lastName);
  
    //     if (res.status === 200) {
    //       history.push("/register/activationemailsent");
    //     }
  
    //     console.log(newUser.firstName + " " + newUser.lastName);
    //   }
    //   setUsername("");
    //   setPassword("");
    //   setConfirmedPassword("");
    //   setFirstName("");
    //   setLastName("");
    //   setEmail("");
    // };
  

    
  // },[])

  return (
    <Container>
      <MainWrraper>
        <TopWrraper
          onClick={() => {
            history.push("/");
          }}
        >
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
        <Form 
        
        // onSubmit={handleRegistartion}
        
        >
          <Input
            required
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            placeholder="First Name "
          />
          <Input
            required
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            placeholder="Last Name"
          />
          <Input
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="username"
          />
          <Input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="email@example.com"
          />
          <Input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="password"
          />
          <Input
            required
            type="password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            name="confirmedPassword"
            placeholder="confirm password"
          />
          <Button>Register</Button>
        </Form>

        <BottomWrraper>
          <Link
            to={"/login"}
            style={{
              textDecorationLine: "none",
              color: "#2196f3",
              fontWeight: "bold",
            }}
          >
            <BottomLinks name="login">Login instead?</BottomLinks>
          </Link>
        </BottomWrraper>
      </MainWrraper>
    </Container>
  );
};

export default Register;
