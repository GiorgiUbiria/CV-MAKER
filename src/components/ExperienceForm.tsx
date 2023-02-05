import { useNavigate } from "react-router-dom";
import ExperienceFormFields from "./ExperienceFormFields";

import Button from "@mui/material/Button";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  onDataFromFields: (data: any) => void;
}

const Form: React.FC<FormProps> = ({ onDataFromFields }: any) => {
  const navigate = useNavigate();

  const handleForwardButtonClick = () => {
    navigate("/education");
  };

  const handleBackButtonClick = () => {
    navigate("/general_information");
  };

  return (
    <div
      className="experience_form"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <ExperienceFormFields onDataFromFields={onDataFromFields} />
      <div
        className="buttons"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Button
          style={{
            alignSelf: "flex-start",
            marginLeft: "240px",
            marginTop: "30px",
          }}
        >
          გამოცდილების დამატება
        </Button>
        <div
          className="navigation_buttons"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "50px",
          }}
        >
          <Button
            variant="contained"
            style={{
              width: "15%",
              backgroundColor: "#6B40E3",
              marginBottom: "20px",
              marginLeft: "250px",
            }}
            onClick={handleBackButtonClick}
          >
            დაბრუნება
          </Button>
          <Button
            variant="contained"
            style={{
              width: "15%",
              backgroundColor: "#6B40E3",
              marginBottom: "20px",
              marginRight: "260px",
            }}
            onClick={handleForwardButtonClick}
          >
            შემდეგი
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
