import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiFetcher } from "../../api/ConnectApi";
import Popup from "reactjs-popup";
import { ApiHandler } from "../../api/ConnectApi";

//style
import styling from "./DetailPage.module.scss";
import "reactjs-popup/dist/index.css";
import "./ReactjsPopup.css";
import { useNavigate } from "react-router-dom";
import { successToastify, errorToastify } from "../../toastify/toastify";

const getProductsUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/";
const deleteProductUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/";

const DetailPage = () => {
  const [productData, setProductData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(productData);
  useEffect(() => {
    ApiFetcher(getProductsUrl + `${id}`, setProductData);
  }, [id]);

  const ProductDeleter = async () => {
    try {
      await ApiHandler(deleteProductUrl + `${id}`, {}, "delete");
      successToastify("Deleted successfully");
      navigate("/");
    } catch (error) {
      errorToastify("Something went wrong, please try again!");
    }
  };
  return (
    <main className={styling.main}>
      <section className={styling.section1}>
        <div className={styling.imgcontainer}>
          <img src={productData.avatar} alt="productImage" className={styling.image} />
        </div>
        <div className={styling.titlecontainer}>
          <span>{productData.name || "merhaba"}</span>
          <h1>$ {productData.price}</h1>
          <Popup on={"click"} trigger={<button className={styling.delbutton}>Delete</button>} modal nested>
            {(close) => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Are you sure to delete? </div>
                <div className="actions">
                  <button
                    className="button"
                    onClick={() => {
                      ProductDeleter();
                      close();
                    }}
                  >
                    {" "}
                    Yes{" "}
                  </button>
                  <button
                    className="buttonclose"
                    onClick={() => {
                      close();
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </Popup>
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
