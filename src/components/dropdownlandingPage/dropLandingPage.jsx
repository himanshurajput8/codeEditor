import React from "react";
import "./dropLandingPage.css";

const DropLandingPageComp = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="left">
          <h1>Syntax highlighting in your preferred language.</h1>
          <p>
            Write in your favorite language.
            From JS to Python, pick the syntax that fits your code.
          </p>
        </div>
        <div className="right">
          <img src="./img3.jpeg" alt="Verification UI" className="preview-image" />
        </div>
      </div>
    </div>
  );
};

export default DropLandingPageComp;
