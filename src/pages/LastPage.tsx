import { Link } from "react-router-dom";
import Resume from "../components/Resume";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import style from "./LastPage.module.css";
import Popup from "../components/Popup";

const element = <FontAwesomeIcon icon={faAngleLeft} />;

const LastPage = (props: any) => {
  const { fieldValues, experienceData, educationData } = props;

  const handleReset = () => {
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
        <Resume
          fieldValues={fieldValues}
          experienceData={experienceData}
          educationData={educationData}
        />
      </div>
    </div>
  );
};

export default LastPage;
