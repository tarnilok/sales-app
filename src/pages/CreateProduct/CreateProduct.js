import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styling from "./CreateProduct.module.scss";
import { successToastify, errorToastify } from "../../toastify/toastify";
//apiconnectors
import { ApiFetcher } from "../../api/ConnectApi";
import { ApiPoster } from "../../api/ConnectApi";

//endpoints
const getCategoriesUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/";
const postProductUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products";

const CreateProduct = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [postStatus, setPostStatus] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    ApiFetcher(getCategoriesUrl, setCategoryList);
  }, []);

  const ProductPoster = (e) => {
    e.preventDefault();
    const { name, description, avatar, category, price, developerEmail } = e.target;
    const data = { name: name.value, description: description.value, avatar: avatar.value, category: category.value, price: price.value, developerEmail: developerEmail.value };

    ApiPoster(postProductUrl, data, setPostStatus);
    if (+postStatus < 300) {
      successToastify("Added successfully");
      navigate("/");
    } else {
      errorToastify("Something went wrong, please try again!");
    }
  };

  return (
    <main className={styling.main}>
      <div className={styling.title}>Create Product</div>
      <form className={styling.form} onSubmit={ProductPoster}>
        <input type="text" placeholder="Product name" name="name" className={styling.input} required />
        <textarea placeholder="Description" id="" rows="7" name="description" className={styling.inputtextarea} required />
        <input type="url" placeholder="Image URL" name="avatar" className={styling.input} required />
        <select name="category" className={styling.input}>
          <option value="" hidden>
            Categories
          </option>
          {categoryList.map((data) => (
            <option key={data.id}>{data.name}</option>
          ))}
        </select>
        {/* <datalist className={styling.input} required>
          {categoryList.map((data) => (
            <option key={data.id}>{data.name}</option>
          ))}
        </datalist> */}
        <input type="text" step=".01" placeholder="$ Price" name="price" className={styling.input} required />
        <input type="email" placeholder="Developer Email" name="developerEmail" className={styling.input} required />
        <button type="submit" className={styling.button}>
          SUBMIT
        </button>
      </form>
    </main>
  );
};

export default CreateProduct;
