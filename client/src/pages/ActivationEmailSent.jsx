import {React} from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Button = styled.button`
  //   background-color: green;
  background-color: coral;
  color: white;
  font-weight: 900;
  font-size: 16px;
  padding: 15px;
`;

const ActivationEmailSent = () => {
  const history = useHistory();

  const goBackHome = () => {
    history.push("/");
  };

  return (
    <Container>
      <h3 style={{color: "greenyellow"}}>
        Account Activation Link has been sent to your email
      </h3>
      <Button onClick={() => goBackHome()}>Back to Home Page</Button>
    </Container>
  );
};

export default ActivationEmailSent;
