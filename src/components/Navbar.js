import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for Navbar styling
import "./static/styles.css"; // Import your custom styles
import "./static/navbar.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


// Navbar component
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          WERRASOFT NLP TOOL
        </a>


        <div className="Navbar-buttons">
        <Link to="/" className="Navbar-link-button">NER</Link>
        <Link to="/sim" className="Navbar-link-button">Sim</Link>
      </div>

      </div>

    </nav>
  );
};

export default Navbar;
