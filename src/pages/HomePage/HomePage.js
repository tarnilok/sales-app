//hooks
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//apiconnectors
import { ApiFetcher } from "../../api/ConnectApi";
//style
import styling from "./HomePage.module.scss";
//assets
import addbutton from "../../assets/addbutton.svg";
//endpoints
const getProductsUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/";
const getCategoriesUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/";

const HomePage = () => {
  const [productList, setProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [switcher, setSwitcher] = useState(false);
  const navigate = useNavigate();
  // console.log(productList);
  // console.log(categoryList);

  useEffect(() => {
    ApiFetcher(getProductsUrl, setProductsList);
    ApiFetcher(getCategoriesUrl, setCategoryList);
  }, [switcher]);

  const SearchProduct = (e) => {
    const searchedList = [];
    if (e.key === "Enter" || e.keyCode === 13) {
      // eslint-disable-next-line array-callback-return
      productList.map((prod) => {
        if (prod.name.toLowerCase().includes(e.target.value.toLowerCase())) searchedList.push(prod);
      });
      setProductsList(searchedList);
    }
  };

  const CategoryFilter = (e) => {
    setProductsList(productList.filter((data) => data.category === e.target.value));
    if (e.target.value === "All Categories") setSwitcher(!switcher);
  };

  return (
    <main className={styling.main}>
      <section className={styling.section1}>
        <input type="search" placeholder="Search a product..." className={styling.search} onKeyDown={(e) => SearchProduct(e)} />
        <select className={styling.select} onChange={(e) => CategoryFilter(e)}>
          <option>All Categories</option>
          {categoryList.map((data) => (
            <option key={data.id}>{data.name}</option>
          ))}
        </select>
      </section>
      <section className={styling.section2}>
        {productList.map((prod) => (
          <div key={prod.id} className={styling.container}>
            <div className={styling.imgcontainer} onClick={() => navigate(`detailsinfo/${prod.id}`)}>
              <img src={prod.avatar} alt="productImage" className={styling.image} />
            </div>
            <span className={styling.name}>{prod.name}</span>
            <span className={styling.price}>$ {prod.price}</span>
          </div>
        ))}
      </section>
      <img src={addbutton} alt="addbutton" className={styling.addbutton} onClick={() => navigate("newproduct")} />
    </main>
  );
};

export default HomePage;
