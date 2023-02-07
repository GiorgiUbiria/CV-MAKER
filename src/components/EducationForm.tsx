import { useNavigate } from "react-router-dom";
import EducationTemplate from "./EducationTemplate";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";

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

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const addForm = () => {
    setEducation([
      ...education,
      { id: education.length, values: initialValues },
    ]);
  };

  const navigate = useNavigate();

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

    const generalInfo = JSON.parse(localStorage.getItem("form-data") as string);
    const experienceInfo = JSON.parse(localStorage.getItem("forms") as string);
    const educationInfo = JSON.parse(
      localStorage.getItem("education") as string
    );
    const file = dataURLtoFile(generalInfo.image, "image.png");

    const formData = new FormData();

    formData.append("about_me", generalInfo.about_me);
    formData.append("email", generalInfo.email);
    formData.append("name", generalInfo.name);
    formData.append("phone_number", generalInfo.phone_number);
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
      console.log(response.data);

      navigate("/cvs");
    } catch (error) {
      console.log(error);
    }
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
            disabled={setButtonDisabled}
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
            disabled={buttonDisabled}
          >
            დასრულება
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
