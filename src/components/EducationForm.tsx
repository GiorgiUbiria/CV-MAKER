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
    const generalInfo = JSON.parse(localStorage.getItem("form-data") as string);
    const experienceInfo = JSON.parse(localStorage.getItem("forms") as string);
    const educationInfo = JSON.parse(
      localStorage.getItem("education") as string
    );
    const finalResult = {
      ...generalInfo,
      experiences: experienceInfo.map((obj: any) => obj.values),
      educations: educationInfo.map((obj: any) => obj.values),
    };

    /* const test = {
      name: "დავით",
      surname: "ონიანი",
      email: "davitoniani@redberry.ge",
      phone_number: "+995598123456",
      experiences: [
        {
          position: "back-end developer",
          employer: "Redberry",
          start_date: "2019/09/09",
          due_date: "2020/09/23",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare nunc dui, a pellentesque magna blandit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis diam nisi, at venenatis dolor aliquet vel. Pellentesque aliquet leo nec tortor pharetra, ac consectetur orci bibendum.",
        },
      ],
      educations: [
        {
          institute: "თსუ",
          degree: "სტუდენტი",
          due_date: "2017/06/25",
          description:
            "სამართლის ფაკულტეტის მიზანი იყო მიგვეღო ფართო თეორიული ცოდნა სამართლის არსის, სისტემის, ძირითადი პრინციპების, სამართლებრივი სისტემების, ქართული სამართლის ისტორიული წყაროების, კერძო, სისხლის და საჯარო სამართლის სფეროების ძირითადი თეორიების, პრინციპებისა და რეგულირების თავისებურებების შესახებ.",
        },
      ],
      image: "/storage/images/0rI7LyNRJRrokoSKUTb9EKvNuyYFKOvUmDQWoFt6.png",
      about_me: "ეს არის აღწერა ჩემს შესახებ",
    };

    try {
      const response = await axios.post(
        "https://resume.redberryinternship.ge/api/cvs",
        test,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data); */
    navigate("/cvs");
    /*     } catch (error) {
      console.log(error);
    } */
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
