import { useState, Fragment } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faXmark} />;

const Popup = () => {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <Fragment>
      {showPopup && (
        <div
          className="popup"
          style={{
            width: "350px",
            height: "100px",
            backgroundColor: "white",
            position: "fixed",
            top: "10px",
            right: "20px",
            borderRadius: "7px",
            boxShadow: "2px 2px 6px grey",
            display: "flex",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "24px", marginLeft: "10px" }}>
            რეზიუმე წარმატებით გაიგზავნა
          </p>
          <button
            onClick={() => setShowPopup(false)}
            style={{
              position: "relative",
              right: "20px",
              bottom: "20px",
              backgroundColor: "white",
              border: "none",
            }}
          >
            {element}
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default Popup;
