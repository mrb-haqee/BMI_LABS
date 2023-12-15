import React from "react";
import { Link } from "react-router-dom";
import { Welcome as img } from "../../images/image";

export function Header(props) {
  return (
    <header className="header" id="home">
      <nav>
        <div className="nav__bar">
          <div className="logo nav__logo">
            <Link to="/">
              <img src={img.logo} alt="logo" />
            </Link>
          </div>
          <div
            className="nav__menu__btn"
            id="menu-btn"
            onClick={props.toggleNav}
          >
            <i className={props.isOpen ? "ri-close-line" : "ri-menu-3-line"} />
          </div>
        </div>
        <ul
          className={`nav__links ${props.isOpen ? "open" : ""}`}
          id="nav-links"
          onClick={props.closeNav}
        >
          <li>
            <a href="#home">HOME</a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#tips">TIPS</a>
          </li>
          <li>
            <a href="#link">LINK</a>
          </li>
          <Link to="/auth">
            <button className="btn">Login</button>
          </Link>
        </ul>
      </nav>
      <div className="section__container header__container">
        <div className="header__content">
          <h1>
            Welcome to BMI Labs
            <br />
            <span id="typed" />
          </h1>
          <h2 />
          <div className="header__btn">
            <a href="#link">
              <button className="btn">GO TO APP</button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
