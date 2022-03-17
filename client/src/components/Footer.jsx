import styled from "styled-components";
import {
  Instagram,
  YouTube,
  Facebook,
  Twitter,
  Pinterest,
  Phone,
  Room,
  MailOutline,
} from "@material-ui/icons";

const Container = styled.div`
  display: Flex;
  text-align: justify;
  // justify-content: space-between;
  padding: 20px;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h2`
  //   color: black;
  //   font-weight: 800;
  // //   padding-bottom: 10%;
  text-align: justify;
  cursor: pointer; //!on click it should route to the top home page
`;
const Description = styled.p`
  //   text-align: justify;
  //   font-size: 1.1rem;
  margin: 20px 0px;
  width: 85%;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    color: white;
    background-color: #${(props) => props.color};
    transform: scale(1.1);
    transition: all 0.4s ease-in-out;
  }

  &:active {
    transform: scale(0.95);
    //  transition: transform 80ms ease-out;
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0; //!ul has margin & padding by default so we need to remove that
  list-style: none;
  display: flex; //!this property & wrap alon with the width in the listItem enables us to break into different colomuns
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%; //
  margin-bottom: 8px;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    color: red;
    font-weight: 500;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 100%;
`;

const Footer = () => {
  return (
    <div>
      <Container>
        <Left>
          <Logo>DallolMart.</Logo>
          <Description>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores, facere! Dignissimos sequi tenetur enim laudantium omnis
            illum perspiciatis velit quibusdam ipsam eum? Nemo, numquam labore?
          </Description>
          <SocialContainer>
            <SocialIcon title="Like our page" color="3f51b5">
              <Facebook />
            </SocialIcon>
            <SocialIcon title="Watch" color="d50000">
              <YouTube />
            </SocialIcon>
            <SocialIcon title="Follow us" color="4a148c">
              <Instagram />
            </SocialIcon>
            <SocialIcon title="Follow us" color="42a5f5">
              <Twitter />
            </SocialIcon>
            <SocialIcon title="Follow us" color="ef5350">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          {/* //!please add  links to each list in the footer so that users can get redirected on click*/}
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Decor</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>Jewllery</ListItem>
            <ListItem>Handmade</ListItem>

            <ListItem>Men Fashion</ListItem>
            <ListItem>Women Fashion</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Phone style={{marginRight: "10px"}} />
            +3246500909
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight: "10px"}} />
            michaeltesfayg@gmail.com
          </ContactItem>
          <ContactItem>
            <Room style={{marginRight: "10px"}} />
            Rue Francois,Liege,Belgium
          </ContactItem>
          <Payment
            src={"https://store-cdn.arduino.cc/uni/wysiwyg/Payment_Options.jpg"}
          />
        </Right>
      </Container>
    </div>
  );
};

export default Footer;
