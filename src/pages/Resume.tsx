import CVDisplay from "../components/CVDisplay";

const Resume = (props: any) => {
  const { fieldValues, experienceData, educationData } = props;
  return (
    <CVDisplay
      fieldValues={fieldValues}
      experienceData={experienceData}
      educationData={educationData}
    />
  );
};

export default Resume;
