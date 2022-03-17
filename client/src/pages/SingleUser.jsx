import {React, useEffect, useState} from "react";
import styled from "styled-components";
import {useLocation} from "react-router-dom";
import {authRequest} from "../requestMethods";
import {CameraAlt} from "@material-ui/icons";
import {format} from "timeago.js";
import {useDispatch} from "react-redux";
import {updateUser} from "../redux/serverConnect";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from ".././firebase";

const Container = styled.div`
  // padding: 20px;
  margin-left: 12%;

  width: 1320px;
  height: 91vh;
  overflow: hidden;
`;
const TitleWrraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 18px 0px 10px 20px;
  width: 97.8%;
`;
const Title = styled.h2`
  margin-left: 50px;
  color: white; //!this is intentionally left to be hidden with white color just for balncing the design
`;
const UserName = styled.h3``;
const Button = styled.button`
  width: 80px;
  border: none;
  padding: 6px;
  background-color: ${(props) => (props.name === true ? "#00c853" : "#1565c0")};
  // #00c853;
  color: white;
  font-weight: 600;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  // margin-left:30px;
`;
const BottomWrraper = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justiy-content: space-between;
  margin-right: -50px;
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

const Form = styled.form`
  margin-bottom: 10px;
  display: flex;
  align-items: start;
  justify-content: space-between;
  // border: 1px solid #dad8d8;//!removing the border for the form helped to fit into the container
  background: #fcfcfc;
  width: 100%;
  height: 630px;
  margin-right: 20px;
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

const Label = styled.label`
  margin-left: 10px;
  font-size: 17px;
  color: rgb(151, 150, 150);
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

const Right = styled.div`
  flex: 2;
  display: flex;
  align-items: start;
  justify-content: space-between;
  border: 1px solid #dad8d8;
  // background: #fcfcfc;
  background: #${(props) => (props.name === "true" ? "fcfcfc" : "ffffff")};
  width: 50%;
  height: 630px; //!check this thing it afects responsiveness
  margin-right: 10px;
  margin-left: 0;
  padding-left: 10px;
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

const RightPersonal = styled.div`
  width: 60%;
  margin-top: 30px;
`;
const RightDelivery = styled.div`
  width: 55%;
  margin-top: 30px;
  // margin-right:-50px;
`;

