import {React, useEffect, useState} from "react";
import styled from "styled-components";
import {DataGrid} from "@material-ui/data-grid";
import {authRequest} from "../requestMethods";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser} from "../redux/serverConnect";

const Container = styled.div`
  // background-color: black;
  // color: black;
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

const Button = styled.button`
  width: 60px;
  border: none;
  padding: 5px;
  background-color: #${(props) => (props.name === "edit" ? "2196f3" : "ef5350")};
  color: white;
  font-weight: 600;
  font-size: 13px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: ${(props) => props.name === "edit" && "5px"};
  margin-left: ${(props) => props.name === "delete" && "5px"};
`;

const TitleWrraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;
`;
const Title = styled.h2``;
const AddNewButton = styled.button`
  width: 80px;
  border: none;
  padding: 6px;
  background-color: black;
  //#2196f3;
  //#1565c0;
  // #00c853;
  color: white;
  font-weight: 600;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 7px;
`;

const UsersDataGrid = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const Columns = [
    {
      field: "image",
      headerName: "Image",
      width: 110,
      renderCell: (params) => {
        return params.row.image ? (
          <UserDisplayImg src={params.row.image} alt={params.row.firstName} />
        ) : (
          <UserDisplayAvatar>
            {`${params.row.lastName}`
              ? `${params.row.firstName}`[0].toUpperCase() +
                `${params.row.lastName}`[0].toUpperCase()
              : `${params.row.firstName}`[0].toUpperCase()}
          </UserDisplayAvatar>
        );
      },
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 120,
    },
    {field: "lastName", headerName: "Last Name", width: 100},
    {field: "email", headerName: "Email", width: 180},
    {field: "createdAt", headerName: "Created", width: 105},
    {field: "order", headerName: "Purchased Amount", width: 150},
    {
      field: "_id",
      headerName: "ID",
      width: 150,
    },
    {field: "isAdmin", headerName: "Role", width: 90},
    {
      field: " ",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"user/" + params.row._id}>
              <Button name="edit">Edit</Button>
            </Link>
            <Button name="delete" onClick={() => handleDelete(params.row._id)}>
              Delete
            </Button>
          </>
        );
      },
    },
  ];
  const handleDelete = (id) => {
    const confirmed = !alert(
      "Are you sure you want to permanently delete User?"
    );
    if (confirmed) {
      deleteUser(id, dispatch);
      console.log(`user with id no:${id} permanently deleted`);
    }
    return;
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await authRequest.get("/users");
      setUsers(res.data);
      // console.log(res.data);
    };

    getAllUsers();
  }, []);

  return (
    <Container style={{margin: "2% 8% 2% 16%", height: "630px", width: "80%"}}>
      <TitleWrraper>
        <Title>Users List</Title>
        <Link to={"/admin/users/newuser"}>
          <AddNewButton>Add New</AddNewButton>
        </Link>
      </TitleWrraper>

      <DataGrid
        // style={{color: "white"}}
        rows={users}
        columns={Columns}
        pageSize={10}
        checkboxSelection
        getRowId={(row) => row._id}
        disableSelectionOnClick
      />
    </Container>
  );
};

export default UsersDataGrid;
