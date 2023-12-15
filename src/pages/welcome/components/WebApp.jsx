import React from "react";
import { Link } from "react-router-dom";

export function WebApp() {
  return (
    <section className="section__container price__container" id="link">
      <p className="section__subheader">aplications</p>
      <h2 className="section__header">Webs Applications</h2>
      <p className="section__description">
        Let's take care of your health from now on
      </p>
      <div className="price__grid">
        <div className="price__card">
          <div class="price__card__ribbon">BETA VERSION</div>
          <h4>BMI PREDICTION</h4>
          <br />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
            quaerat aut quos voluptatibus magni quasi et voluptatem assumenda
            itaque quia! Laboriosam veritatis nesciunt eos.
          </p>
          <p>
            Repellendus, sit consequatur repellat autem totam officiis, odit
            corrupti nisi voluptatem iusto quaerat. Unde et tempore similique
            est temporibus, tenetur quo quod sequi. Illum, sequi delectus!
          </p>
          <Link to="/dashboard">
            <button className="btn">Go</button>
          </Link>
        </div>
        <div className="price__card">
          <div class="price__card__ribbon">COMING SOON</div>
          <h4>DIET PLAN</h4>
          <br />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
            quaerat aut quos voluptatibus magni quasi et voluptatem assumenda
            itaque quia! Laboriosam veritatis nesciunt eos.
          </p>
          <p>
            Repellendus, sit consequatur repellat autem totam officiis, odit
            corrupti nisi voluptatem iusto quaerat. Unde et tempore similique
            est temporibus, tenetur quo quod sequi. Illum, sequi delectus!
          </p>
          <button className="btn">Go</button>
        </div>
        <div className="price__card">
          <div class="price__card__ribbon">COMING SOON</div>
          <h4>MARKETPLACE</h4>
          <br />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
            quaerat aut quos voluptatibus magni quasi et voluptatem assumenda
            itaque quia! Laboriosam veritatis nesciunt eos.
          </p>
          <p>
            Repellendus, sit consequatur repellat autem totam officiis, odit
            corrupti nisi voluptatem iusto quaerat. Unde et tempore similique
            est temporibus, tenetur quo quod sequi. Illum, sequi delectus!
          </p>
          <button className="btn">Go</button>
        </div>
      </div>
    </section>
  );
}
