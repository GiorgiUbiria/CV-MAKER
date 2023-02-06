import { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const element = <FontAwesomeIcon icon={faTriangleExclamation} />;

const validate = (values: any) => {
  const errors: { [key: string]: string } = {};

  if (!values.institute) {
    errors.institute = "Institute is required";
  } else if (typeof values.institute !== "string") {
    errors.institute = "Institute must be a string";
  } else if (values.institute.length < 2) {
    errors.institute = "Institute must be at least 2 characters long";
  } else if (!/^[\u10D0-\u10FF]+$/.test(values.institute)) {
    errors.institute = "Institute must contain only Georgian letters";
  } else {
    delete errors.institute;
  }

  if (!values.degree) {
    errors.degree = "Degree is required";
  } else if (typeof values.degree !== "string") {
    errors.degree = "Degree must be a string";
  } else if (values.degree.length < 2) {
    errors.degree = "Degree must be at least 2 characters long";
  } else if (!/^[\u10D0-\u10FF]+$/.test(values.degree)) {
    errors.degree = "Degree must contain only Georgian letters";
  } else {
    delete errors.degree;
  }

  if (!values.due_date) {
    errors.due_date = "due_date is required";
  } else {
    delete errors.due_date;
  }

  if (!values.description) {
    errors.description = "Description is required";
  } else if (!/^[\u10D0-\u10FF]+$/.test(values.description)) {
    errors.description = "Description must contain only Georgian letters";
  } else {
    delete errors.description;
  }

  return errors;
};

const EducationTemplate = ({ id, onChange, values }: any) => {
  const [fieldErrors, setFieldErrors] = useState({
    institute: false,
    degree: false,
    due_date: false,
    description: false,
  });

  const [errors, setErrors] = useState({} as { [key: string]: string });

  const handleBlur = (field: string) => () => {
    setFieldErrors({ ...fieldErrors, [field]: true });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validate(values));
  };

  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

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
      <TextField
        label="სასწავლებელი"
        name={`institute-${id}`}
        value={values.institute}
        onChange={onChange}
        error={!!errors.institute && fieldErrors.institute}
        helperText={fieldErrors.institute && errors.institute ? element : null}
        onBlur={handleBlur("institute")}
        style={{ width: "70%" }}
        required
      />

      <div
        className="fields_container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <FormControl style={{ width: "30%" }}>
          <InputLabel id="demo-simple-select-label">ხარისხი</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOption}
            label="Age"
            onChange={handleOptionChange}
          >
            {options.map((option: any) => (
              <MenuItem key={option.id} value={option.title}>
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
          style={{ width: "30%", marginRight: "260px" }}
        />
      </div>

      <TextField
        label="აღწერა"
        name={`description-${id}`}
        value={values.description}
        onChange={onChange}
        error={!!errors.description && fieldErrors.description}
        helperText={
          fieldErrors.description && errors.description ? element : null
        }
        style={{ width: "70%" }}
        onBlur={handleBlur("description")}
        required
        multiline
      />
    </form>
  );
};

export default EducationTemplate;
