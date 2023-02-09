import { useNavigate } from "react-router-dom";

import style from "./main.module.css";

export const Main = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/general_information");
  };

  return (
    <div className={style.App}>
      <img
        src="/redberry_logo.png"
        alt="reberry_logo"
        className={style.redberry_logo}
      />
      <hr className={style.main_hr} />
      <div className={style.button_container}>
        <button
          className={style.add_resume_btn}
          type="submit"
          onClick={handleButtonClick}
          style={{ cursor: "pointer" }}
        >
          {" "}
          რეზიუმეს დამატება{" "}
        </button>
        <img
          src="/background_logo.png"
          alt="background_logo"
          className={style.background_logo}
        />
      </div>
    </div>
  );
};
