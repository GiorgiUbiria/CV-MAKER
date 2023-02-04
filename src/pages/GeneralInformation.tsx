import { Link } from "react-router-dom";
import Form from "../components/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import "./GeneralInformation.css";

const element = <FontAwesomeIcon icon={faAngleLeft} />;

const GeneralInformation = () => {
  return (
    <>
      <Link
        to="/"
        style={{
          fontSize: "28px",
          color: "#1a1a1a",
          position: "absolute",
          left: "15px",
          top: "40px",
        }}
      >
        {element}
      </Link>
      <div className="form">
        <h1
          style={{
            marginLeft: "100px",
            marginTop: "30px",
            fontSize: "48px",
          }}
        >
          {" "}
          პირადი ინფორმაცია{" "}
        </h1>
        <hr />
        <Form />
      </div>
      <div className="cv"></div>
    </>
  );
};

export default GeneralInformation;
