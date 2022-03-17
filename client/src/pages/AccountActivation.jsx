import {React} from "react";
import styled from "styled-components";
import {useLocation, useHistory} from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Button = styled.button`
  background-color: #2e7d32;
  color: white;
  font-weight: 900;
  font-size: 18px;
  padding: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AccountActivation = () => {
  const location = useLocation();
  const history = useHistory();
  const activationToken = location.pathname.split("/")[3];

  const activationRequest = axios.create({
    baseURL: `http://localhost:5000`,
    headers: {token: `Bearer ${activationToken}`},
  });

  const handleAccActivation = async () => {
    const res = await activationRequest.post("/users/activation");
    console.log(res.data);
    if (res.status === 200) {
      console.log("Account activation Successful!\nWelcome to Dallol Mart!");
      history.push("/login");
      console.log(activationToken);
    }
  };
  return (
    <Container>
      <Button onClick={handleAccActivation}>Confirm Activation</Button>
    </Container>
  );
};

export default AccountActivation;
