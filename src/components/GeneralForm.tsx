import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faTriangleExclamation} />;

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  onDataFromFields: (data: any) => void;
}

interface FormValues {
  name: string;
  surname: string;
  image: string;
  about_me?: string;
  email: string;
  phone_number: string;
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

  if (values.about_me) {
    if (typeof values.about_me !== "string") {
      errors.about_me = "About Me must be a string";
    } else {
      delete errors.about_me;
    }
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@redberry+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else {
    delete errors.email;
  }

  if (!values.phone_number) {
    errors.phone_number = "Phone Number is required";
  } else if (!/^\+995\d{9}$/.test(values.phone_number)) {
    errors.phone_number =
      "Invalid Georgian phone number format. Expected format: +995xxxxxxxxx";
  } else {
    delete errors.phone_number;
  }

  return errors;
};

const Form: React.FC<FormProps> = ({ onDataFromFields }: any) => {
  const initialValues = {
    name: "",
    surname: "",
    image:
      "https://png.pngtree.com/png-clipart/20191027/ourlarge/pngtree-outline-person-icon-png-image_1869918.jpg",
    about_me: "",
    email: "",
    phone_number: "",
  };

  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    surname: false,
    about_me: false,
    email: false,
    phone_number: false,
  });
  const [errors, setErrors] = useState({} as { [key: string]: string });
  const [values, setValues] = useState(() => {
    const storedValues = localStorage.getItem("form-data");
    return storedValues ? JSON.parse(storedValues) : initialValues;
  });
  const [image, setImage] = useState<string>();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/experience");
  };

  const handleBlur = (field: string) => () => {
    setFieldErrors({ ...fieldErrors, [field]: true });
  };

  const handleImageChange = (e: any) => {
    const newImage = URL.createObjectURL(e.target.files[0]);
    setImage(newImage);
    setValues({ ...values, image: newImage });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validate(values));
  };

  useEffect(() => {
    localStorage.setItem("form-data", JSON.stringify(values));
  }, [values]);

  useEffect(() => {
    setErrors(validate(values));
    onDataFromFields(values);
  }, [values]);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        marginLeft: "250px",
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
      <input type="file" name="image" id="img" onChange={handleImageChange} />
      <TextField
        label="ჩემს შესახებ"
        name="about_me"
        value={values.about_me}
        onChange={handleChange}
        error={!!errors.about_me && fieldErrors.about_me}
        helperText={fieldErrors.about_me && errors.about_me ? element : null}
        style={{ width: "70%" }}
        onBlur={handleBlur("about_me")}
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
        name="phone_number"
        value={values.phone_number}
        onChange={handleChange}
        error={!!errors.phone_number && fieldErrors.phone_number}
        helperText={
          fieldErrors.phone_number && errors.phone_number ? element : null
        }
        style={{ width: "70%" }}
        onBlur={handleBlur("phone_number")}
        required
      />
      <Button
        variant="contained"
        style={{
          width: "15%",
          backgroundColor: "#6B40E3",
          marginBottom: "20px",
          marginLeft: "480px",
        }}
        onClick={handleButtonClick}
      >
        შემდეგი
      </Button>
    </form>
  );
};

export default Form;
