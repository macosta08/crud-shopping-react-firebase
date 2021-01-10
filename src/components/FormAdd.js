import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";

export const FormAdd = ({ addUpdateProduct, currentId }) => {
  const inicialStateProduct = {
    product: "",
  };
  const [products, setProduct] = useState(inicialStateProduct);

  const handleInputProduct = (e) => {
    const { name, value } = e.target;
    setProduct({ ...inicialStateProduct, [name]: value });
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    // if (products.value === undefined) {
    //   return toast("Please Add Product", { type: "warning", autoClose: 1000 });
    // }
    addUpdateProduct(products);
    setProduct({ ...inicialStateProduct });
  };

  const getProductValue = async (id) => {
    const doc = await db.collection("products").doc(id).get();
    setProduct({ ...doc.data() });
  };

  useEffect(() => {
    if (currentId === "") {
      setProduct({ ...inicialStateProduct });
    } else {
      getProductValue(currentId);
    }
  }, [currentId]);

  return (
    <form onSubmit={handleSubmitProduct}>
      <div className="form-group">
        <span className="material-icons">local_grocery_store</span>
        <input
          onChange={handleInputProduct}
          type="text"
          className="form-control form-control-lg"
          placeholder="Add a Product"
          autoComplete="off"
          name="product"
          value={products.product}
          required="required"
        />
      </div>

      <button className="btn btn-primary btn-lg btn-block">
        {currentId === "" ? "Save" : "Update"}
      </button>
    </form>
  );
};
