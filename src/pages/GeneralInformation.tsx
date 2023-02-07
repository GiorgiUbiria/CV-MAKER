import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Form from "../components/GeneralForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faAngleLeft} />;

const GeneralInformation = ({ handleData, page }: any) => {
  const [dataFromField, setDataFromField] = useState(null);

  const handleDataFromFields = (data: any) => {
    setDataFromField(data);
  };

  useEffect(() => {
    handleData(dataFromField);
  }, [dataFromField]);

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
            marginTop: "50px",
            fontSize: "36px",
          }}
        >
          {" "}
          პირადი ინფორმაცია{" "}
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
          {page.current}/3{" "}
        </span>
        <hr className="general_hr" />
        <Form onDataFromFields={handleDataFromFields} />
      </div>
    </div>
  );
};

export default GeneralInformation;
