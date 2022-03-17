import {React, useEffect, useState} from "react";
import styled from "styled-components";
import {useLocation} from "react-router-dom";
import {authRequest} from "../requestMethods";
import {CameraAlt} from "@material-ui/icons";
import {format} from "timeago.js";
import {useDispatch} from "react-redux";
import {updateProduct} from "../redux/serverConnect";
import {
  categoryOptions,
  colorOptions,
  sizeOptions,
  inStockOptions,
} from "../utils";
import Select from "react-select";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

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

const ItemDisplayImg = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 290px;
  height: 360px;
  object-fit: ;
  background-color: #9fa8da;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;
const ItemDisplayAvatar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 290px;
  height: 360px;
  object-fit: cover;
  background-color: #9fa8da;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #c5cae9;
    transform: scale(1);
    transition: all 0.5s ease;
    color: black;
  }
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
  width: 57%;
  //   cursor: pointer;
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

const FilterColor = styled.div`
  width: ${(props) =>
    props.color === "White" || props.color === "white" ? "18px" : "20px"};
  height: ${(props) =>
    props.color === "White" || props.color === "white" ? "18px" : "20px"};
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 4px;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.color === "White" || props.color === "white"
      ? "0.5px solid gray"
      : "none"};
`;

const SingleProduct = () => {
  const location = useLocation();
  const targetId = location.pathname.split("/")[3];
  const [targetProduct, setTargetProduct] = useState();
  const [onEdit, setOnEdit] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [inStock, setInStock] = useState(true);

  const [progressBar, setProgressBar] = useState(null);
  const dispatch = useDispatch();

  const handleCategories = (e) => {
    setCategories(e ? e.map((category) => category.value) : []);
  };
  // console.log(categories);
  const handleColor = (e) => {
    setColor(e ? e.map((color) => color.value) : []);
  };
  // console.log(color);

  const handleSize = (e) => {
    setSize(e ? e.map((size) => size.value) : []);
  };

  useEffect(() => {
    const fetchTargetProduct = async () => {
      const res = await authRequest.get(`products/find/${targetId}`);
      setTargetProduct(res.data);
      // console.log(res.data);
    };

    fetchTargetProduct();
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

            const productData = {
              title: !title
                ? targetProduct.title && targetProduct.title
                : title,
              description: !description
                ? targetProduct.description && targetProduct.description
                : description,
              price: !price
                ? targetProduct.price && targetProduct.price
                : price,
              color: !color
                ? targetProduct.color && targetProduct.color
                : color,
              image: !image
                ? targetProduct.image && targetProduct.image
                : downloadURL,
              inStock: !inStock
                ? targetProduct.inStock && targetProduct.inStock
                : inStock,
              categories: !categories
                ? targetProduct.categories && targetProduct.categories
                : categories,
              size: !size ? targetProduct.size && targetProduct.size : size,
            };

            updateProduct(targetId, productData, dispatch);
            // console.log(targetId, productData);
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
        {targetProduct &&
          (onEdit ? (
            <>
              <Left>
                <Card>
                  {targetProduct.image ? (
                    <ItemDisplayImg
                      name="product"
                      src={targetProduct.image}
                      alt={targetProduct.title}
                    />
                  ) : (
                    <ItemDisplayAvatar name="product">
                      {" "}
                      {`${targetProduct.categories}`
                        .split(",")[0]
                        .toUpperCase()}
                    </ItemDisplayAvatar>
                  )}
                </Card>
                <UploadBtn>
                  <p style={{display: "flex"}}>
                    Upload
                    <input
                      style={{
                        width: "180px",
                        opacity: "0",
                        cursor: "pointer",
                      }}
                      id="image"
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                      placeholder={targetProduct.image}
                      name="image"
                    />
                    <CameraAlt />
                  </p>
                </UploadBtn>
                {progressBar && (
                  <span style={{color: "red"}}>
                    Image upload {progressBar}% Completed
                  </span>
                )}
              </Left>
              <Right>
                <Form onSubmit={saveEdit}>
                  <RightPersonal style={{marginLeft: "15px"}}>
                    <SectionTitle name="right">Product Details</SectionTitle>
                    <InputWrraper>
                      <Input
                        type="text"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        placeholder={targetProduct.title}
                        required
                      />
                    </InputWrraper>
                    <InputWrraper>
                      <Input
                        type="text"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        placeholder={targetProduct.description}
                        required
                      />
                    </InputWrraper>
                    <InputWrraper>
                      <Input
                        type="number"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        placeholder={targetProduct.price}
                        required
                      />
                    </InputWrraper>

                    <InputWrraper>
                      <CreatedAt>
                        Joined: {format(targetProduct.createdAt)}
                        {/* {user.createdAt.toString().substring(0, 10)} */}
                      </CreatedAt>
                    </InputWrraper>
                    {/* </Form> */}
                  </RightPersonal>
                  <RightDelivery>
                    <SectionTitle name="right">Product Details</SectionTitle>
                    {/* <Form action="">  */}
                    {/* //! Please embrace both sections inside one form under the right block */}
                    <InputWrraper>
                      <Select
                        isMulti
                        options={categoryOptions}
                        onChange={handleCategories}
                        name="Categories"
                        placeholder={targetProduct.categories?.map(
                          (category) => "   " + category + ", "
                        )}
                      >
                        Categories
                      </Select>
                    </InputWrraper>
                    <InputWrraper>
                      <Select
                        options={inStockOptions}
                        onChange={(e) => setInStock(e.value)}
                        name="In Stock"
                        placeholder={
                          targetProduct.inStock === true ? "Yes" : "No"
                        }
                      >
                        In Stock
                      </Select>
                    </InputWrraper>

                    <InputWrraper>
                      <Select
                        isMulti
                        options={colorOptions}
                        onChange={handleColor}
                        placeholder={targetProduct.color?.map(
                          (c) => "   " + c + ", "
                        )}
                      >
                        Color
                      </Select>
                    </InputWrraper>
                    <InputWrraper>
                      <Select
                        isMulti
                        options={sizeOptions}
                        onChange={handleSize}
                        placeholder={targetProduct.size?.map(
                          (s) => "   " + s + ", "
                        )}
                      >
                        {size}
                      </Select>
                    </InputWrraper>
                    <Button
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
                  <Cancel onClick={handleClick}>X</Cancel>

                  {targetProduct.image ? (
                    <ItemDisplayImg
                      name="product"
                      src={targetProduct.image}
                      alt={targetProduct.title}
                    />
                  ) : (
                    <ItemDisplayAvatar name="product">
                      {" "}
                      {`${targetProduct.categories}`
                        .split(",")[0]
                        .toUpperCase()}
                    </ItemDisplayAvatar>
                  )}
                </Card>
              </Left>
              <Right>
                <RightPersonal>
                  <SectionTitle name="personal">Product Details</SectionTitle>
                  <Wrraper>
                    <DisplayForm>
                      {targetProduct.title ? (
                        <Item style={{fontWeight: 800}}>
                          {targetProduct.title}
                        </Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>Product Title</Item>
                      )}

                      {targetProduct.description ? (
                        <Item>{targetProduct.description}</Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>
                          Product Description
                        </Item>
                      )}

                      {targetProduct.price ? (
                        <Item>€{targetProduct.price}</Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>Price</Item>
                      )}
                      <Item>
                        Color:
                        {targetProduct.color?.map(
                          (
                            c //!checking if the array does exist with ternery operator was life saving
                          ) => (
                            <FilterColor color={c} key={c} />
                          )
                        )}
                      </Item>
                      <Item>
                        Size:{targetProduct.size?.map((s) => "   " + s + ", ")}
                      </Item>

                      {targetProduct.inStock &&
                      targetProduct.inStock === true ? (
                        <Item style={{color: "green", fontWeight: 600}}>
                          In Stock
                        </Item>
                      ) : (
                        <Item style={{color: "red", fontWeight: 700}}>
                          Sold Out{" "}
                        </Item>
                      )}

                      <Item>Created: {format(targetProduct.createdAt)}</Item>
                    </DisplayForm>
                  </Wrraper>
                </RightPersonal>
                <RightDelivery>
                  <SectionTitle name="delivery">Category Detailes</SectionTitle>
                  <Wrraper>
                    <DisplayForm>
                      {targetProduct.categories ? (
                        <Item>
                          {targetProduct.categories.map(
                            (category) => "   " + category + ", "
                          )}
                        </Item>
                      ) : (
                        <Item style={{opacity: "0.5"}}>Category</Item>
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

export default SingleProduct;
