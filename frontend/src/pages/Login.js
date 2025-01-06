import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handelError, handelSuccess } from "../utils";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handelChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const {  email, password } = loginInfo;
    if ( !email || !password) {
      return handelError("email and password are required");
    }
    try {
      const url = `https://mern-02-authentication-backend.vercel.app/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success,jwtToken,name,email, message, error } = result;
      localStorage.setItem('token',jwtToken)
      localStorage.setItem('LoggedinUser',name)
      localStorage.setItem('LoggedinUserEmail',email)
      if (success) {
        handelSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handelError(details);
      } else if (!success) {
        handelError(message);
      }
      console.log(result);
    } catch (err) {
      handelError(err);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">email</label>
          <input
            onChange={handelChange}
            type="email"
            name="email"
            placeholder="Enter Your email..."
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
            onChange={handelChange}
            type="password"
            name="password"
            placeholder="Enter Your password..."
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          New here ? <Link to="/signup">Signup</Link> for free
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
