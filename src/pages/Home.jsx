import "./Home.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
  const navigate = useNavigate();
  const onShareClick = () => {
    const id = uuidv4();
    console.log(id);
    navigate(`room/${id}`);
  };

  return (
    <div className="home-container">
      <h1 className="home-heading">
        Edit Code Together, in Real-Time
      </h1>
      <p className="home-description">
        Collaborate with your team to write, edit, and debug code — all in one place.
      </p>
      <button className="cssbuttons-io-button "
      onClick={onShareClick} 
      >
        Get started
        <div className="icon">
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>

      <div className="editor-card">
        <div className="editor-content">
          <div className="editor-header">
            <div className="editor-title">
              <div className="language-badge">JS</div>
              <span className="editor-name">Collaborative Editor</span>
            </div>
            <div className="avatars">
              <img src='/boy.png' alt="User 1" className="avatar" />
              <img src="/hacker.png" alt="User 2" className="avatar overlapping-avatar" />
            </div>
          </div>

          <div className="code-block">
            <pre>
              <code>
{`function HelloWorld() {
  const message = 'Hello, world!';
  return (
    <h1>{message}</h1>
  );
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
