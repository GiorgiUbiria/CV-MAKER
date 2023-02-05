import { useNavigate } from "react-router-dom";
import EducationTemplate from "./EducationTemplate";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  onDataFromFields: (data: any) => void;
}

const initialValues = {
  institute: "",
  degree: "",
  due_date: "",
  description: "",
};

const Form: React.FC<FormProps> = ({ onDataFromFields }: any) => {
  const [education, setEducation] = useState(() => {
    const educationData = localStorage.getItem("education");
    return educationData
      ? JSON.parse(educationData)
      : [{ id: 0, values: initialValues }];
  });

  const addForm = () => {
    setEducation([
      ...education,
      { id: education.length, values: initialValues },
    ]);
  };

  const navigate = useNavigate();

  const handleForwardButtonClick = () => {
    navigate("/cvs");
  };

  const handleBackButtonClick = () => {
    navigate("/experience");
  };

  const handleChange = (event: any, formId: number) => {
    const newForms = education.map((form: any) => {
      if (form.id === formId) {
        return {
          ...form,
          values: {
            ...form.values,
            [event.target.name.split("-")[0]]: event.target.value,
          },
        };
      }
      return form;
    });
    setEducation(newForms);
    onDataFromFields(education);
  };

  useEffect(() => {
    localStorage.setItem("education", JSON.stringify(education));
    onDataFromFields(education);
  }, [education]);

  return (
    <div
      className="experience_form"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {education.map((form: any) => (
        <>
          <EducationTemplate
            key={form.id}
            id={form.id}
            onChange={(event: any) => handleChange(event, form.id)}
            values={form.values}
          />
          <hr style={{ marginTop: "15px" }} />
        </>
      ))}

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
          onClick={addForm}
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
