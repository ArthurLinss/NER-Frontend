import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for Navbar styling
import './static/styles.css'; // Import your custom styles

// Footer component
const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container text-center">
        <span className="text-muted"> Werrasoft &copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;