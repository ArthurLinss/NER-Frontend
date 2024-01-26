import React, { useState } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./static/styles.css";
import "./static/navbar.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const baseURL = "http://127.0.0.1:5000/";

const Sim = ({ defaultText1, defaultText2 }) => {
  let ex_text_1 = "German is the official and predominant spoken language in Germany. It is one of 24 official and working languages of the European Union, and one of the three procedural languages of the European Commission. German is the most widely spoken first language in the European Union, with around 100 million native speakers.";

  let ex_text_2 = "German is the official spoken language in Germany. It is one of 24 official and working languages of the European Union, and one of the three procedural languages of the European Commission.";




  const [textInput1, setTextInput1] = useState(defaultText1 || ex_text_1);
  const [textInput2, setTextInput2] = useState(defaultText2 || ex_text_2);
  const [result, setResult] = useState(null);

  const handleCalculate = async () => {
    try {
      const response = await fetch(baseURL + "sum_text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text1: textInput1,
          text2: textInput2,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      } else {
        console.error("Failed to calculate sum");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="custom-heading">Text Similarities</h1>

        <div className="mb-3">
          <label htmlFor="textInput1" className="form-label">
            Text Input 1:
          </label>
          <textarea
            className="form-control"
            id="textInput1"
            value={textInput1}
            onChange={(e) => setTextInput1(e.target.value)}
            rows="5"  // Adjust the number of rows as needed
          />
        </div>

        <div className="mb-3">
          <label htmlFor="textInput2" className="form-label">
            Text Input 2:
          </label>
          <textarea
            className="form-control"
            id="textInput2"
            value={textInput2}
            onChange={(e) => setTextInput2(e.target.value)}
            rows="5"  // Adjust the number of rows as needed
          />
        </div>

        <button className="btn btn-primary" onClick={handleCalculate}>
          Get Similarity
        </button>

        {result !== null && (
          <div className="mt-3">
            <p>Similar Words: {result}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

Sim.propTypes = {
  defaultText1: PropTypes.string,
  defaultText2: PropTypes.string,
};

export default Sim;
