import { useEffect, useState } from "react";

import {
  TextField,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faTriangleExclamation} />;

const validate = (values: any): {} => {
  const errors: { [key: string]: string } = {};

  const { institute, degree, due_date, description, id } = values;

  if (!institute) {
    errors[`institute-${id}`] = "Institute is required";
  } else if (institute.length < 2) {
    errors[`institute-${id}`] = "Institute must be at least 2 characters long";
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
    errors[`due_date-${id}`] = "due_date is required";
  } else {
    delete errors[`due_date-${id}`];
  }

  if (!description) {
    errors[`description-${id}`] = "Description is required";
  } else if (description.length < 2) {
    errors[`description-${id}`] =
      "Description must be at least 2 characters long";
  } else {
    delete errors[`description-${id}`];
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

  const [options, setOptions] = useState([]);

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value as string);
    onChange({ target: { name: `degree-${id}`, value: event.target.value } });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validate({ ...values, id }));
  };

  const handleBlur = (field: string) => () => {
    setFieldErrors({ ...fieldErrors, [field]: true });
  };

  useEffect(() => {
    setErrors(validate({ ...values, id }));
  }, [values]);

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
        gap: "2.5rem",
        marginLeft: "250px",
      }}
    >
      <FormControl required>
        <FormLabel style={{ color: "black", marginBottom: "5px" }}>
          ????????????????????????????????????
        </FormLabel>
        <TextField
          name={`institute-${id}`}
          value={values.institute}
          onChange={onChange}
          error={!!errors[`institute-${id}`] && fieldErrors.institute}
          helperText={
            fieldErrors.institute && errors[`institute-${id}`] ? element : null
          }
          color="success"
          onBlur={handleBlur("institute")}
          style={{ width: "70%" }}
          placeholder="????????????????????????????????????"
        />
        <FormHelperText style={{ marginLeft: "-2px" }}>
          ????????????????????? 2 ?????????????????????
        </FormHelperText>
      </FormControl>

      <div
        className="fields_container"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormControl style={{ width: "30%" }} required>
          <FormLabel style={{ color: "black", marginBottom: "5px" }}>
            ?????????????????????
          </FormLabel>
          <Select
            id="demo-simple-select"
            value={values?.degree ? values?.degree : selectedOption}
            label="Degree"
            onChange={handleOptionChange}
            color="success"
            error={!!errors.degree && fieldErrors.degree}
          >
            <MenuItem disabled value="">
              <em>????????????????????? ?????????????????????</em>
            </MenuItem>
            {options?.map((option: any) => (
              <MenuItem key={option?.id} value={option?.id}>
                {option?.title}
              </MenuItem>
            ))}
          </Select>
          {errors[`degree-${id}`] && (
            <div
              style={{
                width: "50px",
                color: "red",
                position: "relative",
                left: "270px",
                bottom: "35px",
              }}
            >
              {element}
            </div>
          )}
        </FormControl>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "16px", marginBottom: "5px" }}>
            ?????????????????????????????? ??????????????????
          </span>
          <input
            type="date"
            name={`due_date-${id}`}
            id="due_date"
            onChange={onChange}
            value={values.due_date}
            style={{
              width: "50%",
              marginRight: "385px",
              height: "58px",
              borderRadius: "5px",
              border: "1px solid gray",
              marginTop: "5px",
              backgroundColor: "#f9f9f9",
              fontSize: "16px",
            }}
            onBlur={handleBlur("due_date")}
          />
          {errors[`due_date-${id}`] && (
            <div
              style={{
                width: "50px",
                color: "red",
                position: "relative",
                left: "270px",
                bottom: "37px",
              }}
            >
              {element}
            </div>
          )}
        </div>
      </div>

      <FormControl required>
        <FormLabel style={{ color: "black", marginBottom: "5px" }}>
          ??????????????????
        </FormLabel>
        <TextField
          name={`description-${id}`}
          value={values.description}
          onChange={onChange}
          error={!!errors[`description-${id}`] && fieldErrors.description}
          helperText={
            fieldErrors.description && errors[`description-${id}`]
              ? element
              : null
          }
          color="success"
          style={{ width: "70%" }}
          onBlur={handleBlur("description")}
          multiline
          placeholder="?????????????????????????????? ??????????????????"
        />
      </FormControl>
    </form>
  );
};

export default EducationTemplate;
