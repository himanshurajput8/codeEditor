import "./Home.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
    const navigate = useNavigate();
    const onShareClick = () => {
        const id = uuidv4();
        console.log(id);
        navigate(`room/${id}`);
    }

    return (
        <div className="homepage">
            {/* Header */}
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
