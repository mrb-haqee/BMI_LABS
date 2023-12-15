import React from "react";

export function ToggleSlide(props) {
  return (
    <div className="toggle-container">
      <div className="toggle">
        <div
          className={`toggle-panel toggle-left ${
            props.isRegisterActive ? "hidden" : ""
          }`}
        >
          <h1>Welcome Back!</h1>
          <p>Enter your personal details to use all site features</p>
          <button
            className="hidden"
            onClick={() => props.handleClickAuth("register")}
          >
            Sign In
          </button>
        </div>
        <div
          className={`toggle-panel toggle-right ${
            props.isRegisterActive ? "" : "hidden"
          }`}
        >
          <h1>Hello, Friend!</h1>
          <p>Register with your personal details to use all site features</p>
          <button
            className="hidden"
            onClick={() => props.handleClickAuth("login")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
