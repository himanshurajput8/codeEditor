import React from "react";
import "./SignUp.css";

const NoSignupUI = () => {
  return (
    <>
    <div className="container">

      <div className="content">
        <div className="left">
          <h1>No sign up needed, just jump right in!</h1>
          <p>
            Codefile doesn't require you to create an account or sign in to get started.
          </p>
        </div>
        <div className="right">
          <img src="./img1.jpeg" alt="Verification UI" className="preview-image" />
        </div>
      </div>
    </div>
    </>
  );
};

export default NoSignupUI;
