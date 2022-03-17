import {React} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {format} from "timeago.js";
const Right = styled.div`
  flex: 3;
  display: flex;
  align-items: start;
  justify-content: space-between;
  border: 1px solid #dad8d8;
  // background: #fcfcfc;
  background: #${(props) => (props.name === true ? "fcfcfc" : "ffffff")};
  width: 50%;
  height: 630px; //!check this thing it afects responsiveness
  margin-right: 20px;
`;

const RightPersonal = styled.div`
  width: 45%;
  margin-left: 30px;
  //   background:gray;
  margin-top: 30px;
`;

const DisplayForm = styled.div`
  margin-bottom: 10px; //!check this and customise again
  diplay: flex;
  flex-direction: column;
`;
const Wrraper = styled.div`
  background: #fcfcfc;
  margin-left: 50px;
`;

const SectionTitle = styled.h3`
  font-size: 13px;
  color: #607d8b;
  opacity: 0.5;
  margin: ${(props) =>
    props.name === "personal"
      ? "60px 140px 60px -70px"
      : "60px 170px 60px -70px"};
`;

const Item = styled.div`
  width: 90%;
  height: 30px;
  padding: 4px 5px;
  border: none;
  font-size: 17px;
  list-style: none;
  text-decoration: none;
  display: inline-flex;
`;

const RightDelivery = styled.div`
  width: 45%;
  margin-top: 30px;
`;

const DisplayDiv = () => {
  const user = useSelector((state) => state.user.currentUser);
  // console.log(user);
  return (
    <>
      {user && (
        <Right>
          <RightPersonal>
            <SectionTitle name="personal">Personal Details</SectionTitle>
            <Wrraper>
              <DisplayForm>
                {user.firstName ? (
                  <Item>{user.firstName}</Item>
                ) : (
                  <Item style={{opacity: "0.5"}}>First Name</Item>
                )}

                {user.lastName ? (
                  <Item>{user.lastName}</Item>
                ) : (
                  <Item style={{opacity: "0.5"}}>Last Name</Item>
                )}

                {user.username ? (
                  <Item>{user.username}</Item>
                ) : (
                  <Item style={{opacity: "0.5"}}>User Name</Item>
                )}

                {user.email ? (
                  <Item>{user.email}</Item>
                ) : (
                  <Item style={{opacity: "0.5"}}>Email</Item>
                )}

                {user.phone ? (
                  <Item>{user.phone}</Item>
                ) : (
                  <Item style={{opacity: "0.5"}}>Phone</Item>
                )}

                {user.dateOfBirth ? (
                  <Item>{user.dateOfBirth.toString().substring(0, 10)}</Item>
                ) : (
                  <Item style={{opacity: "0.5"}}>Date of Birth : YY-MM-DD</Item>
                )}

                {user.gender ? (
                  <Item>{user.gender}</Item>
                ) : (
                  <Item style={{opacity: "0.5"}}>Gender</Item>
                )}

                <Item>Joined: {format(user.createdAt)}</Item>
              </DisplayForm>
            </Wrraper>
          </RightPersonal>
          <RightDelivery>
            <SectionTitle name="delivery">Delivery Detailes</SectionTitle>
            <Wrraper>
              <DisplayForm>
                {user.company ? (
                  <Item>{user.company}</Item>
                ) : (
                  <Item style={{opacity: "0.5"}}>Compnay</Item>
                )}
                {user.street ? (
                  <Item>{user.street}</Item>
                ) : (
                  <Item style={{opacity: "0.5"}}>Street Address</Item>
                )}

                {user.postalCode ? (
                  <Item>{user.postalCode}</Item>
                ) : (
                  <Item style={{opacity: "0.5"}}>Postal Code</Item>
                )}
                {user.city ? (
                  <Item>{user.city}</Item>
                ) : (
                  <Item style={{opacity: "0.5"}}>City</Item>
                )}
                {user.postalService ? (
                  <Item>{user.postalService}</Item>
                ) : (
                  <Item style={{opacity: "0.5"}}>
                    Postal Service Preference
                  </Item>
                )}
                {user.country ? (
                  <Item>{user.country}</Item>
                ) : (
                  <Item style={{opacity: "0.5"}}>Country</Item>
                )}
              </DisplayForm>
            </Wrraper>
          </RightDelivery>
        </Right>
      )}
    </>
  );
};

export default DisplayDiv;