const SingleUser = () => {
  const location = useLocation();
  const targetId = location.pathname.split("/")[3];
  const [targetUser, setTargetUser] = useState();
  const [onEdit, setOnEdit] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [company, setCompany] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalService, setPostalService] = useState("");
  const [progressBar, setProgressBar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTargetUser = async () => {
      const res = await authRequest.get(`users/find/${targetId}`);
      setTargetUser(res.data);
      // console.log(res.data);
    };

    fetchTargetUser();
  }, [targetId]);

  const saveEdit = async (e) => {
    e.preventDefault();

    try {
      const imageName = new Date().getTime() + image.name;
      const storage = getStorage(app);

      const storageRef = ref(storage, imageName);

      const uploadTask = uploadBytesResumable(storageRef, image);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgressBar(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);

            const userData = {
              firstName: !firstName
                ? targetUser.firstName && targetUser.firstName
                : firstName,
              lastName: !lastName
                ? targetUser.lastName && targetUser.lastName
                : lastName,
              username: !username
                ? targetUser.username && targetUser.username
                : username,
              email: !email ? targetUser.email && targetUser.email : email,
              image: !image
                ? targetUser.image && targetUser.image
                : downloadURL,
              phone: !phone ? targetUser.phone && targetUser.phone : phone,
              dateOfBirth: !dateOfBirth
                ? targetUser.dateOfBirth && targetUser.dateOfBirth
                : dateOfBirth,
              gender: !gender ? targetUser.gender && targetUser.gender : gender,
              company: !company
                ? targetUser.company && targetUser.company
                : company,
              street: !street ? targetUser.street && targetUser.street : street,
              postalCode: !postalCode
                ? targetUser.postalCode && targetUser.postalCode
                : postalCode,
              city: !city ? targetUser.city && targetUser.city : city,
              country: !country
                ? targetUser.country && targetUser.country
                : country,
              postalService: !postalService
                ? targetUser.postalService && targetUser.postalService
                : postalService,
            };

            updateUser(targetId, userData, dispatch);
            setOnEdit(false);
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    setOnEdit(true);
  };

  return (
    <Container>
      <TitleWrraper>
        <Title>Edit User</Title>
        {!onEdit && (
          <Button name={onEdit.toString()} onClick={handleClick}>
            Edit
          </Button>
        )}
      </TitleWrraper>
      <BottomWrraper>
        {targetUser &&
          (onEdit ? (
            <>
              <Left>
                <Card>
                  <Cancel>X</Cancel>

                  {targetUser.image ? (
                    <UserDisplayImg src={targetUser.image} />
                  ) : (
                    <UserDisplayAvatar>
                      {`${targetUser.lastName}`
                        ? `${targetUser.firstName}`[0].toUpperCase() +
                          `${targetUser.lastName}`[0].toUpperCase()
                        : `${targetUser.firstName}`[0].toUpperCase()}
                    </UserDisplayAvatar>
                  )}
                  <UserName>{targetUser.username}</UserName>
                  <UploadBtn>
                    <p style={{display: "flex"}}>
                      Upload
                      <input
                        style={{
                          width: "130px",
                          opacity: "0",
                        }}
                        id="image"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        placeholder="upload Image"
                        name="image"
                      />
                      <CameraAlt />
                    </p>
                  </UploadBtn>
                </Card>
                {progressBar && (
                  <span style={{color: "red"}}>
                    Image upload {progressBar}% Completed
                  </span>
                )}
              </Left>
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
                          targetUser.firstName
                            ? targetUser.firstName
                            : "First Name"
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
                          targetUser.lastName
                            ? targetUser.lastName
                            : "Last Name"
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
                        placeholder={
                          targetUser.username ? targetUser.username : "Username"
                        }
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
                          targetUser.email
                            ? targetUser.email
                            : "email@example.com"
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
                        placeholder={
                          targetUser.phone ? targetUser.phone : "Phone Number"
                        }
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
                          targetUser.dateOfBirth
                            ? targetUser.dateOfBirth
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
                        Joined: {format(targetUser.createdAt)}
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
                        placeholder={
                          targetUser.company ? targetUser.company : "Company"
                        }
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
                          targetUser.street
                            ? targetUser.street
                            : "Street Address"
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
                          targetUser.postalCode
                            ? targetUser.postalCode
                            : "Postal Code"
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
                        placeholder={targetUser.city ? targetUser.city : "City"}
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
                          targetUser.postalService
                            ? targetUser.postalService
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
                        placeholder={
                          targetUser.country ? targetUser.country : "Country"
                        }
                      />
                    </InputWrraper>
                    <Button
                      // name="temposubmit"
                      type="submit"
                      style={{
                        width: "28%",
                        backgroundColor: "#1565c0",
                        marginTop: "35px",
                      }}
                    >
                      Save Changes
                    </Button>
                    {/* </Form> */}
                  </RightDelivery>
                </Form>
              </Right>
            </>
          ) : (
            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            <>
              <Left>
                <Card>
                  <Cancel>X</Cancel>

                  {targetUser.image ? (
                    <UserDisplayImg src={targetUser.image} />
                  ) : (
                    <UserDisplayAvatar>
                      {`${targetUser.lastName}`
                        ? `${targetUser.firstName}`[0].toUpperCase() +
                          `${targetUser.lastName}`[0].toUpperCase()
                        : `${targetUser.firstName}`[0].toUpperCase()}
                    </UserDisplayAvatar>
                  )}
                  <UserName>{targetUser.username}</UserName>
                  <UploadBtn
                    style={{color: "white", cursor: "grab", border: "none"}}
                  >
                    <p style={{display: "flex"}}>
                      Upload
                      <input
                        type="file"
                        style={{
                          width: "130px",
                          opacity: "0",
                        }}
                        disabled
                      />
                      <CameraAlt />
                    </p>
                  </UploadBtn>
                </Card>
              </Left>
              <Right>
                <RightPersonal>
                  <SectionTitle name="personal">Personal Details</SectionTitle>
                  <Wrraper>
                    <DisplayForm>
                      {targetUser.firstName ? (
                        <Item>{targetUser.firstName}</Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>First Name</Item>
                      )}

                      {targetUser.lastName ? (
                        <Item>{targetUser.lastName}</Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>Last Name</Item>
                      )}

                      {targetUser.username ? (
                        <Item>{targetUser.username}</Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>User Name</Item>
                      )}

                      {targetUser.email ? (
                        <Item>{targetUser.email}</Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>Email</Item>
                      )}

                      {targetUser.phone ? (
                        <Item>{targetUser.phone}</Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>Phone</Item>
                      )}

                      {targetUser.dateOfBirth ? (
                        <Item>
                          {targetUser.dateOfBirth.toString().substring(0, 10)}
                        </Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>
                          Date of Birth : YY-MM-DD
                        </Item>
                      )}

                      {targetUser.gender ? (
                        <Item>{targetUser.gender}</Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>Gender</Item>
                      )}

                      <Item>
                        Joined: {format(targetUser.createdAt)}
                        {/* {targetUser.createdAt.toString().substring(0, 10)} */}
                      </Item>
                    </DisplayForm>
                  </Wrraper>
                </RightPersonal>
                <RightDelivery>
                  <SectionTitle name="delivery">Delivery Detailes</SectionTitle>
                  <Wrraper>
                    <DisplayForm>
                      {targetUser.company ? (
                        <Item>{targetUser.company}</Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>Compnay</Item>
                      )}
                      {targetUser.street ? (
                        <Item>{targetUser.street}</Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>Street Address</Item>
                      )}

                      {targetUser.postalCode ? (
                        <Item>{targetUser.postalCode}</Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>Postal Code</Item>
                      )}
                      {targetUser.city ? (
                        <Item>{targetUser.city}</Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>City</Item>
                      )}

                      {targetUser.postalService ? (
                        <Item>{targetUser.postalService}</Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>
                          Postal Service Preference
                        </Item>
                      )}
                      {targetUser.country ? (
                        <Item>{targetUser.country}</Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>Country</Item>
                      )}
                    </DisplayForm>
                  </Wrraper>
                </RightDelivery>
              </Right>
            </>
          ))}
      </BottomWrraper>
    </Container>
  );
};

export default SingleUser;
