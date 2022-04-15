import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiFetcher } from "../../api/ConnectApi";
import styling from "./HomePage.module.scss";
import addbutton from "../../assets/addbutton.svg"

const getProductsUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/";
const getCategoriesUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/";

const HomePage = () => {
  const [productList, setProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate()
  console.log(productList);
  console.log(categoryList);

  useEffect(() => {
    ApiFetcher(getProductsUrl, setProductsList);
    ApiFetcher(getCategoriesUrl, setCategoryList);
  }, []);

  return (
    <main className={styling.main}>
      <section className={styling.section1}>
        <input type="search" placeholder="Search a product..." className={styling.search} />
        <select className={styling.select}>
          <option value="" hidden>
            Categories
          </option>
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
      <img src={addbutton} alt="addbutton" className={styling.addbutton} onClick={() => navigate("newproduct")}/>
    </main>
  );
};

export default HomePage;
