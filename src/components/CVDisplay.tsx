import { useEffect, useState } from "react";

const CVDisplay = (props: any) => {
  const { fieldValues } = props;

  return (
    <div style={{ marginLeft: "100px" }}>
      <h2>CV</h2>
      <p>
        Name: {fieldValues?.name} {fieldValues?.surname}
      </p>
      <img src={fieldValues?.image} alt="Image" />
      <p>About Me: {fieldValues?.aboutMe}</p>
      <p>Email: {fieldValues?.email}</p>
      <p>Phone Number: {fieldValues?.phoneNumber}</p>
    </div>
  );
};

export default CVDisplay;
