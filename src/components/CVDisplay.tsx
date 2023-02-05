import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faAt} />;
const element2 = <FontAwesomeIcon icon={faPhone} />;

const CVDisplay = (props: any) => {
  const { fieldValues, experienceData } = props;

  return (
    <>
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
            {fieldValues?.name} {fieldValues?.surname}{" "}
          </h1>
          <p style={{ marginTop: "30px", color: "#7E7E7E", fontSize: "20px" }}>
            <span style={{ marginRight: "10px" }}>{element2}</span>
            {fieldValues?.phoneNumber}
          </p>
          <p style={{ color: "#7E7E7E", fontSize: "20px" }}>
            <span style={{ marginRight: "10px" }}>{element}</span>{" "}
            {fieldValues?.email}
          </p>
          <div
            className="aboutMe"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4 style={{ color: "#F93B1D", marginTop: "30px" }}>ჩემ შესახებ</h4>
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
              {fieldValues?.aboutMe}
            </p>
            <hr
              style={{
                width: "90%",
                marginTop: "10px",
              }}
            />
          </div>
        </div>
        <img
          src={fieldValues?.image}
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
        {experienceData?.map((data: any) => (
          <>
            <h5 style={{ marginTop: "10px" }} key={data.id + "_position"}>
              {" "}
              {data?.values?.position}{" "}
            </h5>
            <h5 style={{ marginTop: "10px" }} key={data.id + "_workName"}>
              {" "}
              {data?.values?.workName}{" "}
            </h5>
            <p key={data.id + "_startDate"}>
              {" "}
              {data?.values?.startDate} - {data?.values?.endDate}
            </p>
            <p key={data.id + "_description"}>{data?.values?.description}</p>
            <br />
          </>
        ))}
      </div>
    </>
  );
};

export default CVDisplay;
