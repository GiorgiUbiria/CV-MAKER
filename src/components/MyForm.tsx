import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
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

const MyForm = () => (
  <Formik
    initialValues={{
      name: "",
      surname: "",
      image: "",
      aboutMe: "",
      email: "",
      phoneNumber: "",
    }}
    validate={validate}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <Field as={TextField} type="text" name="name" placeholder="Name" />
        <ErrorMessage name="name" component="div" />
        <Field
          as={TextField}
          type="text"
          name="surname"
          placeholder="Surname"
        />
        <ErrorMessage name="surname" component="div" />
        <Field type="file" name="image" />
        <ErrorMessage name="image" component="div" />
        <Field as={TextField} multiple name="aboutMe" placeholder="About Me" />
        <ErrorMessage name="aboutMe" component="div" />
        <Field as={TextField} type="email" name="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" />
        <Field
          as={TextField}
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
        />
        <ErrorMessage name="phoneNumber" component="div" />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Form>
    )}
  </Formik>
);

export default MyForm;
