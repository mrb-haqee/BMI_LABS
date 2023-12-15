import React from "react";
import { Welcome as img } from "../../images/image";

export function About() {
  return (
    <section className="section__container experience__container" id="about">
      <div className="experience__image">
        <img src={img.experience} alt="experience" />
      </div>
      <div className="experience__content">
        <p className="section__subheader">ABOUT BMI</p>
        <h2 className="section__header">WHAT IS Body Mass Index (BMI)?</h2>
        <p className="section__description">
          BMI is Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex
          maiores quas nemo fugit, deserunt id, in cum eveniet, illo ducimus
          culpa odio ratione ad laboriosam?
        </p>
        <a href="https://en.wikipedia.org/wiki/Body_mass_index" target="_blank">
          <button className="btn">Read More</button>
        </a>
      </div>
    </section>
  );
}
