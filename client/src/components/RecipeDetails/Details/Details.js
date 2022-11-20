import React from "react";
import "./Details.css";

const Details = ({ image, name, health_score, summary, diets, steps }) => {
  const url =
    "https://media.istockphoto.com/id/530494050/photo/salad-board.jpg?s=612x612&w=0&k=20&c=ZKuIcCTN4XDRlFe-s16aZIJJCjDU13KR01WEfq-Yskg=";

  return (
    <div className="details-container">
      <div className="details-img">
        <img src={image} alt="Holi aqui toy" />
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
          {steps.map((stp) => (
            <div className="details-step">
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
            {diets.map((dt) => (
              <li>{dt}</li>
            ))}
          </ul>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Details;
