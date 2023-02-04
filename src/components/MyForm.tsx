import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

function CustomHelperText({ helperText }: any) {
  return (
    <Typography variant="body2" color="textSecondary">
      {helperText}
    </Typography>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

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
    } else if (!/^[\u10D0-\u10FF]+$/.test(values.aboutMe)) {
      errors.aboutMe = "About Me must contain only Georgian letters";
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

const initialValues = {
  name: "",
  surname: "",
  image: "",
  aboutMe: "",
  email: "",
  phoneNumber: "",
};

const MyForm = () => {
  const [values, setValues] = useState(
    JSON.parse(localStorage.getItem("formValues") as string) || initialValues
  );

  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(values));
  }, [values]);

  return (
    <Formik
      initialValues={values}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="name_field" style={{ display: "flex", gap: "1rem" }}>
            <Field
              name="name"
              render={({ field, form }: any) => (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <TextField
                    {...field}
                    error={form.errors.name && form.touched.name}
                  />
                  <CustomHelperText
                    helperText={
                      form.errors.name && form.touched.name ? element : null
                    }
                  />
                </div>
              )}
            />
            <Field
              name="surname"
              render={({ field, form }: any) => (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <TextField
                    {...field}
                    error={form.errors.surname && form.touched.surname}
                  />
                  <CustomHelperText
                    helperText={
                      form.errors.surname && form.touched.surname
                        ? element
                        : null
                    }
                  />
                </div>
              )}
            />
          </div>
          <Field type="file" name="image" />
          <ErrorMessage name="image" component="div" />
          <Field
            name="aboutMe"
            render={({ field, form }: any) => (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <TextField
                  {...field}
                  error={form.errors.aboutMe && form.touched.aboutMe}
                />
                <CustomHelperText
                  helperText={
                    form.errors.aboutMe && form.touched.aboutMe ? element : null
                  }
                />
              </div>
            )}
          />
          <Field
            name="email"
            render={({ field, form }: any) => (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <TextField
                  {...field}
                  error={form.errors.email && form.touched.email}
                />
                <CustomHelperText
                  helperText={
                    form.errors.email && form.touched.email ? element : null
                  }
                />
              </div>
            )}
          />
          <Field
            name="phoneNumber"
            render={({ field, form }: any) => (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <TextField
                  {...field}
                  error={form.errors.phoneNumber && form.touched.phoneNumber}
                />
                <CustomHelperText
                  helperText={
                    form.errors.phoneNumber && form.touched.phoneNumber
                      ? element
                      : null
                  }
                />
              </div>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
