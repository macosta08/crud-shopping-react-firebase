import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";
import { FormAdd } from "./FormAdd";
import { db } from "../lib/firebase";

export const Card = () => {
  const query = db.collection("products");
  const [values, loading, error] = useCollection(query);
  const [currentId, setCurrentId] = useState("");

  const addUpdateProduct = async (objectProduct) => {
    try {
      if (currentId === "") {
        await db.collection("products").doc().set(objectProduct);
        toast("New Product Added", {
          type: "success",
          autoClose: 2000,
        });
      } else {
        await db.collection("products").doc(currentId).update(objectProduct);
        toast("Product Updated Succeessfully", {
          type: "info",
          autoClose: 2000,
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error("error");
    }
  };

  const onDeleteProduct = async (id) => {
    await db.collection("products").doc(id).delete();
    toast("Product Removed Successfully", {
      type: "error",
      autoClose: 2000,
    });
  };

  const getProducts = async () => {
    query.onSnapshot((querySnapshot) => {
      //para añadir el id de firebase al objeto (doc.data() y doc.id)
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="position-relative">
      <div className="col-md-4-center p-2">
        <FormAdd addUpdateProduct={addUpdateProduct} currentId={currentId} />
      </div>
      <section>
        <div className="container p-4">
          <h2 className="mb-4">Products</h2>
          <hr />
        </div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Products: Loading...</span>}
        {values && (
          <span>
            <div className="col-md-4-center p-2">
              {values.docs.map((doc) => (
                <div key={doc.id} className="card text-white bg-secondary mb-2">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h4 className="card-title">
                        {doc.data().product.charAt(0).toUpperCase() +
                          doc.data().product.slice(1)}
                      </h4>
                      <div>
                        <a href="#">
                          <span className="p-3">
                            <i
                              className="material-icons"
                              onClick={() => onDeleteProduct(doc.id)}
                            >
                              auto_delete
                            </i>
                          </span>
                        </a>
                        <a href="#">
                          <i
                            className="material-icons"
                            onClick={() => setCurrentId(doc.id)}
                          >
                            create
                          </i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </span>
        )}
      </section>
    </div>
  );
};
