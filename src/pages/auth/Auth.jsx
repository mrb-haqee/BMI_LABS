import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./css/auth.css";
import Api from "../../utils/Api";
import { FormRegister } from "./components/FormRegister";
import { FormLogin } from "./components/FormLogin";
import { ToggleSlide } from "./ToggleSlide";

export default function Auth({ handleLogin }) {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [formSignUp, setFormSignUp] = useState({
    nama: "",
    email: "",
    password: "",
  });
  const [formSignIn, setFormSignIn] = useState({
    email: "",
    password: "",
  });

  const handleClickAuth = (slide) => {
    console.log(slide);
    slide === "login" ? setIsRegisterActive(true) : setIsRegisterActive(false);
  };

  const handleInputChange = (e, formName) => {
    const { name, value } = e.target;
    if (formName === "formSignUp") {
      setFormSignUp((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormSignIn((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e, formName) => {
    e.preventDefault();
    try {
      const endpoint =
        formName === "formSignUp"
          ? "/api/v1/auth/signup"
          : "/api/v1/auth/signin";

      const formData = formName === "formSignUp" ? formSignUp : formSignIn;

      const _resp = await Api.post(endpoint, formData);
      if (formName === "formSignUp") {
        toast.success("Berhasil Membuat Akun");
      } else {
        toast.success("Berhasil Login");
      }

      handleLogin(formData.email);
      setIsSignedUp(true);
    } catch (err) {
      toast.error("Terjadi Error");
      // Handle error state here if needed
    }
  };

  const activeForm = isRegisterActive ? "formSignUp" : "formSignIn";
  const form = isRegisterActive ? formSignUp : formSignIn;

  return (
    <>
      {isSignedUp && <Navigate to="/dashboard" replace={true} />}

      <Helmet>
        <meta charSet="utf-8" />
        <title>Auth</title>
        <link rel="icon" href="" />
      </Helmet>
      <div id="body_auth">
        <div className="warp">
          <div
            className={`container ${isRegisterActive ? "active" : ""}`}
            id="container"
          >
            <FormRegister
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              activeForm={activeForm}
              form={form}
            />
            <FormLogin
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              activeForm={activeForm}
              form={form}
            />
            <ToggleSlide
              isRegisterActive={isRegisterActive}
              handleClickAuth={handleClickAuth}
            />
          </div>
        </div>
      </div>
    </>
  );
}
