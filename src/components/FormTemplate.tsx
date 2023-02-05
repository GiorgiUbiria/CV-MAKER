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

  if (!values.workName) {
    errors.workName = "WorkName is required";
  } else if (typeof values.workName !== "string") {
    errors.workName = "WorkName must be a string";
  } else if (values.workName.length < 2) {
    errors.workName = "WorkName must be at least 2 characters long";
  } else if (!/^[\u10D0-\u10FF]+$/.test(values.workName)) {
    errors.workName = "WorkName must contain only Georgian letters";
  } else {
    delete errors.workName;
  }

  if (!values.startDate) {
    errors.startDate = "StartDate is required";
  } else {
    delete errors.startDate;
  }

  if (!values.endDate) {
    errors.endDate = "EndDate is required";
  } else {
    delete errors.endDate;
  }

  if (!values.description) {
    errors.description = "Description is required";
  } else if (!/^[\u10D0-\u10FF]+$/.test(values.workName)) {
    errors.workName = "Description must contain only Georgian letters";
  } else {
    delete errors.description;
  }

  return errors;
};

const FormTemplate = ({ id, onChange, values }: any) => {
  const [fieldErrors, setFieldErrors] = useState({
    position: false,
    workName: false,
    startDate: false,
    endDate: false,
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
        name={`workName-${id}`}
        value={values.workName}
        onChange={onChange}
        error={!!errors.workName && fieldErrors.workName}
        helperText={fieldErrors.workName && errors.workName ? element : null}
        style={{ width: "70%" }}
        onBlur={handleBlur("workName")}
        required
      />

      <div className="date_inputs" style={{ display: "flex", gap: "90px" }}>
        <input
          type="date"
          name={`startDate-${id}`}
          id="startDate"
          onChange={onChange}
          style={{ width: "30%" }}
          title="Start Date"
        />
        <input
          type="date"
          name={`endDate-${id}`}
          id="endDate"
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
