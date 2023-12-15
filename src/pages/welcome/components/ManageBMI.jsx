import React from "react";
import { Welcome as img } from "../../images/image";

export function ManageBMI() {
  return (
    <section className="service" id="tips">
      <div className="section__container service__container">
        <p className="section__subheader">how to manage bmi?</p>
        <h2 className="section__header">Best tips to Manage BMI</h2>
        <p className="section__description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </p>
        <div className="service__grid">
          <div className="service__card">
            <img src={img.service1} alt="service" />
            <h4>Maintain a healthy diet</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit,
              molestiae!
            </p>
          </div>
          <div className="service__card">
            <img src={img.service2} alt="service" />
            <h4>Exercise regularly</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit,
              molestiae!
            </p>
          </div>
          <div className="service__card">
            <img src={img.service3} alt="service" />
            <h4>Get enough Rest</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit,
              molestiae!
            </p>
          </div>
          <div className="service__card">
            <img src={img.service4} alt="service" />
            <h4>Always stay Happy</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit,
              molestiae!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
