import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';


const Container=styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-between;
`;


const Message=styled.h3`
color:red;
`;

const Wrraper=styled.div`
display:flex;
// flex-direction:column;
align-items:center;
justify-content:space-between;
`;
const Button=styled.button``;


const Forbidden = () => {
    return (
        <Container>
            <h1>403</h1>
            <Message>You are not Authorised to access this page</Message>
            <Wrraper>
                <Link to={"/"}><Button>Back to Home-Page</Button></Link>
                <Link to={"/login"}><Button>Login</Button></Link>
            </Wrraper>
        </Container>
    )
}

export default Forbidden
