import { useState } from "react";
import { Link } from "react-router-dom";

import Form from "../components/ExperienceForm";
import CVDisplay from "../components/CVDisplay";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import "./GeneralInformation.css";

const element = <FontAwesomeIcon icon={faAngleLeft} />;

const Experience = () => {
  const [experienceData, setExperienceData] = useState(null);

  const handleDataFromFields = (data: any) => {
    setExperienceData(data);
  };

  return (
    <div className="container">
      <Link
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
      <div className="form">
        <h1
          style={{
            marginLeft: "250px",
            marginTop: "30px",
            fontSize: "48px",
          }}
        >
          {" "}
          გამოცდილება{" "}
        </h1>
        <hr className="general_hr" />
        <Form onDataFromFields={handleDataFromFields} />
      </div>
      <div className="cv">
        <CVDisplay experienceData={experienceData} />
      </div>
    </div>
  );
};

export default Experience;
