import React from "react";
import { SocialIcons } from "./SocialIcons";

export function FormRegister(props) {
  return (
    <div className="form-container sign-up">
      <form onSubmit={(e) => props.handleSubmit(e, props.activeForm)}>
        <h1>Create Account</h1>
        <SocialIcons />
        <span>or use your email for registration</span>
        <input
          type="text"
          placeholder="Name"
          name="nama"
          value={props.form.nama}
          onChange={(e) => props.handleInputChange(e, props.activeForm)}
        />
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
        <button>Sign Up</button>
      </form>
    </div>
  );
}
