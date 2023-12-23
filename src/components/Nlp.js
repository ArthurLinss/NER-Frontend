import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./static/styles.css";

const baseURL = "http://127.0.0.1:8000/";
const textProcessingEndpoint = baseURL + "process_text";
const dropdownValuesEndpoint = baseURL + "dropdown_values";
const nerLabelsEndpoint = baseURL + "get_ner_labels"; // New endpoint for NER labels

function YourReactComponent() {
  const defaultText = "Hello, I am Maria and I am from South Africa.";
  const [resultVisible, setResultVisible] = useState(false);
  const [resultText, setResultText] = useState("");
  const [inputText, setInputText] = useState(defaultText);
  const [styleValue, setStyleValue] = useState("ent"); // Default value 'ent'
  const [nerLabels, setNerLabels] = useState([]); // State to hold NER labels
  const [isHelpVisible, setIsHelpVisible] = useState(false); // State to toggle help visibility

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await fetch(textProcessingEndpoint, {
      method: "POST",
      body: formData,
    });
    const result = await response.text();
    setResultText(result);
    setResultVisible(true);
  }

  const mapping = {
    ent: "Entity",
    dep: "Dependency",
  };

  async function fetchDropdownValues() {
    const response = await fetch(dropdownValuesEndpoint);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();

    // Update dropdown values
    // Assuming data.dropdownValues is an array of strings
    // Modify according to the actual API response structure
    const styleSelect = document.getElementById("styleSelect");
    styleSelect.innerHTML = "";
    data.dropdownValues.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = mapping[value] || value;
      styleSelect.appendChild(option);
    });
  }

  async function fetchNerLabels() {
    const response = await fetch(nerLabelsEndpoint, {
      method: "POST", // Assuming the API endpoint also accepts a POST request
    });
    const data = await response.json();
    setNerLabels(data); // Update state with the fetched NER labels
  }

  // Call fetchDropdownValues on component mount
  useEffect(() => {
    fetchDropdownValues();
    fetchNerLabels();
  }, []);

  return (
    <div className="container">
      <h1 className="custom-heading"> Named Entity Recognition </h1>
      <form onSubmit={handleSubmit} id="textForm">
        <div className="mb-3">
          <textarea className="form-control" id="inputText" name="input_text" rows="3" placeholder="Enter Text" value={inputText} onChange={(e) => setInputText(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <select className="form-select" id="styleSelect" name="style" value={styleValue} onChange={(e) => setStyleValue(e.target.value)}>
            <option value="ent">Entity</option>
            <option value="dep">Dependency</option>
          </select>
        </div>
        <div className="mb-3">
          <input type="submit" className="btn btn-primary" value="Submit" id="submitButton" />
        </div>
      </form>

      {resultVisible && (
        <h2 className="custom-heading result" id="resultHeading">
          Result:
        </h2>
      )}
      {resultVisible && (
        <div className="rendered" id="renderedText" dangerouslySetInnerHTML={{ __html: resultText }}>
          {/* Render HTML content */}
        </div>
      )}

      <button onClick={() => setIsHelpVisible(!isHelpVisible)} className="btn btn-primary mb-3">
        Label Help
      </button>

      {/* NER Labels visibility controlled by isHelpVisible state */}
      {isHelpVisible && (
        <div className="mb-3">
          <h3>NER Label Description:</h3>
          <ul>
            {nerLabels.map((label, index) => (
              <li key={index}>{label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default YourReactComponent;
