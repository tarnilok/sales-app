import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiFetcher } from "../../api/ConnectApi";
import styling from "./DetailPage.module.scss";

const getProductsUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/";

const DetailPage = () => {
  const [productData, setProductData] = useState([]);
  const { id } = useParams();

  console.log(productData);
  useEffect(() => {
    ApiFetcher(getProductsUrl + `/${id}`, setProductData);
  }, [id]);
  return (
    <main className={styling.main}>
      <section className={styling.section1}>
        <div className={styling.imgcontainer}>
          <img src={productData.avatar} alt="productImage" className={styling.image} />
        </div>
        <div className={styling.titlecontainer}>
          <span>{productData.name || "merhaba"}</span>
          <h1>$ {productData.price}</h1>
        </div>
      </section>
      <hr />
      <section className={styling.section2}>
        <div className={styling.title}>Description</div>
        <div className={styling.info}>{productData.description} </div>
      </section>
    </main>
  );
};

export default DetailPage;
