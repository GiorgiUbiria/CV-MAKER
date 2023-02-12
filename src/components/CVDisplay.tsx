import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const element = <FontAwesomeIcon icon={faAt} />;
const element2 = <FontAwesomeIcon icon={faPhone} />;

const CVDisplay = (props: any) => {
  const { fieldValues, experienceData, educationData } = props;

  const [degrees, setDegrees] = useState();

  const [generalInfo, setGeneralInfo] = useState(() => {
    const generalData = sessionStorage.getItem("form-data");
    return generalData ? JSON.parse(generalData) : fieldValues;
  });

  const [experienceFormData, setExperienceFormData] = useState(() => {
    const experience = sessionStorage.getItem("forms");
    return experience ? JSON.parse(experience) : experienceData;
  });

  const [educationFormData, setEducationFormData] = useState(() => {
    const education = sessionStorage.getItem("education");
    return education ? JSON.parse(education) : educationData;
  });

  useEffect(() => {
    fetch("https://resume.redberryinternship.ge/api/degrees")
      .then((response) => response.json())
      .then((data) => setDegrees(data));
  }, []);

  useEffect(() => {
    setGeneralInfo(JSON.parse(sessionStorage.getItem("form-data") as string));
  }, [fieldValues]);

  useEffect(() => {
    setExperienceFormData(
      JSON.parse(sessionStorage.getItem("forms") as string)
    );
  }, [experienceData]);

  useEffect(() => {
    setEducationFormData(
      JSON.parse(sessionStorage.getItem("education") as string)
    );
  }, [educationData]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="general_information" key={"general"}>
        <div
          style={{
            marginLeft: "100px",
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginRight: "40px",
            }}
          >
            <div>
              <h1
                style={{
                  color: "#F93B1D",
                  fontWeight: "bold",
                  fontSize: "36px",
                }}
              >
                {" "}
                {generalInfo?.name} {generalInfo?.surname}{" "}
              </h1>
              {generalInfo?.email && (
                <>
                  <p
                    style={{
                      color: "#7E7E7E",
                      fontSize: "20px",
                      marginTop: "30px",
                    }}
                  >
                    <span style={{ marginRight: "10px" }}>{element}</span>{" "}
                    {generalInfo?.email}
                  </p>
                </>
              )}
              {generalInfo?.phone_number && (
                <>
                  <p
                    style={{
                      color: "#7E7E7E",
                      fontSize: "20px",
                      marginTop: "10px",
                    }}
                  >
                    <span style={{ marginRight: "10px" }}>{element2}</span>
                    {generalInfo?.phone_number}
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
                    <h4
                      style={{
                        color: "#F93B1D",
                        marginTop: "30px",
                        fontWeight: "bold",
                        fontSize: "26px",
                      }}
                    >
                      ჩემ შესახებ
                    </h4>
                    <p
                      style={{
                        marginTop: "15px",
                        width: "400px",
                        fontSize: "20px",
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
              </div>
            </div>
            {generalInfo?.image && (
              <img
                src={generalInfo?.image}
                alt="Image"
                style={{
                  borderRadius: "50%",
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <hr
            style={{
              width: "90%",
              marginTop: "10px",
            }}
          />
        </div>
      </div>

      {experienceFormData !== null && (
        <>
          <div
            className="experience"
            key={"experience"}
            style={{
              marginLeft: "100px",
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2
              style={{ color: "#F93B1D", fontWeight: "bold", fontSize: "32px" }}
            >
              {" "}
              გამოცდილება{" "}
            </h2>
            {experienceFormData?.map((data: any) => (
              <>
                <h5
                  style={{
                    marginTop: "15px",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                  key={data.id + "_position"}
                >
                  {" "}
                  {`${data?.values?.position},`} {data?.values?.employer}{" "}
                </h5>
                <p
                  key={data.id + "_start_date"}
                  style={{ color: "gray", marginTop: "10px", fontSize: "16px" }}
                >
                  <i>
                    {" "}
                    {data?.values?.start_date} - {data?.values?.due_date}
                  </i>
                </p>
                <p
                  key={data.id + "_description"}
                  style={{
                    marginTop: "10px",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  {data?.values?.description}
                </p>
                <br />
              </>
            ))}
          </div>
          <hr
            style={{
              width: "78%",
              marginTop: "10px",
              marginLeft: "100px",
            }}
          />
        </>
      )}

      <div
        className="education"
        key={"education"}
        style={{
          marginLeft: "100px",
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {educationFormData !== null && (
          <>
            <h2
              style={{ color: "#F93B1D", fontWeight: "bold", fontSize: "32px" }}
            >
              {" "}
              განათლება{" "}
            </h2>
            {educationFormData?.map((data: any) => (
              <>
                <p
                  style={{
                    marginTop: "15px",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                  key={data.id + "_institute"}
                >
                  {" "}
                  {data?.values?.institute}
                  {", "}
                  {data &&
                    data.values &&
                    data.values.degree &&
                    (degrees as any)[data.values.degree - 1]?.title}
                </p>
                <p
                  key={data.id + "_due_date"}
                  style={{ color: "gray", marginTop: "10px", fontSize: "16px" }}
                >
                  <i> {data?.values?.due_date}</i>
                </p>
                <p
                  key={data.id + "_description"}
                  style={{
                    marginTop: "10px",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
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
