import React from "react";
import "./Details.css";

const Details = ({ image, name, health_score, summary, diets, steps }) => {
  return (
    <div className="details-container">
      <div className="details-img">
        <img src={image} alt="recipe-img" />
        <h2>Health Score: {health_score}</h2>
      </div>
      <div className="details-info">
        <h1>{name}</h1>
        <hr></hr>
        <div
          className="deatils-info-summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        ></div>

        <div className="details-info-steps-cont">
          <h2>Steps</h2>
          {steps.map((stp, idx) => (
            <div key={`stp${idx}`} className="details-step">
              <p>
                <strong>{`${stp.number}. `}</strong>
                {`${stp.step}`}
              </p>
            </div>
          ))}
        </div>

        <div className="details-info-diets">
          <h2>Diets</h2>
          <p>{`You can add ${name} to your daily recipes if you're following one of this diets: `}</p>
          <ul>
            {diets.map((dt, idx) => (
              <li key={`li${idx}`}>{dt}</li>
            ))}
          </ul>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Details;
