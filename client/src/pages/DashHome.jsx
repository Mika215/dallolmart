import {React, useState, useEffect} from "react";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {authRequest} from "../requestMethods";
import Login from "./Login"

const Container = styled.div`
  margin-left: 80px;
  width: 95%;
`;

const Wrraper = styled.ul`
  display: flex;
  margin: 20px;
  justify-content: space-around;
  //   flex-wrrap:wrrap;
`;

const Left = styled.div`
  flex: 1.5;
`;
const Right = styled.div`
  flex: 1.5;
`;
const Title = styled.h2`
  margin-bottom: 10px;
`;
const Category = styled.div`
  padding: 20px;
  margin-left: 15%;
`;

const CategoryWrraper = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  flex-wrap: wrap;
`;

const ItemDisplay = styled.div`
  width: 100%;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);

`;
const ItemDisplayTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemDisplayImg = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.name === "user" ? "60px" : "100px")};
  height: ${(props) => (props.name === "user" ? "60px" : "70px")};
  border-radius: ${(props) => props.name === "user" && "50%"};
  object-fit: cover;
  background-color: #9fa8da;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor:pointer;
  &:hover{
    transform:scale(1.2);
    transition:  0.3s all ease-out;
  };
  transition:transform 80ms ease-in;
  &:active{
      transform:scale(0.95);
  }
`;
const ItemDisplayAvatar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.name === "user" ? "55px" : "100px")};
  height: ${(props) => (props.name === "user" ? "55px" : "70px")};
  border-radius: ${(props) => props.name === "user" && "50%"};
  object-fit: cover;
  background-color: #9fa8da;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor:pointer;
  &:hover{
    transform:scale(1.2);
    transition:  0.3s all ease-out;
  };
  transition:transform 80ms ease-in;
  &:active{
      transform:scale(0.95);
  }
`;
const ItemDisplayTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const ItemName = styled.span`
  font-size: 16px;
  font-weight: 600;
`;
const ItemTitle = styled.span`
  font-style: italic;
  font-weight: 300;
`;

const DashHome = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const user=useSelector((state) => state.user.currentUser)

  useEffect(() => {
    const getTopUsers = async () => {
      try {
        const res = await authRequest.get("/users?new=true");
        setUsers(res.data);
        //!the most recent should be displayed on the top
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getTopProducts = async () => {
      try {
        const res = await authRequest.get("/products?new=true");
        setProducts(res.data);
        //!try to sort the fetched data based on some requirement
        //!the most recent should be displayed on the top
      } catch (err) {
        console.log(err);
      }
    };

    getTopUsers();
    getTopProducts();
  }, []);

  const handleUserClick=async(userId)=>{

    //!1.take the user using user id and open it in a single user page 
    //2.so that either we can review user properties or edit its properties or even delete
    console.log("User id:")
console.log(userId)
  }

  const handleProductClick=async(productId)=>{

    //!1.take the user using user id and open it in a single user page 
    //2.so that either we can review user properties or edit its properties or even delete
    console.log("Product id:")
console.log(productId)
  }

 
  return (
    <Container>
  { user?.isAdmin? (<Wrraper>
        <Left>
          <Category>
            <CategoryWrraper>
              {users && <Title>Latest Users</Title>}
              {users?.map((listedUser) => (
                <ItemDisplay  key={listedUser._id}>

<Link to={`/admin/user/${listedUser._id}`} style={{textDecoration:"none",color:"black"}}>
                  <ItemDisplayTop>
                    {listedUser.image ? (
                      <ItemDisplayImg onClick={()=>handleUserClick(listedUser._id)} name="user" src={listedUser.image} />
                    ) : (
                      <ItemDisplayAvatar onClick={()=>handleUserClick(listedUser._id)} name="user">
                        {`${listedUser.lastName}`
                          ? `${listedUser.firstName}`[0].toUpperCase() +
                            `${listedUser.lastName}`[0].toUpperCase()
                          : `${listedUser.firstName}`[0].toUpperCase()}
                      </ItemDisplayAvatar>
                    )}
                    <ItemDisplayTitle>
                      <ItemName>
                        {listedUser.firstName} {listedUser.lastName}
                      </ItemName>
                      <ItemTitle>{listedUser.email}</ItemTitle>
                      <ItemTitle>
                        {listedUser.createdAt.toString().substring(0, 10)}
                      </ItemTitle>
                    </ItemDisplayTitle>
                  </ItemDisplayTop>

                  </Link>
                </ItemDisplay>
              ))}
            </CategoryWrraper>
          </Category>
        </Left>
        <Right>
          <Category>
            <CategoryWrraper>
              {products && <Title>Latest Products</Title>}
              {products?.map((product) => (
                <ItemDisplay  key={product._id}>
                  <Link to={`/admin/product/${product._id}`} style={{textDecoration:"none",color:"black"}}>
                  <ItemDisplayTop>
                    {product.image ? (
                      <ItemDisplayImg  onClick={()=>handleProductClick(product._id)} name="product" src={product.image} />
                    ) : (
                      <ItemDisplayAvatar onClick={()=>handleProductClick(product._id)} name="product">
                        {" "}
                        {`${product.categories}`.split(",")[0].toUpperCase()}
                      </ItemDisplayAvatar>
                    )}
                    <ItemDisplayTitle>
                      <ItemName>{product.title}</ItemName>
                      <ItemTitle>€{product.price}</ItemTitle>
                      <ItemTitle>
                        {" "}
                        {product.inStock ? "In Stock" : "Sold-out"}
                      </ItemTitle>
                    </ItemDisplayTitle>
                  </ItemDisplayTop>
                  </Link>
                </ItemDisplay>
              ))}
            </CategoryWrraper>
          </Category>
        </Right>
      </Wrraper>):(<Login/>)}
    </Container>
  );
};

export default DashHome;
