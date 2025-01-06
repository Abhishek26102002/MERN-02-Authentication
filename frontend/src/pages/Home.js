import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handelError, handelSuccess } from "../utils";

const Home = () => {
  const [loggedinuser, setloggedinuser] = useState("");
  const [products, setProducts] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setloggedinuser(localStorage.getItem("LoggedinUser"));
  }, []);

  const handelLogOut = () => {
    localStorage.removeItem("LoggedinUser");
    localStorage.removeItem("token");
    localStorage.removeItem("LoggedinUserEmail");
    handelSuccess("Successfully Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProduct = async () => {
    try {
      const url = `https://mern-02-authentication-backend.vercel.app/products`;

      const headers = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      handelError(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="">
      <h1>Welcome ! {loggedinuser}</h1>
      <br />
      <h2>{localStorage.getItem("LoggedinUserEmail")}</h2>
      <button onClick={handelLogOut}>Log out</button>
      <div>
        {products &&
          products.map((items, index) => (
            <ul key={index}>
              <span>
                {items.name} : {items.price}
              </span>
            </ul>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
