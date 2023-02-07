import { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FormControl, FormHelperText, FormLabel, styled } from "@mui/material";
const element = <FontAwesomeIcon icon={faTriangleExclamation} />;

const validate = (values: any) => {
  const errors: { [key: string]: string } = {};

  if (!values.position) {
    errors.position = "Position is required";
  } else if (values.position.length < 2) {
    errors.position = "Position must be at least 2 characters long";
  } else {
    delete errors.position;
  }

  if (!values.employer) {
    errors.employer = "employer is required";
  } else if (values.employer.length < 2) {
    errors.employer = "Employer must be at least 2 characters long";
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

  return errors;
};

const FormTemplate = ({ id, onChange, values, disabled }: any) => {
  const [fieldErrors, setFieldErrors] = useState({
    position: false,
    employer: false,
    start_date: false,
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
    setErrors(validate(values));
  };

  useEffect(() => {
    setErrors(validate(values));
    disabled(isDisabled);
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
      <FormControl required>
        <FormLabel style={{ color: "black", marginBottom: "5px" }}>
          თანამდებობა
        </FormLabel>
        <TextField
          name={`position-${id}`}
          value={values.position}
          onChange={onChange}
          error={!!errors.position && fieldErrors.position}
          helperText={fieldErrors.position && errors.position ? element : null}
          onBlur={handleBlur("position")}
          style={{
            width: "70%",
          }}
          color="warning"
          placeholder="დეველოპერი, დიზაინერი, ა.შ"
        />
        <FormHelperText style={{ marginLeft: "-2px" }}>
          მინიმუმ 2 სიმბოლო
        </FormHelperText>
      </FormControl>

      <FormControl required>
        <FormLabel style={{ color: "black", marginBottom: "5px" }}>
          დამსაქმებელი
        </FormLabel>
        <TextField
          name={`employer-${id}`}
          value={values.employer}
          onChange={onChange}
          error={!!errors.employer && fieldErrors.employer}
          helperText={fieldErrors.employer && errors.employer ? element : null}
          style={{ width: "70%" }}
          onBlur={handleBlur("employer")}
          placeholder="დამსაქმებელი"
        />
        <FormHelperText style={{ marginLeft: "-2px" }}>
          მინიმუმ 2 სიმბოლო
        </FormHelperText>
      </FormControl>

      <div className="date_inputs" style={{ display: "flex", gap: "170px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "18px", marginBottom: "5px" }}>
            დაწყების თარიღი
          </span>
          <input
            type="date"
            name={`start_date-${id}`}
            id="start_date"
            onChange={onChange}
            style={{
              height: "50px",
              borderRadius: "5px",
              border: "1px solid gray",
              backgroundColor: "#f9f9f9",
              width: "220px",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "18px", marginBottom: "5px" }}>
            დასრულების თარიღი
          </span>
          <input
            type="date"
            name={`due_date-${id}`}
            id="due_date"
            onChange={onChange}
            style={{
              height: "50px",
              borderRadius: "5px",
              border: "1px solid gray",
              backgroundColor: "#f9f9f9",
              width: "220px",
            }}
          />
        </div>
      </div>

      <FormControl>
        <FormLabel style={{ color: "black", marginBottom: "5px" }}>
          აღწერა
        </FormLabel>
        <TextField
          name={`description-${id}`}
          value={values.description}
          onChange={onChange}
          style={{ width: "70%" }}
          onBlur={handleBlur("description")}
          multiline
          placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
        />
      </FormControl>
    </form>
  );
};

export default FormTemplate;
