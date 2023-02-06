import { Link} from "react-router-dom";
import CVDisplay from "../components/CVDisplay";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import "./Resume.css";

const element = <FontAwesomeIcon icon={faAngleLeft} />;

const Resume = (props: any) => {
  const { fieldValues, experienceData, educationData } = props;

  const handleReset = () => {
    localStorage.clear();
  };

  return (
    <>
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
      <CVDisplay
        fieldValues={fieldValues}
        experienceData={experienceData}
        educationData={educationData}
      />
    </>
  );
};

export default Resume;
