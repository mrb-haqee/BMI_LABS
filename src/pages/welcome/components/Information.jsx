import React from "react";

export function Information() {
  return (
    <section className="customisation">
      <div className="section__container customisation__container">
        <p
          className="section__subheader"
          style={{
            color: "white",
          }}
        >
          bmi info
        </p>
        <h2 className="section__header">WHO INFORMATION!!!</h2>
        <p className="section__description">
          Worldwide, at least 2.8 million people die each year as a result of
          being overweight or obese, and an estimated 35.8 million (2.3%) of
          global DALYs are caused by overweight or obesity
        </p>
        <div className="customisation__grid">
          <div className="customisation__card">
            <h4>{"<"}18.4</h4>
            <p>Underweight</p>
          </div>
          <div className="customisation__card">
            <h4>{"<"}24.9</h4>
            <p>Normal</p>
          </div>
          <div className="customisation__card">
            <h4>{"<"}29.9</h4>
            <p>Overweight</p>
          </div>
          <div className="customisation__card">
            <h4>{">"}30</h4>
            <p>Obese</p>
          </div>
        </div>
      </div>
    </section>
  );
}
