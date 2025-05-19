import React from "react";
import "./Home.css";

const HomePage = ({ onShareClick }) => {
    return (
        <div className="homepage">
            {/* Header */}
            <header className="header">
                <div className="logo">
                    <span className="logo-icon">x</span>codeshare
                </div>
                <nav className="nav">
                    <a href="#">Pricing</a>
                    <a href="#">Sign Up</a>
                    <a href="#">Log In</a>
                </nav>
            </header>

            {/* Main content */}
            <main className="main">
                <h1 className="title">
                    Share Code in <span className="highlight">Real-time</span> with Developers
                </h1>
                <p className="subtitle">
                    An online code editor for interviews, troubleshooting, teaching & more...
                </p>
                <button className="share-button"  onClick={onShareClick}>Share Code Now</button>
                <p className="share-code">Share code for free.</p>
            </main>
            
        </div>
    );
};

export default HomePage;
