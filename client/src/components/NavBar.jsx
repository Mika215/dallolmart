import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import {Badge} from "@material-ui/core";
import {ShoppingCartOutlined} from "@material-ui/icons";
import {mobile} from "../responsiveness";
import {Link, useHistory} from "react-router-dom";
import {logout} from "../redux/serverConnect"; //!this is the logout function from serverConnect
import {useDispatch, useSelector} from "react-redux";

const Container = styled.div`
  height: 65px;
  ${mobile({height: "45px"})}
  background-color: #e0e0e0;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  ${mobile({padding: "10px 0px"})}
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  font-size: 2.5rem;
  // ${mobile({fontSize: "1.6rem", paddingLeft: "8px"})}
  text-align: center;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  // margin-left:140px;//is this margin good or not check
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({display: "none"})}
`;
const SearchContainer = styled.div`
 border: 0.5px solid white; 
  display: flex;
  align-items: center;

  margin-left: 25px;
  ${mobile({margin: "0px", border: "none", padding: "3px"})}
  padding: 5px;
  &:hover{
//  padding:8px;
  width:100%;


    }
  }

`;
const Input = styled.input`
  border: none;
  padding: 4px 10px;
  color: black;
  font-size: 15px;
  border-radius: 5px;
  &:hover {
    width: 100%;
    padding: 8px;

    border-radius: 20px;
    ${mobile({borderRadius: "1px", padding: "5px"})}
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({justifyContent: "center"})}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const UserDisplayImg = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #9fa8da;
`;

const UserDisplayAvatar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #9fa8da;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  const handlelogout = (e) => {
    logout(dispatch);
    // console.log(user)
    if (dispatch) {
      console.log("user loged out"); //!someting is wrong back end is responding 400 failing
      history.push("/");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo
            onClick={() => {
              history.push("/");
            }}
          >
            DallolMart
          </Logo>
        </Left>
        <Center>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="search..." />
            <SearchIcon style={{opacity: "0.5", fontSize: 20}} />
          </SearchContainer>
        </Center>
        <Right>
          <Link
            to={user !== null ? `/users/myprofile/${user._id}` : "/register"}
            style={{textDecoration: "none"}}
          >
            <MenuItem>
              {user !== null ? `${user.username}` : "Sign Up"}
            </MenuItem>
          </Link>
          <Link
            to={user !== null ? `/users/myprofile/${user._id}` : "/register"}
            style={{textDecoration: "none"}}
          >
            {user !== null && (
              <MenuItem>
                {user.image ? (
                  <UserDisplayImg src={user.image} alt={user.firstName} />
                ) : (
                  <UserDisplayAvatar>
                    {`${user.lastName}`
                      ? `${user.firstName}`[0].toUpperCase() +
                        `${user.lastName}`[0].toUpperCase()
                      : `${user.firstName}`[0].toUpperCase()}
                  </UserDisplayAvatar>
                )}
              </MenuItem>
            )}
          </Link>
          {user !== null ? (
            <MenuItem onClick={() => handlelogout()}>Logout</MenuItem>
          ) : (
            // </Link>
            <Link to={"/login"} style={{textDecoration: "none"}}>
              <MenuItem>Login</MenuItem>
            </Link>
          )}
          <Link to={"/cart"}>
            <MenuItem>
              <Badge badgeContent={quantity} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
