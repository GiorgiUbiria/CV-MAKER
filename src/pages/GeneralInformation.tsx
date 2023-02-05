import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Form from "../components/GeneralForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faAngleLeft} />;

const GeneralInformation = ({ handleData }: any) => {
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
            marginTop: "30px",
            fontSize: "48px",
          }}
        >
          {" "}
          პირადი ინფორმაცია{" "}
        </h1>
        <hr className="general_hr" />
        <Form onDataFromFields={handleDataFromFields} />
      </div>
    </div>
  );
};

export default GeneralInformation;
