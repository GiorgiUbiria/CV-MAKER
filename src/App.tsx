import { Routes, Route } from "react-router-dom";

import { Main } from "./pages/Main";
import GeneralInformation from "./pages/GeneralInformation";
import Experience from "./pages/Experience";
import Education from "./pages/Education";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/general_information" element={<GeneralInformation />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/education" element={<Education />} />
    </Routes>
  );
}

export default App;
