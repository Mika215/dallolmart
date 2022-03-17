import {React, useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {authRequest} from "../requestMethods";
import {format} from "timeago.js";



import {CameraAlt} from "@material-ui/icons";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import DisplayDiv from "./userProfile/Display";
import Login from "./Login";

const Container = styled.div`
  // background: white;
  // border: 1px solid red;
  // margin: 0;
  // max-width: 1480px;
  // height: 750px;
  // padding-right: 20px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
const TopWrraper = styled.div`
  padding-right: 100%;
  width: 95%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h1`
  font-size: 25px;
  color: black;
  font-weight: 400;
  letter-spacing: 0.1rem;
`;
const Button = styled.button`
  width: 80px;
  border: none;
  padding: 6px;
  background-color: black;
  color: white;
  font-weight: 600;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: -3.5%;
`;

const BottomWrraper = styled.div`
  display: flex;
`;
const Left = styled.div`
  flex: 1;
  background: white;
  width: 100%;
  height: 50%; //!check this thing it afects responsiveness
  display: flex;
  flex-direction: column;
  align-items: center;
  justiy-content: space-between;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 290px;
  height: 360px;
  border: 1px solid #dad8d8;
  background: #fcfcfc;
  position: relative;
  padding-top: 30px;
  margin-bottom: 25px;
`;

const Cancel = styled.span`
  position: absolute;
  right: 5%;
  top: 4%;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const UserDisplayImg = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 190px;
  height: 190px;
  border: none;
  border-radius: 50%;
  object-fit: cover;
  background: white;
  marign-top: 5px
  background-color: #9fa8da;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const UserDisplayAvatar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 170px;
  height: 170px;
  border: none;
  border-radius: 50%;
  object-fit: cover;
  background-color: #9fa8da;
  color: white;
  font-size: 40px;
  font-weight: 600;
  letter-spacing: 0.4rem;
`;

const UploadBtn = styled.div`
  display: flex;
  padding: 10px 14px;
  margin: 20px;
  border: 1px solid #dad8d8;
  border-radius: 5px;
  background: #fcfcfc;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  cursor: pointer;
`;
const PasswordSection = styled.div`
  width: 80%;
`;
const PasswordForm = styled.form`
  width: 92%;
`;

const Right = styled.div`
  flex: 3;
  // display: flex;
  // align-items: start;
  // justify-content: space-between;
  // border: 1px solid #dad8d8;
  // background: #fcfcfc;
  width: 50%;
  height: 630px; //!check this thing it afects responsiveness
  margin-right: 20px;
`;

const Form = styled.form`
  margin-bottom: 10px; //!check this and customise again
  display: flex;
  align-items: start;
  justify-content: space-between;
  border: 1px solid #dad8d8;
  background: #fcfcfc;
  width: 100%;
  height: 630px; //!check this thing it afects responsiveness
  margin-right: 20px;
`;

const RightPersonal = styled.div`
  width: 45%;
`;

const SectionTitle = styled.h3`
  font-size: 13px;
  color: #607d8b;
  opacity: 0.5;
  margin: ${(props) =>
    props.name === "right" ? "60px 0px 60px -90px" : "15px 0px 15px 50px "};
`;

const InputWrraper = styled.div`
  margin: 12px 0;
`;

const Input = styled.input`
  width: 90%;
  height: 30px;
  background: white;
  padding: 4px 5px;
  border: 1px solid #dad8d8;
  border-radius: 5px;
  font-size: 17px;
  // pointer-events: ${(props) => (props.name === true ? "all" : "none")};
`;

const CreatedAt = styled.div`
  width: 90%;
  height: 30px;
  padding: 4px 5px;
  border: none;
  font-size: 17px;
  list-style: none;
  text-decoration: none;
  display: inline-flex;
  opacity: 0.5;
`;

const GenderWrraper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-left: 15px;
  font-weight: bold;
  color: black;
`;

const Label = styled.label`
  margin-left: 10px;
  font-size: 17px;
  color: rgb(151, 150, 150);
`;

const RightDelivery = styled.div`
  width: 45%;
  margin-right: 15px;
`;

const MyProfile = () => {
  const user = useSelector((state) => state.user.currentUser);


  const [onEdit, setOnEdit] = useState(false);
  const [onPasswordEdit, setOnPasswordEdit] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [company, setCompany] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalService, setPostalService] = useState("");


//TODO:fetching an updated version of the user every time there is an updated

  //profile editing
  const handleEdit = (e) => {
    setOnEdit(true);
  };

  const saveEdit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        firstName: !firstName ? user.firstName && user.firstName : firstName,
        lastName: !lastName ? user.lastName && user.lastName : lastName,
        username: !username ? user.username && user.username : username,
        email: !email ? user.email && user.email : email,
        phone: !phone ? user.phone && user.phone : phone,
        dateOfBirth: !dateOfBirth
          ? user.dateOfBirth && user.dateOfBirth
          : dateOfBirth,
        gender: !gender ? user.gender && user.gender : gender,
        company: !company ? user.company && user.company : company,
        street: !street ? user.street && user.street : street,
        postalCode: !postalCode
          ? user.postalCode && user.postalCode
          : postalCode,
        city: !city ? user.city && user.city : city,
        country: !country ? user.country && user.country : country,
        postalService: !postalService
          ? user.postalService && user.postalService
          : postalService,
      };

      const res = await authRequest.put(`users/${user._id}`, userData);
      console.log(res.data);

      setOnEdit(false);
    } catch (err) {
      console.log(err);
    }
  };
  //  {user&& console.log(user._id);}
  //password handling
  const handlePasswordEdit = (e) => {
    setOnPasswordEdit(!onPasswordEdit);
    console.log(onPasswordEdit);
  };
  const saveNewPassword = (e) => {
    // e.preventDefault()
    if (!oldPassword || !newPassword || !confirmedPassword) {
      alert("Please fill all required fildes!");
    } else if (newPassword !== confirmedPassword) {
      alert(
        "password doesn't match\nPlease enter your new email and confirm correctly "
      );
    }
    console.log("password saved");
    setOnPasswordEdit(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmedPassword("");
  };
  return (
    <>
      {user ? (
        <Container>
          <NavBar />
          <TopWrraper>
            <Title style={{marginLeft: "40px", color: "white"}}>
              {user.username}
            </Title>
            {!onEdit && <Button onClick={handleEdit}>Edit Profile</Button>}
            {onEdit && (
              <Button
                // onClick={saveEdit}
                style={{display: "none"}}
                // style={{width: "8%", backgroundColor: "blue"}}
              >
                {/* <label htmlFor="temposubmit">Save Changes Tempo</label>  */}
                Save
              </Button>
            )}
          </TopWrraper>
          <BottomWrraper>
            <Left>
              <Card>
                <Cancel>X</Cancel>

                {user.image ? (
                  <UserDisplayImg src={user.image} />
                ) : (
                  <UserDisplayAvatar>
                    {`${user.lastName}`
                      ? `${user.firstName}`[0].toUpperCase() +
                        `${user.lastName}`[0].toUpperCase()
                      : `${user.firstName}`[0].toUpperCase()}
                  </UserDisplayAvatar>
                )}

                {/* <Image src={user.image} /> */}
                <Title>{user.username}</Title>
                <UploadBtn>
                  <p style={{display: "flex"}}>
                    Upload
                    <input
                      type="file"
                      style={{
                        width: "130px",
                        opacity: "0",
                        cursor: "pointer",
                      }}
                    />
                    <CameraAlt />
                  </p>
                </UploadBtn>
              </Card>
              <PasswordSection>
                <SectionTitle name="left" style={{margin: "5px 0px"}}>
                  Mange Password
                </SectionTitle>
                <PasswordForm>
                  {onPasswordEdit && (
                    <Form action="">
                      <InputWrraper>
                        <Input
                          type="password"
                          value={oldPassword}
                          onChange={(e) => {
                            setOldPassword(e.target.value);
                          }}
                          placeholder="Old Password"
                          required
                          style={{
                            width: "100%",
                            fontSize: "14px",
                            padding: "2px 9px",
                          }}
                        />
                      </InputWrraper>
                      <InputWrraper>
                        <Input
                          type="password"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                          placeholder="New Password"
                          required
                          style={{
                            width: "100%",
                            fontSize: "14px",
                            padding: "2px 9px",
                          }}
                        />
                      </InputWrraper>
                      <InputWrraper>
                        <Input
                          type="password"
                          value={confirmedPassword}
                          onChange={(e) => {
                            setConfirmedPassword(e.target.value);
                          }}
                          placeholder="Confirm New Password"
                          required
                          style={{
                            width: "100%",
                            fontSize: "14px",
                            padding: "2px 9px",
                          }}
                        />
                      </InputWrraper>

                      {onPasswordEdit && (
                        <Button
                          onClick={saveNewPassword}
                          style={{
                            width: "100%",
                            backgroundColor: "blue",
                            marginTop: "10px",
                          }}
                        >
                          Save Changes
                        </Button>
                      )}
                    </Form>
                  )}
                  {!onPasswordEdit && (
                    <Button
                      onClick={handlePasswordEdit}
                      style={{width: "100%", marginTop: "10px"}}
                    >
                      Change Password
                    </Button>
                  )}
                </PasswordForm>
              </PasswordSection>
            </Left>
            {onEdit ? (
              <Right>
                <Form onSubmit={saveEdit}>
                  <RightPersonal style={{marginLeft: "15px"}}>
                    <SectionTitle name="right">Personal Details</SectionTitle>
                    {/* <Form onSubmit={saveEdit}> */}
                    <InputWrraper>
                      <Input
                        type="text"
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        placeholder={
                          user.firstName ? user.firstName : "First Name"
                        }
                      />
                    </InputWrraper>
                    <InputWrraper>
                      <Input
                        type="text"
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        placeholder={
                          user.lastName ? user.lastName : "Last Name"
                        }
                      />
                    </InputWrraper>
                    <InputWrraper>
                      <Input
                        type="text"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        placeholder={user.username ? user.username : "Username"}
                      />
                    </InputWrraper>
                    <InputWrraper>
                      <Input
                        type="text"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        placeholder={
                          user.email ? user.email : "email@example.com"
                        }
                      />
                    </InputWrraper>
                    <InputWrraper>
                      <Input
                        type="number"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        placeholder={user.phone ? user.phone : "Phone Number"}
                      />
                    </InputWrraper>
                    <InputWrraper>
                      <Input
                        type="text"
                        value={dateOfBirth}
                        onChange={(e) => {
                          setDateOfBirth(e.target.value);
                        }}
                        placeholder={
                          user.dateOfBirth
                            ? user.dateOfBirth
                            : "Date of Birth: YY-MM-DD"
                        }
                      />
                    </InputWrraper>

                    <InputWrraper>
                      <GenderWrraper>
                        <Label style={{marginRight: "0px"}}>Man</Label>
                        <Input
                          type="radio"
                          value="man"
                          checked={onEdit && gender === "man"}
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                          style={{
                            width: "15px",
                            marginLeft: "8px",
                            marginRight: "20px",
                          }}
                        />
                        <Label style={{marginRight: "5px"}}>Woman</Label>
                        <Input
                          type="radio"
                          value="woman"
                          checked={onEdit && gender === "woman"}
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                          style={{width: "15px", marginLeft: "0px"}}
                        />
                        <Label style={{marginLeft: "25px"}}>Other</Label>
                        <Input
                          type="radio"
                          value="other"
                          checked={onEdit && gender === "other"}
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                          style={{width: "15px", margin: "8px"}}
                        />
                      </GenderWrraper>
                    </InputWrraper>
                    <InputWrraper>
                      <CreatedAt>
                        Joined: {format(user.createdAt)}
                        {/* {user.createdAt.toString().substring(0, 10)} */}
                      </CreatedAt>
                    </InputWrraper>
                    {/* </Form> */}
                  </RightPersonal>
                  <RightDelivery>
                    <SectionTitle name="right">Delivery Detailes</SectionTitle>
                    {/* <Form action="">  */}
                    {/* //! Please embrace both sections inside one form under the right block */}
                    <InputWrraper>
                      <Input
                        type="text"
                        value={company}
                        onChange={(e) => {
                          setCompany(e.target.value);
                        }}
                        placeholder={user.company ? user.company : "Company"}
                      />
                    </InputWrraper>
                    <InputWrraper>
                      <Input
                        type="text"
                        value={street}
                        onChange={(e) => {
                          setStreet(e.target.value);
                        }}
                        placeholder={
                          user.street ? user.street : "Street Address"
                        }
                      />
                    </InputWrraper>
                    <InputWrraper>
                      <Input
                        type="number"
                        value={postalCode}
                        onChange={(e) => {
                          setPostalCode(e.target.value);
                        }}
                        placeholder={
                          user.postalCode ? user.postalCode : "Postal Code"
                        }
                      />
                    </InputWrraper>
                    <InputWrraper>
                      <Input
                        type="text"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                        placeholder={user.city ? user.city : "City"}
                      />
                    </InputWrraper>
                    <InputWrraper>
                      <Input
                        type="text"
                        value={postalService}
                        onChange={(e) => {
                          setPostalService(e.target.value);
                        }}
                        placeholder={
                          user.postalService
                            ? user.postalService
                            : "Postal Service Preference"
                        }
                      />
                    </InputWrraper>
                    <InputWrraper>
                      <Input
                        type="text"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                        placeholder={user.country ? user.country : "Country"}
                      />
                    </InputWrraper>
                    <Button
                      // name="temposubmit"
                      type="submit"
                      style={{
                        width: "28%",
                        backgroundColor: "blue",
                        marginTop: "35px",
                      }}
                    >
                      Save Changes
                    </Button>
                    {/* </Form> */}
                  </RightDelivery>
                </Form>
              </Right>
            ) : (
              <DisplayDiv />
            )}
          </BottomWrraper>
        </Container>
      ) : (
        <Login />
      )}
    </>
  );
};

export default MyProfile;
