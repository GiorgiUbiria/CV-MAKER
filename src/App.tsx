import { Routes, Route } from "react-router-dom";

import { Main } from "./pages/Main";
import GeneralInformation from "./pages/GeneralInformation";
import Experience from "./pages/Experience";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/general_information" element={<GeneralInformation  />} />
      <Route path="/experience" element={<Experience />} />
    </Routes>
  );
}

export default App;
