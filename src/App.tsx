import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import GeneralInformation from "./pages/GeneralInformation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/general_information" element={<GeneralInformation />} />
    </Routes>
  );
}

export default App;
