import { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faTriangleExclamation} />;

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  onDataFromFields: (data: any) => void;
}

interface FormValues {
  position: string;
  workName: string;
  startDate: string;
  endDate: string;
  description: string;
}

const validate = (values: FormValues) => {
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

  if (values.startDate) {
    if (typeof values.startDate !== "string") {
      errors.startDate = "About Me must be a string";
    } else {
      delete errors.startDate;
    }
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

const ExperienceFormFields: React.FC<FormProps> = ({
  onDataFromFields,
}: any) => {
  const initialValues = {
    position: "",
    workName: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const [fieldErrors, setFieldErrors] = useState({
    position: false,
    workName: false,
    startDate: false,
    endDate: false,
    description: false,
  });

  const [errors, setErrors] = useState({} as { [key: string]: string });

  const [values, setValues] = useState(() => {
    const storedValues = localStorage.getItem("form-data");
    return storedValues ? JSON.parse(storedValues) : initialValues;
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleBlur = (field: string) => () => {
    setFieldErrors({ ...fieldErrors, [field]: true });
  };

  const handleDatechange = (e: any) => {
    if (e.target.name === "startDate") {
      setStartDate(e.target.value);
      setValues({ ...values, startDate: startDate });
    } else {
      setEndDate(e.target.value);
      setValues({ ...values, endDate: endDate });
    }
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
      <TextField
        label="თანამდებობა"
        name="position"
        value={values.position}
        onChange={handleChange}
        error={!!errors.position && fieldErrors.position}
        helperText={fieldErrors.position && errors.position ? element : null}
        onBlur={handleBlur("position")}
        style={{ width: "70%" }}
        required
      />
      <TextField
        label="დამსაქმებელი"
        name="workName"
        value={values.workName}
        onChange={handleChange}
        error={!!errors.workName && fieldErrors.workName}
        helperText={fieldErrors.workName && errors.workName ? element : null}
        style={{ width: "70%" }}
        onBlur={handleBlur("workName")}
        required
      />

      <div className="date_inputs" style={{ display: "flex", gap: "90px" }}>
        <input
          type="date"
          name="startDate"
          id="startDate"
          onChange={handleDatechange}
          style={{ width: "30%" }}
          title="Start Date"
        />
        <input
          type="date"
          name="endDate"
          id="endDate"
          onChange={handleDatechange}
          style={{ width: "30%" }}
        />
      </div>

      <TextField
        label="აღწერა"
        name="description"
        value={values.description}
        onChange={handleChange}
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

export default ExperienceFormFields;
