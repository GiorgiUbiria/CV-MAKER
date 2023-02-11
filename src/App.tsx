import { useRef, useState } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import { Main } from "./pages/Main";
import GeneralInformation from "./pages/GeneralInformation";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import LastPage from "./pages/LastPage";

import CVDisplay from "./components/CVDisplay";

import style from "./App.module.css";

function App() {
  const [handleData, setHandleData] = useState();
  const [handleExperienceData, setHandleExperienceData] = useState();
  const [handleEducationData, setHandleEducationData] = useState();

  const pageNumber = useRef(1);

  const location = useLocation();

  const handleDataFromFields = (data: any) => {
    setHandleData(data);
  };

  const handleDataFromExperience = (data: any) => {
    setHandleExperienceData(data);
  };

  const handleDataFromEducation = (data: any) => {
    setHandleEducationData(data);
  };

  return (
    <div className={style.app}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/general_information"
          element={
            <GeneralInformation
              handleData={handleDataFromFields}
              page={pageNumber}
            />
          }
        />
        <Route
          path="/experience"
          element={
            <Experience
              handleExperienceData={handleDataFromExperience}
              page={pageNumber}
            />
          }
        />
        <Route
          path="/education"
          element={
            <Education
              handleEducationData={handleDataFromEducation}
              page={pageNumber}
            />
          }
        />
        <Route path="/cvs" element={<LastPage />} />
      </Routes>
      {location.pathname !== "/" && location.pathname !== "/cvs" && (
        <div className={style.cv}>
          <CVDisplay
            fieldValues={handleData}
            experienceData={handleExperienceData}
            educationData={handleEducationData}
          />
          <img
            src="/cv-logo.png"
            alt="cv_logo"
            style={{
              width: "50px",
              height: "auto",
              position: "fixed",
              bottom: "10px",
              right: "600px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
