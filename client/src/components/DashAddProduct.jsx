import {React, useState} from "react";

import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";

import {addProduct} from "../redux/serverConnect";
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
import app from ".././firebase";

const Container = styled.div`
  margin: 20px;
  margin-left: 18%;
  justify-content: space-between;
  margin-top: 30px;
`;

const UserTitle = styled.h2`
  margin-top: 70px;
`;

const UserForm = styled.form`
  display: flex;
  flex-direction: column;

  margin-top: 30px;
`;
const Combiner = styled.div`
  display: flex;
  // flex-wrrap: wrrap;
  margin-top: 80px;
  // flex-direction: column;
  // align-items: center;
  justify-content: space-between;
  margin-bottom: 80px;
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

const DashAddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
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

  const submitProduct = async (e) => {
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
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL);

            const product = {
              title: title,
              description: description,
              categories: categories,
              size: size,
              price: price,
              color: color,
              inStock: inStock,
              image: downloadURL,
            };
            addProduct(product, dispatch);
            // console.log(product);
          });
        }
      );

      setTitle("");
      setDescription("");
      setCategories([]);
      setSize([]);
      setColor([]);
      setImage("");
      setInStock(true);
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return (
    <Container>
      <UserTitle>Add New Product</UserTitle>

      <UserForm onSubmit={submitProduct}>
        <Combiner>
          <Left>
            <InputWrraper>
              <Input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Product Title"
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
                placeholder="Description"
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
                placeholder="Price"
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
          </Left>
          <Right>
            <InputWrraper>
              <Select
                isMulti
                options={categoryOptions}
                onChange={handleCategories}
                name="Categories"
              >
                Categories
              </Select>
            </InputWrraper>
            <InputWrraper>
              <Select
                options={inStockOptions}
                onChange={(e) => setInStock(e.value)}
                name="In Stock"
              >
                In Stock
              </Select>
            </InputWrraper>

            <InputWrraper>
              <Select isMulti options={colorOptions} onChange={handleColor}>
                Color
              </Select>
            </InputWrraper>
            <InputWrraper>
              <Select isMulti options={sizeOptions} onChange={handleSize}>
                Size
              </Select>
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

export default DashAddProduct;
