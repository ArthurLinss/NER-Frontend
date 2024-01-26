import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./static/styles.css";

const baseURL = "http://127.0.0.1:5000/";
const textProcessingEndpoint = baseURL + "process_text";
const dropdownValuesEndpoint = baseURL + "dropdown_values";
const nerLabelsEndpoint = baseURL + "get_ner_labels";

class YourReactComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultVisible: false,
      resultText: "",
      inputText: "Hello, I am Maria and I am from South Africa, Africa. I am working 50% of my time at Apple as Scientist. Yesterday, I visited the third Super Bowl.",
      styleValue: "ent",
      nerLabels: [],
      isHelpVisible: false
    };
  }

  async componentDidMount() {
    await this.fetchDropdownValues();
    await this.fetchNerLabels();
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await fetch(textProcessingEndpoint, {
      method: "POST",
      body: formData,
    });
    const result = await response.text();
    this.setState({
      resultText: result,
      resultVisible: true
    });
  };

  fetchDropdownValues = async () => {
    const response = await fetch(dropdownValuesEndpoint);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();

    const styleSelect = document.getElementById("styleSelect");
    styleSelect.innerHTML = "";
    data.dropdownValues.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = this.mapping[value] || value;
      styleSelect.appendChild(option);
    });
  };

  fetchNerLabels = async () => {
    const response = await fetch(nerLabelsEndpoint, {
      method: "POST",
    });
    const data = await response.json();
    this.setState({
      nerLabels: data
    });
  };

  mapping = {
    ent: "Entity",
    dep: "Dependency",
  };

  render() {
    const {
      resultVisible,
      resultText,
      inputText,
      styleValue,
      nerLabels,
      isHelpVisible
    } = this.state;

    return (
      <div className="container">
        <h1 className="custom-heading"> Named Entity Recognition </h1>
        <form onSubmit={this.handleSubmit} id="textForm">
          <div className="mb-3">
            <textarea
              className="form-control"
              id="inputText"
              name="input_text"
              rows="3"
              placeholder="Enter Text"
              value={inputText}
              onChange={(e) => this.setState({ inputText: e.target.value })}
            ></textarea>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              id="styleSelect"
              name="style"
              value={styleValue}
              onChange={(e) => this.setState({ styleValue: e.target.value })}
            >
              <option value="ent">Entity</option>
              <option value="dep">Dependency</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              type="submit"
              className="btn btn-primary"
              value="Submit"
              id="submitButton"
            />
          </div>
        </form>

        {resultVisible && (
          <h2 className="custom-heading result" id="resultHeading">
            Result:
          </h2>
        )}
        {resultVisible && (
          <div
            className="rendered"
            id="renderedText"
            dangerouslySetInnerHTML={{ __html: resultText }}
          ></div>
        )}

        <button
          onClick={() => this.setState({ isHelpVisible: !isHelpVisible })}
          className="btn btn-primary mb-3"
        >
          Label Help
        </button>

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
}

export default YourReactComponent;
