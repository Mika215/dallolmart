import {React,useEffect} from "react";
import styled from "styled-components";
import {DataGrid} from "@material-ui/data-grid";


import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProducts, deleteProduct} from "../redux/serverConnect";

const Container = styled.div`
  // background-color: black;
  // color: white;
`;

const ProductDisplayImg = styled.img`
  width: 45px;
  height: 45px;
  object-fit: fit;
  border-radius: 50%;
  margin-right: 25px;
`;

const ProductDisplayAvatar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  object-fit: fit;
  border-radius: 50%;
  margin-right: 25px;

  background-color: #9fa8da;
  color: white;
  font-size: 12px;
  font-weight: 700;
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

  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
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
  color: white;
  font-weight: 600;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 7px;
`;

const ProductWrraper = styled.div`
  display: flex;
  align-items: center;
`;

const ProductsDataGrid = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const Columns = [
    {
      field: "image",
      headerName: "Image",
      width: 290,
      renderCell: (params) => {
        return (
          <ProductWrraper>
            {params.row.image ? (
              <>
                <ProductDisplayImg
                  src={params.row.image}
                  alt={params.row.firstName}
                />
                {params.row.title}
              </>
            ) : (
              <>
                <ProductDisplayAvatar>
                  {params.row.categories[0]}
                </ProductDisplayAvatar>
                {params.row.title}
              </>
            )}
          </ProductWrraper>
        );
      },
    },
    {field: "price", headerName: "Price", width: 110},
    {field: "createdAt", headerName: "Created", width: 230},
    {
      field: "_id",
      headerName: "ID",
      width: 240,
    },
    {field: "inStock", headerName: "In Stock", width: 130},
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/product/" + params.row._id}>
              <Button name="edit">Edit</Button>
            </Link>
            <Button onClick={() => handleDelete(params.row._id)} name="delete">
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    const confirmed = !alert(
      "Are you sure you want to permanently delete Product?"
    );
    if (confirmed) {
      deleteProduct(id, dispatch);
      console.log(`product id no:${id} will be deleted`);
    }
    return;
  };

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  return (
    <Container style={{margin: "2% 8% 2% 16%", height: "630px", width: "80%"}}>
      <TitleWrraper>
        <Title>Products List</Title>
        <Link to={"/admin/products/newproduct"}>
          <AddNewButton>Add New</AddNewButton>
        </Link>
      </TitleWrraper>
      <DataGrid
        rows={products}
        columns={Columns}
        pageSize={10}
        checkboxSelection
        getRowId={(row) => row._id}
        disableSelectionOnClick
      />
    </Container>
  );
};

export default ProductsDataGrid;
