import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faTriangleExclamation} />;

interface FormValues {
  name: string;
  surname: string;
  image: string;
  aboutMe?: string;
  email: string;
  phoneNumber: string;
}

const validate = (values: FormValues) => {
  const errors: { [key: string]: string } = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (typeof values.name !== "string") {
    errors.name = "Name must be a string";
  } else if (values.name.length < 2) {
    errors.name = "Name must be at least 2 characters long";
  } else if (!/^[\u10D0-\u10FF]+$/.test(values.name)) {
    errors.name = "Name must contain only Georgian letters";
  } else {
    delete errors.name;
  }

  if (!values.surname) {
    errors.surname = "Surname is required";
  } else if (typeof values.surname !== "string") {
    errors.surname = "Surname must be a string";
  } else if (values.surname.length < 2) {
    errors.surname = "Surname must be at least 2 characters long";
  } else if (!/^[\u10D0-\u10FF]+$/.test(values.surname)) {
    errors.surname = "Surname must contain only Georgian letters";
  } else {
    delete errors.surname;
  }

  if (!values.image) {
    errors.image = "Image is required";
  } else {
    delete errors.image;
  }

  if (values.aboutMe) {
    if (typeof values.aboutMe !== "string") {
      errors.aboutMe = "About Me must be a string";
    } else {
      delete errors.aboutMe;
    }
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@redberry+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else {
    delete errors.email;
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone Number is required";
  } else if (!/^\+995\d{9}$/.test(values.phoneNumber)) {
    errors.phoneNumber =
      "Invalid Georgian phone number format. Expected format: +995xxxxxxxxx";
  } else {
    delete errors.phoneNumber;
  }

  return errors;
};

const Form: React.FC = () => {
  const initialValues = {
    name: "",
    surname: "",
    image: "",
    aboutMe: "",
    email: "",
    phoneNumber: "",
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({} as { [key: string]: string });

  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validate(values));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginLeft: "100px",
      }}
    >
      <div className="name_fields" style={{ display: "flex", gap: "6rem" }}>
        <TextField
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name && element}
          style={{ width: "30%" }}
        />
        <TextField
          label="Surname"
          name="surname"
          value={values.surname}
          onChange={handleChange}
          error={!!errors.surname}
          helperText={errors.surname && element}
          style={{ width: "30%" }}
        />
      </div>
      <TextField
        label="About Me"
        name="aboutMe"
        value={values.aboutMe}
        onChange={handleChange}
        error={!!errors.aboutMe}
        helperText={errors.aboutMe && element}
        style={{ width: "70%" }}
      />
      <TextField
        label="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email && element}
        style={{ width: "70%" }}
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={values.phoneNumber}
        onChange={handleChange}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber && element}
        style={{ width: "70%" }}
      />
      <Button
        type="submit"
        style={{
          width: "15%",
          position: "relative",
          top: "100px",
          left: "700px",
        }}
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
