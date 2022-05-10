//hooks
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//apiconnectors
import { ApiFetcher } from "../../api/ConnectApi";
//style
import styling from "./HomePage.module.scss";
//assets
import addbutton from "../../assets/addbutton.svg";
import spinner from "../../assets/spinner.svg";
import noPhoto from "../../assets/NoPhotoAvailable.jpg";
//endpoints
const getProductsUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/";
const getCategoriesUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/";

const HomePage = () => {
  const [productList, setProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productsHolder, setProductsHolder] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    ApiFetcher(getProductsUrl, setProductsList, setProductsHolder, setLoading);
    ApiFetcher(getCategoriesUrl, setCategoryList);
  }, []);

  const SearchProduct = (e) => {
    const searchedList = [];
    if (e.key === "Enter" || e.which === 13) {
      // eslint-disable-next-line array-callback-return
      productsHolder.map((prod) => {
        if (prod.name.toLowerCase().includes(e.target.value.toLowerCase())) searchedList.push(prod);
      });
      setProductsList(searchedList);
    }
  };

  const CategoryFilter = (e) => {
    if (e.target.value === "All Categories") {
      setProductsList(productsHolder);
    } else {
      setProductsList(productsHolder.filter((data) => data.category === e.target.value));
    }
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
        {loading ? (
          <img src={spinner} className={styling.spinner} alt="spinner-gif" />
        ) : (
          productList.map((prod) => (
            <div key={prod.id} className={styling.container}>
              <div className={styling.imgcontainer} onClick={() => navigate(`detailsinfo/${prod.id}`)}>
                <img src={prod.avatar.includes("http") ? prod.avatar : noPhoto} alt="productImage" className={styling.image} />
              </div>
              <span className={styling.name}>{prod.name}</span>
              <span className={styling.price}>$ {prod.price}</span>
            </div>
          ))
        )}
      </section>
      <img src={addbutton} alt="addbutton" className={styling.addbutton} onClick={() => navigate("newproduct")} />
    </main>
  );
};

export default HomePage;
