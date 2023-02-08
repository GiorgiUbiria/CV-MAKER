import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const element = <FontAwesomeIcon icon={faAt} />;
const element2 = <FontAwesomeIcon icon={faPhone} />;

const CVDisplay = (props: any) => {
  const { fieldValues, experienceData, educationData } = props;

  const [generalInfo, setGeneralInfo] = useState(() => {
    const generalData = localStorage.getItem("form-data");
    return generalData ? JSON.parse(generalData) : fieldValues;
  });

  const [experienceFormData, setExperienceFormData] = useState(() => {
    const experience = localStorage.getItem("forms");
    return experience ? JSON.parse(experience) : experienceData;
  });

  const [educationFormData, setEducationFormData] = useState(() => {
    const education = localStorage.getItem("education");
    return education ? JSON.parse(education) : educationData;
  });

  useEffect(() => {
    setGeneralInfo(JSON.parse(localStorage.getItem("form-data") as string));
  }, [fieldValues]);

  useEffect(() => {
    setExperienceFormData(JSON.parse(localStorage.getItem("forms") as string));
  }, [experienceData]);

  useEffect(() => {
    setEducationFormData(
      JSON.parse(localStorage.getItem("education") as string)
    );
  }, [educationData]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="general_information">
        <div
          style={{
            marginLeft: "100px",
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 style={{ color: "#F93B1D" }}>
            {" "}
            {generalInfo?.name} {generalInfo?.surname}{" "}
          </h1>
          {generalInfo?.phone_number && (
            <>
              <p
                style={{
                  marginTop: "30px",
                  color: "#7E7E7E",
                  fontSize: "20px",
                }}
              >
                <span style={{ marginRight: "10px" }}>{element2}</span>
                {generalInfo?.phone_number}
              </p>
            </>
          )}
          {generalInfo?.email && (
            <>
              <p style={{ color: "#7E7E7E", fontSize: "20px" }}>
                <span style={{ marginRight: "10px" }}>{element}</span>{" "}
                {generalInfo?.email}
              </p>
            </>
          )}
          <div
            className="about_me"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {generalInfo?.about_me && (
              <>
                <h4 style={{ color: "#F93B1D", marginTop: "30px" }}>
                  ჩემ შესახებ
                </h4>
                <p
                  style={{
                    marginTop: "10px",
                    width: "400px",
                    fontSize: "17px",
                    fontWeight: "500",
                    wordWrap: "break-word",
                    display: "block",
                  }}
                >
                  {" "}
                  {generalInfo?.about_me}
                </p>
              </>
            )}
            <hr
              style={{
                width: "90%",
                marginTop: "10px",
              }}
            />
          </div>
        </div>
        <img
          src={generalInfo?.image}
          alt="Image"
          style={{
            borderRadius: "50%",
            width: "250px",
            height: "250px",
            objectFit: "cover",
            position: "absolute",
            right: "20px",
            top: "50px",
          }}
        />
        <div />
      </div>

      {experienceFormData !== null && (
        <>
          <div
            className="experience"
            style={{
              marginLeft: "100px",
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2 style={{ color: "#F93B1D" }}> გამოცდილება </h2>
            {experienceFormData?.map((data: any) => (
              <>
                <h5
                  style={{ marginTop: "10px", fontSize: "20px" }}
                  key={data.id + "_position"}
                >
                  {" "}
                  {data?.values?.position}, {data?.values?.employer}{" "}
                </h5>
                <p
                  key={data.id + "_start_date"}
                  style={{ color: "gray", marginTop: "5px" }}
                >
                  <i>
                    {" "}
                    {data?.values?.start_date} - {data?.values?.due_date}
                  </i>
                </p>
                <p key={data.id + "_description"}>
                  {data?.values?.description}
                </p>
                <br />
              </>
            ))}
          </div>
          <hr />
        </>
      )}

      <div
        className="education"
        style={{
          marginLeft: "100px",
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {educationFormData !== null && (
          <>
            <h2 style={{ color: "#F93B1D" }}> განათლება </h2>
            {educationFormData?.map((data: any) => (
              <>
                <p style={{ marginTop: "10px" }} key={data.id + "_institute"}>
                  {" "}
                  {data?.values?.institute}
                  {", "}
                  {data?.values?.degree}
                </p>
                <p key={data.id + "_due_date"}> {data?.values?.due_date}</p>
                <p key={data.id + "_description"}>
                  {data?.values?.description}
                </p>
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CVDisplay;
