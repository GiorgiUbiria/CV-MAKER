import { Link } from "react-router-dom";
import Form from "../components/Form";

import "./GeneralInformation.css";

const GeneralInformation = () => {
  return (
    <>
      <Link to="/" />
      <div className="form">
        <h1
          style={{ marginLeft: "100px", marginTop: "30px", fontSize: "48px" }}
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
