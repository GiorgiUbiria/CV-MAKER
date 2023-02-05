import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Main } from "./pages/Main";
import GeneralInformation from "./pages/GeneralInformation";
import Experience from "./pages/Experience";
import Education from "./pages/Education";

import CVDisplay from "./components/CVDisplay";

import "./App.css";

function App() {
  const [handleData, setHandleData] = useState();
  const [handleExperienceData, setHandleExperienceData] = useState();

  const location = useLocation();

  const handleDataFromFields = (data: any) => {
    setHandleData(data);
  };

  const handleDataFromExperience = (data: any) => {
    setHandleExperienceData(data);
  };

  return (
    <div className="app">
      <div className="routes">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/general_information"
            element={<GeneralInformation handleData={handleDataFromFields} />}
          />
          <Route
            path="/experience"
            element={
              <Experience handleExperienceData={handleDataFromExperience} />
            }
          />
          <Route path="/education" element={<Education />} />
        </Routes>
      </div>
      {location.pathname !== "/" && (
        <div className="cv">
          <CVDisplay
            fieldValues={handleData}
            experienceData={handleExperienceData}
          />
        </div>
      )}
    </div>
  );
}

export default App;
