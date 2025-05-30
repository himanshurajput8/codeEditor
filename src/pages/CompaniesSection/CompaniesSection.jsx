import React from "react";
import "./CompaniesSection.css";

const CompaniesSection = () => {
  return (
    <div className="companies-section">
      <p className="companies-heading">
        Used by software engineers at companies and universities we respect and admire.
      </p>
      <div className="company-logos">
        <img src="/public/logos.png" alt="" />        
      </div>

      <div className="features">
        <div className="feature">
          <h2>Code with your team</h2>
          <p>
            Open a Codeshare editor, write or copy code, then share it with friends and colleagues.
            Pair program and troubleshoot together.
          </p>
          <button className="outlined-btn">Hack Together</button>
        </div>
        <div className="feature">
          <h2>Interview developers</h2>
          <p>
            Set coding tasks and observe in real-time when interviewing remotely or in person.
            Nobody likes writing code on a whiteboard.
          </p>
          <button className="outlined-btn">Start An Interview</button>
        </div>
        <div className="feature">
          <h2>Teach people to program</h2>
          <p>
            Share your code with students and peers then educate them. Universities and colleges
            around the world use Codeshare every day.
          </p>
          <button className="outlined-btn">Teach Code</button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesSection;
