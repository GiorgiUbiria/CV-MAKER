import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Form from "../components/ExperienceForm";

import style from "./general.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faAngleLeft} />;

const Experience = ({ handleExperienceData, page }: any) => {
  const [experienceData, setExperienceData] = useState(null);
  const navigate = useNavigate();

  const handleReset = () => {
    navigate("/");
    sessionStorage.clear();
  };

  const handleDataFromFields = (data: any) => {
    setExperienceData(data);
  };

  useEffect(() => {
    handleExperienceData(experienceData);
  }, [experienceData]);

  return (
    <div className={style.container}>
      <Link
        to="/"
        onClick={handleReset}
        style={{
          fontSize: "28px",
          color: "#1a1a1a",
          position: "absolute",
          left: "135px",
          top: "55px",
        }}
      >
        {element}
      </Link>
      <div className={style.form}>
        <h1
          style={{
            marginLeft: "250px",
            marginTop: "50px",
            fontSize: "36px",
          }}
        >
          {" "}
          გამოცდილება{" "}
        </h1>
        <span
          style={{
            position: "absolute",
            left: "850px",
            top: "60px",
            fontSize: "28px",
          }}
        >
          {" "}
          {page.current + 1}/3
        </span>
        <hr className={style.general_hr} />
        <Form onDataFromFields={handleDataFromFields} />
      </div>
    </div>
  );
};

export default Experience;
