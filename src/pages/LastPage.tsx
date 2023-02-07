import { Link } from "react-router-dom";
import Resume from "../components/Resume";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import "./Resume.css";

const element = <FontAwesomeIcon icon={faAngleLeft} />;

const LastPage = (props: any) => {
  const { fieldValues, experienceData, educationData } = props;

  const handleReset = () => {
    localStorage.clear();
  };

  return (
    <div style={{}}>
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
      <Resume
        fieldValues={fieldValues}
        experienceData={experienceData}
        educationData={educationData}
      />
    </div>
  );
};

export default LastPage;
