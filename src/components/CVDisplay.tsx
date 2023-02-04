const CVDisplay = (props: any) => {
  const { values } = props;

  return (
    <div style={{ marginLeft: "100px" }}>
      <h2>CV</h2>
      <p>
        Name: {values?.name} {values?.surname}
      </p>
      <p>About Me: {values?.aboutMe}</p>
      <p>Email: {values?.email}</p>
      <p>Phone Number: {values?.phoneNumber}</p>
    </div>
  );
};

export default CVDisplay;
