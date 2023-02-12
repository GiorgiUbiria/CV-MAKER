import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const element = <FontAwesomeIcon icon={faAt} />;
const element2 = <FontAwesomeIcon icon={faPhone} />;

const Resume = () => {
  const [data, setData] = useState(() => {
    const storedValues = sessionStorage.getItem("finalData");
    return storedValues ? JSON.parse(storedValues) : null;
  });

  useEffect(() => {
    const finalResults = JSON.parse(
      sessionStorage.getItem("finalResults") as string
    );
    setData(finalResults);
  }, []);

  return (
    <div>
      <div className="general_information">
        <div style={{ display: "flex", gap: "4rem" }}>
          <div>
            <h1
              style={{ color: "#F93B1D", fontWeight: "bold", fontSize: "36px" }}
            >
              {" "}
              {data?.name} {data?.surname}{" "}
            </h1>

            <p
              style={{
                color: "#7E7E7E",
                fontSize: "20px",
                marginTop: "30px",
              }}
            >
              <span style={{ marginRight: "10px" }}>{element}</span>{" "}
              {data?.email}
            </p>

            <p
              style={{
                marginTop: "15px",
                color: "#7E7E7E",
                fontSize: "20px",
              }}
            >
              <span style={{ marginRight: "10px" }}>{element2}</span>
              {"+" +
                data?.phone_number.slice(1, 4) +
                " " +
                data?.phone_number.slice(4, 7) +
                " " +
                data?.phone_number.slice(7, 9) +
                " " +
                data?.phone_number.slice(9, 11) +
                " " +
                data?.phone_number.slice(11, 13)}
            </p>

            <div
              className="about_me"
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "5px",
                fontWeight: "bold",
                fontSize: "26px",
              }}
            >
              <h4 style={{ color: "#F93B1D", marginTop: "30px" }}>
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
                {data?.about_me}
              </p>
            </div>
          </div>
          <img
            src={`https://resume.redberryinternship.ge${data?.image}`}
            alt="Image"
            style={{
              borderRadius: "50%",
              width: "230px",
              height: "230px",
              objectFit: "cover",
            }}
          />
        </div>
        <hr
          style={{
            marginTop: "20px",
          }}
        />
      </div>
      <div
        className="experience"
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ color: "#F93B1D", fontWeight: "bold", fontSize: "32px" }}>
          {" "}
          გამოცდილება{" "}
        </h2>
        {data?.experiences.map((field: any) => (
          <>
            <h5
              style={{
                marginTop: "15px",
                fontSize: "20px",
                fontWeight: "500",
              }}
              key={field.id + "_position"}
            >
              {" "}
              {field?.position}, {field?.employer}{" "}
            </h5>
            <p
              key={field.id + "_start_date"}
              style={{ color: "gray", marginTop: "10px", fontSize: "16px" }}
            >
              <i>
                {" "}
                {field?.start_date} - {field?.due_date}
              </i>
            </p>
            <p
              key={field.id + "_description"}
              style={{ marginTop: "10px", fontSize: "20px", fontWeight: "500" }}
            >
              {field?.description}
            </p>
            <br />
          </>
        ))}
      </div>
      <hr />
      <div
        className="education"
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ color: "#F93B1D", fontWeight: "bold", fontSize: "32px" }}>
          {" "}
          განათლება{" "}
        </h2>
        {data?.educations.map((field: any) => (
          <>
            <p
              style={{ marginTop: "15px", fontSize: "20px", fontWeight: "500" }}
              key={field.id + "_institute"}
            >
              {" "}
              {field?.institute}
              {", "}
              {field?.degree}
            </p>
            <p
              key={field.id + "_due_date"}
              style={{ color: "gray", marginTop: "10px", fontSize: "16px" }}
            >
              {" "}
              <i>{field?.due_date}</i>
            </p>
            <p
              key={field.id + "_description"}
              style={{ marginTop: "10px", fontSize: "20px", fontWeight: "500" }}
            >
              {field?.description}
            </p>
          </>
        ))}
        <img
          src="/cv-logo.png"
          alt="cv_logo"
          style={{
            width: "50px",
            height: "auto",
            position: "relative",
            top: "100px",
          }}
        />
      </div>
    </div>
  );
};

export default Resume;
