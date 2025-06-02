import React from "react";
import "./Invite.css";

const InviteUi = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="left">
          <img src="./img2.png" alt="Verification UI" className="preview-image" />
        </div>
        <div className="right">
          <h1>Share the link to invite people.</h1>
          <p>
            Share the file link with your colleague to start editing it together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InviteUi;
