import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handelError, handelSuccess } from "../utils";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handelChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handelError("name, email and password are required");
    }
    try {
      const url = `https://mern-02-authentication-backend.vercel.app`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handelSuccess(message);
        setTimeout(() => {
          navigate("/login");
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
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handelChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter Your name..."
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            onChange={handelChange}
            type="email"
            name="email"
            placeholder="Enter Your email..."
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
            onChange={handelChange}
            type="password"
            name="password"
            placeholder="Enter Your password..."
            value={signupInfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an Account ? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
