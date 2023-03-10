import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";

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

const initialValues = {
  name: "",
  surname: "",
  image: "",
  about_me: "",
  email: "",
  phone_number: "",
};

const validate = (values: FormValues): {} => {
  const errors: { [key: string]: string } = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (typeof values.name !== "string") {
    errors.name = "Name must be a string";
  } else if (values.name.length < 2) {
    errors.name = "Name must be at least 2 characters long";
  } else if (!/^[\u10D0-\u10FF]+$/.test(values.name)) {
    errors.name = "Name must contain only Georgian letters";
  } else if (values.name.includes(" ")) {
    errors.name = "Name cannot contain spaces";
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
  } else if (values.surname.includes(" ")) {
    errors.surname = "Surname cannot contain spaces";
  } else {
    delete errors.surname;
  }

  if (values.image === initialValues.image) {
    errors.image = "Image is required";
  } else {
    delete errors.image;
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@redberry\.ge$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else {
    delete errors.email;
  }

  if (!values.phone_number) {
    errors.phone_number = "Phone Number is required";
  } else if (!/^\+995\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/.test(values.phone_number)) {
    errors.phone_number =
      "Invalid Georgian phone number format. Expected format: +995 xxx xx xx xx";
  } else {
    delete errors.phone_number;
  }

  return errors;
};

const Form: React.FC<FormProps> = ({ onDataFromFields }) => {
  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    surname: false,
    about_me: false,
    email: false,
    phone_number: false,
  });
  const [errors, setErrors] = useState({} as { [key: string]: string });
  const [values, setValues] = useState(() => {
    const storedValues = sessionStorage.getItem("form-data");
    return storedValues ? JSON.parse(storedValues) : initialValues;
  });

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/experience");
  };

  const handleImageChange = (e: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = e.target?.result as string;
      setValues({ ...values, image: dataURL });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  function handleNumberChange(text: string) {
    let formattedNumber = text;

    const input = formattedNumber.replace(/\D/g, "").substring(0, 13);

    const areaCode = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last1 = input.substring(6, 8);
    const last2 = input.substring(8, 10);
    const last3 = input.substring(10, 12);

    if (input.length > 10) {
      formattedNumber = `+${areaCode} ${middle} ${last1} ${last2} ${last3}`;
    } else if (input.length > 8) {
      formattedNumber = `+${areaCode} ${middle} ${last1} ${last2}`;
    } else if (input.length > 6) {
      formattedNumber = `+${areaCode} ${middle} ${last1}`;
    } else if (input.length > 3) {
      formattedNumber = `+${areaCode} ${middle}`;
    } else if (input.length > 0) {
      formattedNumber = `+${areaCode}`;
    }

    setValues({ ...values, phone_number: formattedNumber });
  }

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

  const handleBlur = (field: string) => () => {
    setFieldErrors({ ...fieldErrors, [field]: true });
  };

  useEffect(() => {
    sessionStorage.setItem("form-data", JSON.stringify(values));
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
        gap: "2.5rem",
        marginLeft: "250px",
      }}
    >
      <div
        className="name_fields"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "70%",
        }}
      >
        <FormControl required>
          <FormLabel style={{ color: "black", marginBottom: "5px" }}>
            ??????????????????
          </FormLabel>
          <TextField
            name="name"
            value={values.name}
            onChange={handleChange}
            error={!!errors.name && fieldErrors.name}
            helperText={fieldErrors.name && errors.name ? element : null}
            color="success"
            onBlur={handleBlur("name")}
            style={{
              width: "100%",
            }}
            placeholder="??????????????????"
          />
          <FormHelperText style={{ marginLeft: "-2px" }}>
            ????????????????????? 2 ?????????, ????????????????????? ??????????????????
          </FormHelperText>
        </FormControl>

        <FormControl required>
          <FormLabel style={{ color: "black", marginBottom: "5px" }}>
            ???????????????
          </FormLabel>
          <TextField
            name="surname"
            value={values.surname}
            onChange={handleChange}
            error={!!errors.surname && fieldErrors.surname}
            helperText={fieldErrors.surname && errors.surname ? element : null}
            color="success"
            style={{ width: "100%" }}
            onBlur={handleBlur("surname")}
            placeholder="??????????????????????????????"
          />
          <FormHelperText style={{ marginLeft: "-2px" }}>
            ????????????????????? 2 ?????????, ????????????????????? ??????????????????
          </FormHelperText>
        </FormControl>
      </div>

      <FormControl required>
        <p
          style={{
            color: "black",
            fontSize: "24px",
            position: "relative",
            top: "28px",
          }}
        >
          ?????????????????? ??????????????? ????????????????????????
        </p>
        <div className="upload" style={{ marginLeft: "330px" }}>
          <Button
            type="button"
            variant="contained"
            style={{ width: "225px", cursor: "pointer" }}
          >
            ????????????????????????
          </Button>
          <input
            type="file"
            name="image"
            id="img"
            onChange={handleImageChange}
            onBlur={handleBlur("image")}
            style={{
              position: "absolute",
              cursor: "pointer",
              left: "280px",
              top: "30px",
              opacity: "0",
              transform: "scale(0.7)",
            }}
          />
        </div>
        {errors.image && (
          <div
            style={{
              width: "50px",
              color: "red",
              position: "absolute",
              right: "255px",
              top: "35px",
            }}
          >
            {element}
          </div>
        )}
      </FormControl>

      <FormControl>
        <FormLabel style={{ color: "black", marginBottom: "5px" }}>
          ????????? ????????????????????? (??????????????????????????????????????????)
        </FormLabel>
        <TextField
          name="about_me"
          value={values.about_me}
          onChange={handleChange}
          style={{ width: "70%" }}
          multiline
          placeholder="?????????????????? ?????????????????????????????? ????????? ?????????????????????"
        />
        <FormHelperText style={{ marginLeft: "-2px" }}>
          ????????????????????? 2 ?????????????????????
        </FormHelperText>
      </FormControl>

      <FormControl required>
        <FormLabel style={{ color: "black", marginBottom: "5px" }}>
          ????????????????????????????????? ???????????????
        </FormLabel>
        <TextField
          name="email"
          value={values.email}
          onChange={handleChange}
          error={!!errors.email && fieldErrors.email}
          helperText={fieldErrors.email && errors.email ? element : null}
          color="success"
          style={{ width: "70%" }}
          onBlur={handleBlur("email")}
          placeholder="amiran623@redberry.ge"
        />
        <FormHelperText style={{ marginLeft: "-2px" }}>
          ???????????? ???????????????????????????????????? @redberry.ge-??????
        </FormHelperText>
      </FormControl>

      <FormControl required>
        <FormLabel style={{ color: "black", marginBottom: "5px" }}>
          ??????????????????????????? ??????????????????
        </FormLabel>
        <TextField
          name="phone_number"
          value={values.phone_number}
          onChange={(e: any) => handleNumberChange(e.target.value)}
          error={!!errors.phone_number && fieldErrors.phone_number}
          helperText={
            fieldErrors.phone_number && errors.phone_number ? element : null
          }
          color="success"
          style={{ width: "70%" }}
          onBlur={handleBlur("phone_number")}
          placeholder="+995 551 01 23 07"
        />
        <FormHelperText style={{ marginLeft: "-2px" }}>
          ???????????? ?????????????????????????????????????????? ????????????????????? ???????????????????????? ?????????????????? ?????????????????????
        </FormHelperText>
      </FormControl>

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
        ?????????????????????
      </Button>
    </form>
  );
};

export default Form;
