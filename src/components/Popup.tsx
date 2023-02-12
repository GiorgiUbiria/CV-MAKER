import { useState } from "react";

import { Alert, Snackbar } from "@mui/material";

const Popup = () => {
  const [open, setOpen] = useState({
    opened: true,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, opened } = open;

  const handleClose = () => {
    setOpen({ ...open, opened: false });
  };

  return (
    <Snackbar
      open={opened}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={6000}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{ width: "100%" }}
        style={{
          backgroundColor: "white",
          height: "80px",
          fontSize: "20px",
          boxShadow: "0px 2px 4px #000",
          display: "flex",
          alignItems: "center",
        }}
      >
        რეზიუმე წარმატებით გაიგზავნა
      </Alert>
    </Snackbar>
  );
};

export default Popup;
