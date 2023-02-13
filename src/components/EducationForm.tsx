import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import EducationTemplate from "./EducationTemplate";

import Button from "@mui/material/Button";

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
    const educationData = sessionStorage.getItem("education");
    return educationData
      ? JSON.parse(educationData)
      : [{ id: 0, values: initialValues }];
  });

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate("/experience");
  };

  const handleForwardButtonClick = async () => {
    function dataURLtoFile(dataurl: string, filename: string): File {
      const arr = dataurl.split(",") as any;
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }

    const generalInfo = JSON.parse(
      sessionStorage.getItem("form-data") as string
    );
    const experienceInfo = JSON.parse(
      sessionStorage.getItem("forms") as string
    );
    const educationInfo = JSON.parse(
      sessionStorage.getItem("education") as string
    );
    const file = dataURLtoFile(generalInfo.image, "image.png");

    console.log(file);

    const formData = new FormData();

    formData.append("about_me", generalInfo.about_me);
    formData.append("email", generalInfo.email);
    formData.append("name", generalInfo.name);
    formData.append(
      "phone_number",
      generalInfo.phone_number.replace(/\s/g, "")
    );
    formData.append("surname", generalInfo.surname);
    formData.append("image", file, "image.png");

    experienceInfo.forEach((data: any, index: number) => {
      formData.append(
        `experiences[${index}][position]`,
        data.values.position.toString()
      );
      formData.append(
        `experiences[${index}][employer]`,
        data.values.employer.toString()
      );
      formData.append(
        `experiences[${index}][start_date]`,
        data.values.start_date.toString()
      );
      formData.append(
        `experiences[${index}][due_date]`,
        data.values.due_date.toString()
      );
      formData.append(
        `experiences[${index}][description]`,
        data.values.description.toString()
      );
    });

    educationInfo.forEach((data: any, index: number) => {
      formData.append(
        `educations[${index}][institute]`,
        data.values.institute.toString()
      );
      formData.append(
        `educations[${index}][degree_id]`,
        data.values.degree.toString()
      );
      formData.append(
        `educations[${index}][due_date]`,
        data.values.due_date.toString()
      );
      formData.append(
        `educations[${index}][description]`,
        data.values.description.toString()
      );
    });

    try {
      const response = await axios.post(
        "https://resume.redberryinternship.ge/api/cvs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      sessionStorage.setItem("finalResults", JSON.stringify(response.data));
      sessionStorage.removeItem("education");
      sessionStorage.removeItem("forms");
      sessionStorage.removeItem("form-data");
      navigate("/cvs");
    } catch (error) {
      console.log(error);
    }
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

  const addForm = () => {
    setEducation([
      ...education,
      { id: education.length, values: initialValues },
    ]);
  };

  useEffect(() => {
    sessionStorage.setItem("education", JSON.stringify(education));
    onDataFromFields(education);
  }, [education]);

  return (
    <div
      className="experience_form"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {education.map((form: any) => (
        <div key={form.id + "_education"}>
          <EducationTemplate
            key={form.id}
            id={form.id}
            onChange={(event: any) => handleChange(event, form.id)}
            values={form.values}
          />
          <hr style={{ marginTop: "15px" }} />
        </div>
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
          განათლების დამატება
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
              marginRight: "255px",
            }}
            onClick={handleForwardButtonClick}
          >
            დასრულება
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
