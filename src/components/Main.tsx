import "../App.css";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/general_information");
  };

  return (
    <div className="App">
      <img
        src="/redberry_logo.png"
        alt="reberry_logo"
        className="redberry_logo"
      />
      <hr />
      <div className="button_container">
        <button
          className="add_resume_btn"
          type="submit"
          onClick={handleButtonClick}
        >
          {" "}
          რეზიუმეს დამატება{" "}
        </button>
        <img
          src="/background_logo.png"
          alt="background_logo"
          className="background_logo"
        />
      </div>
    </div>
  );
};
