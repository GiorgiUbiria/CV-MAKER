import { useEffect, useState } from "react";

import {
  TextField,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faTriangleExclamation} />;

const validate = (values: any, id: any): {} => {
  const errors: { [key: string]: string } = {};

  const { position, employer, start_date, due_date, description } = values;

  if (!position) {
    errors[`position-${id}`] = "Position is required";
  } else if (position.length < 2) {
    errors[`position-${id}`] = "Position must be at least 2 characters long";
  } else if (position.charAt(0) === " ") {
    errors[`position-${id}`] = "Position cannot start with a space";
  } else {
    delete errors[`position-${id}`];
  }

  if (!employer) {
    errors[`employer-${id}`] = "employer is required";
  } else if (employer.length < 2) {
    errors[`employer-${id}`] = "Employer must be at least 2 characters long";
  } else if (employer.charAt(0) === " ") {
    errors[`employer-${id}`] = "Employer cannot start with a space";
  } else {
    delete errors[`employer-${id}`];
  }

  if (!start_date) {
    errors[`start_date-${id}`] = "start_date is required";
  } else if (!due_date) {
    errors[`due_date-${id}`] = "due_date is required";
  } else if (new Date(start_date) >= new Date(due_date)) {
    errors[`start_date-${id}`] = "start_date must be less than due_date";
  } else {
    delete errors[`start_date-${id}`];
    delete errors[`due_date-${id}`];
  }

  if (!due_date) {
    errors[`due_date-${id}`] = "due_date is required";
  } else {
    delete errors[`due_date-${id}`];
  }

  if (!description) {
    errors[`description-${id}`] = "Description is required";
  } else {
    delete errors[`description-${id}`];
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
    setErrors(validate({ ...values }, id));
  };

  useEffect(() => {
    setErrors(validate({ ...values }, id));
  }, [values]);

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
          ?????????????????????????????????
        </FormLabel>
        <TextField
          name={`position-${id}`}
          value={values.position}
          onChange={onChange}
          error={!!errors[`position-${id}`] && fieldErrors.position}
          helperText={
            fieldErrors.position && errors[`position-${id}`] ? element : null
          }
          color="success"
          onBlur={handleBlur("position")}
          style={{
            width: "70%",
          }}
          placeholder="??????????????????????????????, ???????????????????????????, ???.???"
        />
        <FormHelperText style={{ marginLeft: "-2px" }}>
          ????????????????????? 2 ?????????????????????
        </FormHelperText>
      </FormControl>

      <FormControl required>
        <FormLabel style={{ color: "black", marginBottom: "5px" }}>
          ????????????????????????????????????
        </FormLabel>
        <TextField
          name={`employer-${id}`}
          value={values.employer}
          onChange={onChange}
          error={!!errors[`employer-${id}`] && fieldErrors.employer}
          helperText={
            fieldErrors.employer && errors[`employer-${id}`] ? element : null
          }
          color="success"
          style={{ width: "70%" }}
          onBlur={handleBlur("employer")}
          placeholder="????????????????????????????????????"
        />
        <FormHelperText style={{ marginLeft: "-2px" }}>
          ????????????????????? 2 ?????????????????????
        </FormHelperText>
      </FormControl>

      <div
        className="date_inputs"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "16px", marginBottom: "10px" }}>
              ???????????????????????? ??????????????????
            </span>
            <input
              type="date"
              name={`start_date-${id}`}
              id="start_date"
              onChange={onChange}
              value={values.start_date}
              style={{
                height: "50px",
                borderRadius: "5px",
                border: "1px solid gray",
                backgroundColor: "#f9f9f9",
                width: "220px",
                fontSize: "16px",
              }}
              onBlur={handleBlur("start_date")}
            />
          </div>
          {errors[`start_date-${id}`] && (
            <div
              style={{
                width: "50px",
                color: "red",
                position: "relative",
                left: "10px",
                top: "43px",
              }}
            >
              {element}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "16px", marginBottom: "10px" }}>
            ?????????????????????????????? ??????????????????
          </span>
          <input
            type="date"
            name={`due_date-${id}`}
            id="due_date"
            onChange={onChange}
            value={values.due_date}
            style={{
              height: "50px",
              borderRadius: "5px",
              border: "1px solid gray",
              backgroundColor: "#f9f9f9",
              width: "220px",
              fontSize: "16px",
              marginRight: "90px",
            }}
            onBlur={handleBlur("due_date")}
          />
        </div>
        {errors[`due_date-${id}`] && (
          <div
            style={{
              width: "5px",
              color: "red",
              position: "relative",
              right: "135px",
              top: "43px",
            }}
          >
            {element}
          </div>
        )}
      </div>

      <FormControl required>
        <FormLabel
          style={{ color: "black", marginBottom: "5px", fontSize: "18px" }}
        >
          ??????????????????
        </FormLabel>
        <TextField
          name={`description-${id}`}
          value={values.description}
          onChange={onChange}
          style={{ width: "70%" }}
          onBlur={handleBlur("description")}
          error={!!errors[`description-${id}`] && fieldErrors.description}
          helperText={
            fieldErrors.description && errors[`description-${id}`]
              ? element
              : null
          }
          color="success"
          multiline
          placeholder="???????????? ??????????????????????????????????????? ?????? ?????????????????? ??????????????????"
        />
      </FormControl>
    </form>
  );
};

export default FormTemplate;
