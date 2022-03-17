import {useState, useEffect} from "react";
import styled from "styled-components";
import Product from "./Product";

import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({category, filters, sort}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // console.log(category, filters, sort);

  useEffect(() => {
    const getProducts = async () => {
      let message;
      try {
        const res = await axios.get(
          category
            ? `http://localhost:5000/products/?category=${category}` //if the user speified catagorey fetch with category unless fetch all products
            : `http://localhost:5000/products`
        );
        // console.log(res.data);

        if (res.data.length === 0) {
          message = `There is no product under "${category}" category! please,check your query input.`;
          console.log(message);
          // setProducts(message);
        } else {
          setProducts(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, filters, category]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((previous) =>
        [...previous].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((previous) =>
        [...previous].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((previous) =>
        [...previous].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {category
        ? filteredProducts.map((item) => <Product key={item._id} item={item} />)
        : products
            .slice(0, 9)
            .map((item) => <Product key={item._id} item={item} />)}
    </Container>
  );
};

export default Products;
