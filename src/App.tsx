import { useRef, useState } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import { Main } from "./pages/Main";
import GeneralInformation from "./pages/GeneralInformation";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import LastPage from "./pages/LastPage";

import CVDisplay from "./components/CVDisplay";

import "./App.css";

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
    <div className="app">
      <div className="routes" style={{ width: "60%" }}>
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
          <Route
            path="/cvs"
            element={
              <LastPage
                fieldValues={handleData}
                experienceData={handleExperienceData}
                educationData={handleEducationData}
              />
            }
          />
        </Routes>
      </div>
      {location.pathname !== "/" && location.pathname !== "/cvs" && (
        <div className="cv">
          <CVDisplay
            fieldValues={handleData}
            experienceData={handleExperienceData}
            educationData={handleEducationData}
          />
        </div>
      )}
    </div>
  );
}

export default App;
