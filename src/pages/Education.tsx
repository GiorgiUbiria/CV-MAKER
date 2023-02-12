import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Form from "../components/EducationForm";

import style from "./general.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faAngleLeft} />;

const Education = ({ handleEducationData, page }: any) => {
  const [educationData, setEducationData] = useState(null);

  const handleDataFromFields = (data: any) => {
    setEducationData(data);
  };

  useEffect(() => {
    handleEducationData(educationData);
  }, [educationData]);

  return (
    <div className={style.container}>
      <Link
        to="/"
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
          განათლება{" "}
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
          {page.current + 2}/3{" "}
        </span>
        <hr className={style.general_hr} />
        <Form onDataFromFields={handleDataFromFields} />
      </div>
    </div>
  );
};

export default Education;
