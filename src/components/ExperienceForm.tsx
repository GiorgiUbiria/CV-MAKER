import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FormTemplate from "./FormTemplate";

import Button from "@mui/material/Button";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  onDataFromFields: (data: any) => void;
}

const initialValues = {
  position: "",
  employer: "",
  start_date: "",
  due_date: "",
  description: "",
};

const Form: React.FC<FormProps> = ({ onDataFromFields }: any) => {
  const [forms, setForms] = useState(() => {
    const experienceData = sessionStorage.getItem("forms");
    return experienceData
      ? JSON.parse(experienceData)
      : [{ id: 0, values: initialValues }];
  });

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/CV-MAKER/general_information");
  };

  const handleForwardButtonClick = () => {
    navigate("/CV-MAKER/education");
  };

  const handleChange = (event: any, formId: number) => {
    const newForms = forms.map((form: any) => {
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
    setForms(newForms);
    onDataFromFields(forms);
  };

  const addForm = () => {
    setForms([...forms, { id: forms.length, values: initialValues }]);
  };

  useEffect(() => {
    sessionStorage.setItem("forms", JSON.stringify(forms));
    onDataFromFields(forms);
  }, [forms]);

  return (
    <div
      className="experience_form"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {forms.map((form: any) => (
        <>
          <FormTemplate
            key={form.id}
            id={form.id}
            onChange={(event: any) => handleChange(event, form.id)}
            values={form.values}
          />
          <hr style={{ marginTop: "70px" }} />
        </>
      ))}

      <div
        className="buttons"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Button
          style={{
            alignSelf: "flex-start",
            marginLeft: "245px",
            marginTop: "30px",
          }}
          onClick={addForm}
          variant="contained"
        >
          გამოცდილების დამატება
        </Button>
        <div
          className="navigation_buttons"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "100px",
          }}
        >
          <Button
            variant="contained"
            style={{
              width: "15%",
              backgroundColor: "#6B40E3",
              marginBottom: "20px",
              marginLeft: "245px",
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
