import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HttpClient } from "../../services/HttpClient";
import { Endpoints } from "../../config/Endpoints";
import Spinner from "../../components/Spinner/Spinner";

function Detail() {
  const [data, setData] = useState({});
  const [spinner, setSpinner] = useState(false);
  let { orgId } = useParams();

  useEffect(() => {
    setSpinner(true);
    HttpClient.customFetch(
      "GET",
      Endpoints.DEL_PUT_ORGANIZATION.replace(":id", orgId),
      null,
      handleSuccess,
      handleError,
      handleAlways
    );
  }, []);

  const handleSuccess = (response) => {
    console.log(response.data);
    setData(response.data);
  };

  const handleError = (error) => {
    console.log(error);
  };

  const handleAlways = () => {
    setSpinner(false);
  };

  return (
    <div>
      {" "}
      <Spinner spinner={spinner} />
      {data.id && (
        <>
          <h1>Detail of {data.attributes.name}</h1>
          <p>{data.attributes.alias_name}</p>
        </>
      )}
    </div>
  );
}

export default Detail;
