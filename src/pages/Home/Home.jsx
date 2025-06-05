import "./Home.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { NavContext } from "../../ContextAPI/NavBarContext";
import { useContext } from "react";

const HomePage = () => {
  const {setNav } = useContext(NavContext);
  const navigate = useNavigate();
  const onShareClick = () => {
    setNav(false);
    const id = uuidv4();
    console.log(id);
    navigate(`room/${id}`);
  };


  return (
    <div className="hero-container" id='headerId-Div'>
      <h1 className="hero-title" >
        Share code with developers <span>⚡</span>
      </h1>
      <p className="hero-subtext">
        Codefile is a collaborative online code editor for technical interviews,
        pair programming, teaching... you name it.
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
    <p className="hero-footer">
        No sign up. Free. Forever <span className="heart">❤️</span>
      </p>
    </div>
  );
};

export default HomePage;
