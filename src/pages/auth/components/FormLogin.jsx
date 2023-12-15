import React from "react";
import { SocialIcons } from "./SocialIcons";

export function FormLogin(props) {
  return (
    <div className="form-container sign-in">
      <form onSubmit={(e) => props.handleSubmit(e, props.activeForm)}>
        <h1>Sign In</h1>
        <SocialIcons />
        <span>or use your email and password</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={props.form.email}
          onChange={(e) => props.handleInputChange(e, props.activeForm)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={props.form.password}
          onChange={(e) => props.handleInputChange(e, props.activeForm)}
        />
        <a href="#">Forgot Your Password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}
