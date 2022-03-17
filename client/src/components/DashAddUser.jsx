import {React, useState} from "react";

import styled from "styled-components";
import {useDispatch} from "react-redux";

import {createUser} from "../redux/serverConnect";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from ".././firebase";

const Container = styled.div`
  margin: 20px;
  margin-left: 18%;
  justify-content: space-between;
  margin-top: 30px;
`;

const UserTitle = styled.h2``;

const UserForm = styled.form`
  display: flex;
  flex-direction: column;

  margin-top: 20px;
`;
const Combiner = styled.div`
  display: flex;
  // flex-wrrap: wrrap;
  margin-top: 50px;
  // flex-direction: column;
  // align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const Left = styled.div`
  margin-right: 10px;
  width: 40%;
  // flex:1;
`;
const Right = styled.div`
  margin-right: 50px;
  width: 40%;
  // flex:1;
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
  margin-left: 0px;
  font-size: 17px;
  color: rgb(151, 150, 150);
`;

const Button = styled.button`
  width: 32%;
  border: none;
  padding: 10px;
  background-color: #1769aa;
  color: white;
  font-weight: 600;
  font-size: 17px;
  letter-spacing: 0.2rem;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 20px;
  &:active {
    transform: scale(0.96);
  }
`;

const InputWrraper = styled.div`
  margin: 12px 0;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  background: white;
  padding: 4px 5px;
  border: 1px solid #dad8d8;
  border-radius: 5px;
  font-size: 17px;
`;

const DashAddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState(0);
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(0);
  const [company, setCompany] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalService, setPostalService] = useState("");
  const [image, setImage] = useState("");
  const [progressBar, setProgressBar] = useState(null);
  const dispatch = useDispatch();
  // const history = useHistory();

  const submitUser = async (e) => {
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

            const user = {
              firstName: firstName,
              lastName: lastName,
              username: username,
              email: email,
              password: password,
              phone: phone,
              dateOfBirth: dateOfBirth,
              gender: gender,
              company: company,
              street: street,
              postalCode: postalCode,
              city: city,
              country: country,
              postalService: postalService,
              image: downloadURL,
            };
            createUser(user, dispatch);
            // console.log(user);
          });
        }
      );

      setFirstName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone(null);
      setGender("");
      setDateOfBirth(null);
      setCompany("");
      setStreet("");
      setPostalCode(null);
      setCity("");
      setCountry("");
      setPostalService("");
      setImage("");
      setProgressBar(null);
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return (
    <Container>
      <UserTitle>Add new user</UserTitle>
      {progressBar && (
        <span style={{color: "red"}}>Upload is{progressBar}% done</span>
      )}
      <UserForm onSubmit={submitUser}>
        <Combiner>
          <Left>
            <InputWrraper>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="First Name"
                required
              />
            </InputWrraper>
            <InputWrraper>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Last Name"
                required
              />
            </InputWrraper>
            <InputWrraper>
              <Input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Username"
                required
              />
            </InputWrraper>
            <InputWrraper>
              <Input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                required
              />
            </InputWrraper>

            <InputWrraper>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                required
              />
            </InputWrraper>
            <InputWrraper>
              <Input
                type="number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="+32-4-6567-6869"
              />
            </InputWrraper>
            <InputWrraper>
              <Input
                type="text"
                value={dateOfBirth}
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                }}
                placeholder="Date of Birth DD-MM-YY"
              />
            </InputWrraper>

            <InputWrraper>
              <GenderWrraper>
                <Label style={{marginRight: "0px"}}>Man</Label>
                <Input
                  type="radio"
                  value="man"
                  checked={gender === "man"}
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
                  checked={gender === "woman"}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  style={{width: "15px", marginLeft: "0px"}}
                />
                <Label style={{marginLeft: "25px"}}>Other</Label>
                <Input
                  type="radio"
                  value="other"
                  checked={gender === "other"}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  style={{width: "15px", margin: "8px"}}
                />
              </GenderWrraper>
            </InputWrraper>
          </Left>
          <Right>
            <InputWrraper>
              <Input
                type="text"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
                placeholder={"Company"}
                required
              />
            </InputWrraper>
            <InputWrraper>
              <Input
                type="text"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
                //!this one seems to be working good
                placeholder={"Street Address"}
                required
              />
            </InputWrraper>
            <InputWrraper>
              <Input
                type="number"
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
                placeholder={"Postal Code"}
                required
              />
            </InputWrraper>
            <InputWrraper>
              <Input
                type="text"
                required
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                placeholder="City"
              />
            </InputWrraper>
            <InputWrraper>
              <Input
                type="text"
                required
                value={postalService}
                onChange={(e) => {
                  setPostalService(e.target.value);
                }}
                placeholder="Postal Service Preference"
              />
            </InputWrraper>
            <InputWrraper>
              <Input
                type="text"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                placeholder={"Country"}
                required
              />
            </InputWrraper>

            <InputWrraper>
              <Input
                id="image"
                type="file"
                // value={image}
                onChange={(e) => setImage(e.target.files[0])}
                placeholder="upload Image"
                name="image"
              />
            </InputWrraper>
          </Right>
        </Combiner>
        <InputWrraper>
          <Button type="submit">Create</Button>
        </InputWrraper>
      </UserForm>
    </Container>
  );
};

export default DashAddUser;
