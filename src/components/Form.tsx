import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faTriangleExclamation} />;

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  onDataFromChild: (data: any) => void;
}

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

const Form: React.FC<FormProps> = ({ onDataFromChild }: any) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/experience");
  };

  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    surname: false,
    aboutMe: false,
    email: false,
    phoneNumber: false,
  });

  const handleBlur = (field: string) => () => {
    setFieldErrors({ ...fieldErrors, [field]: true });
  };

  const initialValues = {
    name: "",
    surname: "",
    image: "",
    aboutMe: "",
    email: "",
    phoneNumber: "",
  };

  const [values, setValues] = useState(() => {
    const storedValues = localStorage.getItem("form-data");
    return storedValues ? JSON.parse(storedValues) : initialValues;
  });

  useEffect(() => {
    localStorage.setItem("form-data", JSON.stringify(values));
  }, [values]);

  const [errors, setErrors] = useState({} as { [key: string]: string });

  useEffect(() => {
    setErrors(validate(values));
    onDataFromChild(values);
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
        gap: "3rem",
        marginLeft: "100px",
      }}
    >
      <div className="name_fields" style={{ display: "flex", gap: "5rem" }}>
        <TextField
          label="სახელი"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={!!errors.name && fieldErrors.name}
          helperText={fieldErrors.name && errors.name ? element : null}
          onBlur={handleBlur("name")}
          style={{ width: "30%" }}
          required
        />
        <TextField
          label="გვარი"
          name="surname"
          value={values.surname}
          onChange={handleChange}
          error={!!errors.surname && fieldErrors.surname}
          helperText={fieldErrors.surname && errors.surname ? element : null}
          style={{ width: "30%" }}
          onBlur={handleBlur("surname")}
          required
        />
      </div>

      <TextField
        label="ჩემს შესახებ"
        name="aboutMe"
        value={values.aboutMe}
        onChange={handleChange}
        error={!!errors.aboutMe && fieldErrors.aboutMe}
        helperText={fieldErrors.aboutMe && errors.aboutMe ? element : null}
        style={{ width: "70%" }}
        onBlur={handleBlur("aboutMe")}
        multiline
      />
      <TextField
        label="ელექტრონული ფოსტა"
        name="email"
        value={values.email}
        onChange={handleChange}
        error={!!errors.email && fieldErrors.email}
        helperText={fieldErrors.email && errors.email ? element : null}
        style={{ width: "70%" }}
        onBlur={handleBlur("email")}
        required
      />
      <TextField
        label="ტელეფონის ნომერი"
        name="phoneNumber"
        value={values.phoneNumber}
        onChange={handleChange}
        error={!!errors.phoneNumber && fieldErrors.phoneNumber}
        helperText={
          fieldErrors.phoneNumber && errors.phoneNumber ? element : null
        }
        style={{ width: "70%" }}
        onBlur={handleBlur("phoneNumber")}
        required
      />
      <Button
        variant="contained"
        style={{
          width: "15%",
          position: "relative",
          top: "100px",
          left: "565px",
          backgroundColor: "#6B40E3",
        }}
        onClick={handleButtonClick}
      >
        შემდეგი
      </Button>
    </form>
  );
};

export default Form;
