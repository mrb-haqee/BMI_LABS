import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Typed from "typed.js";

import "./css/welcome.css";
import { Header } from "./components/Header";
import { About } from "./components/About";
import { ManageBMI } from "./components/ManageBMI";
import { Information } from "./components/Information";
import { WebApp } from "./components/WebApp";

export default function Welcome() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const options = {
      strings: ["Prediction", "Diet plan", "Marketplace"],
      typeSpeed: 80,
      backSpeed: 25,
      loop: true,
      loopCount: Infinity,
    };

    const typed = new Typed("#typed", options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Welcome</title>
        <link rel="icon" href="" />
      </Helmet>

      <Header isOpen={isOpen} toggleNav={toggleNav} closeNav={closeNav} />

      <About />

      <ManageBMI />

      <Information />

      <WebApp />

      <div className="footer__bar">
        Copyright © 2023 Web Design MRB. All rights reserved.
      </div>
    </>
  );
}
