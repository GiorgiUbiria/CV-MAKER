import { Link, useNavigate } from "react-router-dom";
import Resume from "../components/Resume";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import style from "./LastPage.module.css";
import Popup from "../components/Popup";

const element = <FontAwesomeIcon icon={faAngleLeft} />;

const LastPage = () => {
  const navigate = useNavigate();

  const handleReset = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <div className={style.finalForm}>
      <Link
        onClick={handleReset}
        to="/"
        style={{
          fontSize: "28px",
          color: "#1a1a1a",
          position: "absolute",
          left: "135px",
          top: "50px",
        }}
      >
        {element}
      </Link>
      <Popup />

      <div className={style.cv}>
        <Resume />
      </div>
    </div>
  );
};

export default LastPage;
