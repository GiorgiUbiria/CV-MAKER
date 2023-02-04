import { Routes, Route } from "react-router-dom";
import { Main } from "./components/Main";
import GeneralInformation from "./components/GeneralInformation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/general_information" element={<GeneralInformation />} />
    </Routes>
  );
}

export default App;
