import {useState} from "react";
import {useLocation} from "react-router-dom";
import styled from "styled-components";
import Advert from "../components/Advert";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Products from "../components/Products";


const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;
const Option = styled.option`
  // background-color:#${(props) => props.bg}
  // color:#${(props) => props.color};
`;

const ProductsList = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const location = useLocation();
  const category = location.pathname.split("/")[2];

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  return (
    <Container>
      <NavBar />
      <Advert />
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled defaultValue>
              Color
            </Option>
            <Option>Blue</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Gray</Option>
            <Option>Green</Option>
            <Option>Pink</Option>
            <Option>Yellow</Option>
            <Option>Cyan</Option>
            <Option>Red</Option>
          </Select>
          <Select
            name="size" //!similar changehandler function can be classified by a name property like this (name=size and name=color)
            onChange={handleFilters}
            selected
          >
            <Option disabled defaultValue>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
            <Option>42</Option>
            <Option>43</Option>
            <Option>44</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price(Asc)</Option>
            <Option value="desc">Price(Desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort} />
      <NewsLetter />

      <Footer />
    </Container>
  );
};

export default ProductsList;
