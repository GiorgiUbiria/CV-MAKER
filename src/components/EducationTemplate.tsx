import { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
const element = <FontAwesomeIcon icon={faTriangleExclamation} />;

const validate = (values: any) => {
  const errors: { [key: string]: string } = {};

  const { institute, degree, due_date, description, id } = values;

  if (!institute) {
    errors[`institute-${id}`] = "Institute is required";
  } else if (institute.charAt(0) === " ") {
    errors[`institute-${id}`] = "Institute cannot start with a space";
  } else {
    delete errors[`institute-${id}`];
  }

  if (!degree) {
    errors[`degree-${id}`] = "Degree is required";
  } else {
    delete errors[`degree-${id}`];
  }

  if (!due_date) {
    errors[`degree-${id}`] = "due_date is required";
  } else {
    delete errors[`degree-${id}`];
  }

  if (!description) {
    errors[`description-${id}`] = "Description is required";
  } else {
    delete errors[`description-${id}`];
  }

  return errors;
};

const EducationTemplate = ({ id, onChange, values, disabled }: any) => {
  const [fieldErrors, setFieldErrors] = useState({
    institute: false,
    degree: false,
    due_date: false,
    description: false,
  });

  const [errors, setErrors] = useState({} as { [key: string]: string });

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(Object.keys(errors).length !== 0);
  }, [errors]);

  const handleBlur = (field: string) => () => {
    setFieldErrors({ ...fieldErrors, [field]: true });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validate({ ...values, id }));
  };

  useEffect(() => {
    setErrors(validate({ ...values, id }));
    disabled(isDisabled);
  }, [values, isDisabled]);

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value as string);
    onChange({ target: { name: `degree-${id}`, value: event.target.value } });
  };

  useEffect(() => {
    fetch("https://resume.redberryinternship.ge/api/degrees")
      .then((response) => response.json())
      .then((data) => setOptions(data));
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        marginLeft: "250px",
        marginTop: "15px",
      }}
    >
      <FormControl required>
        <FormLabel style={{ color: "black", marginBottom: "5px" }}>
          სასწავლებელი
        </FormLabel>
        <TextField
          name={`institute-${id}`}
          value={values.institute}
          onChange={onChange}
          error={!!errors.institute && fieldErrors.institute}
          helperText={
            fieldErrors.institute && errors.institute ? element : null
          }
          onBlur={handleBlur("institute")}
          style={{ width: "70%" }}
          placeholder="სასწავლებელი"
        />
        <FormHelperText style={{ marginLeft: "-2px" }}>
          მინიმუმ 2 სიმბოლო
        </FormHelperText>
      </FormControl>

      <div
        className="fields_container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <FormControl style={{ width: "30%" }} required>
          <FormLabel style={{ color: "black", marginBottom: "5px" }}>
            ხარისხი
          </FormLabel>
          <Select
            id="demo-simple-select"
            value={values.degree ? values.degree : selectedOption}
            label="Age"
            onChange={handleOptionChange}
            error={!!errors.degree && fieldErrors.degree}
          >
            <MenuItem disabled value="">
              <em>აირჩიეთ ხარისხი</em>
            </MenuItem>
            {options.map((option: any) => (
              <MenuItem key={option.id} value={option.id}>
                {option.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input
          type="date"
          name={`due_date-${id}`}
          id="due_date"
          onChange={onChange}
          value={values.due_date}
          style={{
            width: "30%",
            marginRight: "260px",
            height: "65px",
            borderRadius: "5px",
            border: "1px solid gray",
            marginTop: "25px",
            backgroundColor: "#f9f9f9",
          }}
          onBlur={handleBlur("due_date")}
        />
      </div>

      <FormControl>
        <FormLabel style={{ color: "black", marginBottom: "5px" }}>
          აღწერა
        </FormLabel>
        <TextField
          name={`description-${id}`}
          value={values.description}
          onChange={onChange}
          error={!!errors.description && fieldErrors.description}
          helperText={
            fieldErrors.description && errors.description ? element : null
          }
          style={{ width: "70%" }}
          onBlur={handleBlur("description")}
          multiline
          placeholder="განათლების აღწერა"
        />
      </FormControl>
    </form>
  );
};

export default EducationTemplate;
