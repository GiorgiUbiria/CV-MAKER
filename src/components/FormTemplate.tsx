import { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
const element = <FontAwesomeIcon icon={faTriangleExclamation} />;

const validate = (values: any) => {
  const errors: { [key: string]: string } = {};

  if (!values.position) {
    errors.position = "Position is required";
  } else if (typeof values.position !== "string") {
    errors.position = "Position must be a string";
  } else if (values.position.length < 2) {
    errors.position = "Position must be at least 2 characters long";
  } else if (!/^[\u10D0-\u10FF]+$/.test(values.position)) {
    errors.position = "Position must contain only Georgian letters";
  } else {
    delete errors.position;
  }

  if (!values.employer) {
    errors.employer = "employer is required";
  } else if (typeof values.employer !== "string") {
    errors.employer = "employer must be a string";
  } else if (values.employer.length < 2) {
    errors.employer = "employer must be at least 2 characters long";
  } else if (!/^[\u10D0-\u10FF]+$/.test(values.employer)) {
    errors.employer = "employer must contain only Georgian letters";
  } else {
    delete errors.employer;
  }

  if (!values.start_date) {
    errors.start_date = "start_date is required";
  } else {
    delete errors.start_date;
  }

  if (!values.due_date) {
    errors.due_date = "due_date is required";
  } else {
    delete errors.due_date;
  }

  if (!values.description) {
    errors.description = "Description is required";
  } else if (!/^[\u10D0-\u10FF]+$/.test(values.employer)) {
    errors.description = "Description must contain only Georgian letters";
  } else {
    delete errors.description;
  }

  return errors;
};

const FormTemplate = ({ id, onChange, values }: any) => {
  const [fieldErrors, setFieldErrors] = useState({
    position: false,
    employer: false,
    start_date: false,
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
        label="თანამდებობა"
        name={`position-${id}`}
        value={values.position}
        onChange={onChange}
        error={!!errors.position && fieldErrors.position}
        helperText={fieldErrors.position && errors.position ? element : null}
        onBlur={handleBlur("position")}
        style={{ width: "70%" }}
        required
      />
      <TextField
        label="დამსაქმებელი"
        name={`employer-${id}`}
        value={values.employer}
        onChange={onChange}
        error={!!errors.employer && fieldErrors.employer}
        helperText={fieldErrors.employer && errors.employer ? element : null}
        style={{ width: "70%" }}
        onBlur={handleBlur("employer")}
        required
      />

      <div className="date_inputs" style={{ display: "flex", gap: "90px" }}>
        <input
          type="date"
          name={`start_date-${id}`}
          id="start_date"
          onChange={onChange}
          style={{ width: "30%" }}
          title="Start Date"
        />
        <input
          type="date"
          name={`due_date-${id}`}
          id="due_date"
          onChange={onChange}
          style={{ width: "30%" }}
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

export default FormTemplate;
