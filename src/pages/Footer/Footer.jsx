import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Newsletter */}
        <div className="footer-newsletter">
          <h2>Subscribe to our Newsletter</h2>
          <p>Stay updated on features and releases.</p>
          <form onSubmit={(e) => e.preventDefault()} className="footer-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="footer-input"
              required
            />
            <button type="submit" className="footer-button">
              Subscribe
            </button>
          </form>
        </div>

        {/* Navigation links */}
        <div className="footer-links">
          <a href="#features" className="footer-link">Features</a>
          <a href="#pricing" className="footer-link">Pricing</a>
          <a href="#docs" className="footer-link">Docs</a>
          <a href="#about" className="footer-link">About</a>
          <a href="#contact" className="footer-link">Contact</a>
          <a href="#privacy" className="footer-link">Privacy</a>
          <a href="#terms" className="footer-link">Terms</a>
        </div>

        {/* Social icons */}
        <div className="footer-icons">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-icon-link">
            {/* GitHub Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 40 40">
                <path fill="#b6c9d6" d="M38.5,20c0,10.299-8.391,18.5-18.5,18.5C9.892,38.5,1.5,30.299,1.5,20S9.701,1.5,20,1.5 S38.5,9.701,38.5,20z"></path><path fill="#fff" d="M33.171,19.24c0,2.306-1.191,5.51-3.148,7.102c-1.582,1.289-3.672,1.695-6.034,1.823 c0.888,0.539,1.479,1.515,1.479,2.629v7.636C23.979,38.8,22.429,39,20.832,39c-1.582,0-3.127-0.195-4.606-0.565v-5.017 c-0.642,0.2-1.484,0.318-2.568,0.262c-3.595-0.19-4.108-2.372-4.683-3.913c-0.58-1.541-2.378-1.736-2.121-2.372 c1.241-0.426,2.215-0.02,2.874,0.482c0.523,0.398,0.887,0.961,1.131,1.571c0.279,0.697,1.02,1.86,2.86,1.86 c1.299,0,2.069-0.303,2.511-0.601c0.026-1.089,0.621-2.033,1.494-2.552c-2.506-0.159-4.704-0.632-6.321-2.039 c-1.797-1.561-2.881-4.678-2.881-6.876c0-1.833,0.755-4.093,2.049-5.515c0.041-0.041,0.077-0.087,0.128-0.128 c-0.298-0.894-0.642-2.66,0.195-4.822c2.49-0.046,4.457,1.315,5.258,1.972c1.448-0.334,3.03-0.493,4.694-0.493 c1.705,0,3.333,0.149,4.806,0.493c0.801-0.657,2.773-2.018,5.258-1.967c0.873,2.249,0.467,4.072,0.164,4.925 C32.401,15.229,33.171,17.391,33.171,19.24z"></path><path fill="#788b9c" d="M20,39C9.523,39,1,30.477,1,20C1,9.346,9.346,1,20,1s19,8.346,19,19C39,30.477,30.477,39,20,39z M20,2C9.907,2,2,9.907,2,20c0,9.925,8.075,18,18,18s18-8.075,18-18C38,9.907,30.093,2,20,2z"></path>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-icon-link">
            {/* Twitter Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 24 24">
              <path d="M23.3 4.8c-.8.4-1.7.6-2.6.8.9-.5 1.6-1.4 2-2.3-.8.5-1.8.9-2.8 1.1-1.4-1.5-3.7-1.5-5.1 0-1 1-1.3 2.4-.9 3.7-3.3-.2-6.3-1.7-8.3-4.1-.3.6-.4 1.2-.4 1.9 0 1.3.7 2.5 1.7 3.2-.7 0-1.3-.2-1.9-.5v.1c0 1.8 1.3 3.3 3.1 3.7-.5.1-1 .2-1.5.2-.3 0-.7 0-1-.1.7 2.2 2.6 3.7 4.9 3.7-1.8 1.4-4 2.1-6.3 2.1H2c2.3 1.4 5 2.1 7.7 2.1 9.2 0 14.2-7.6 14.2-14.2 0-.2 0-.5 0-.7.9-.7 1.6-1.5 2.2-2.4z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-icon-link">
            {/* LinkedIn Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="20" width="20" viewBox="0 0 24 24">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.6-1.1 2.1-2.2 4.3-2.2C22.2 8 24 10.1 24 14.1V24h-4v-8c0-1.9-.7-3.1-2.5-3.1s-2.9 1.6-2.9 3.1V24h-4V8z"/>
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          © {new Date().getFullYear()} CodeCollab. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
