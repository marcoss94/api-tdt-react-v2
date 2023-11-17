import { useEffect, useState } from "react";
import { HttpClient } from "../../services/HttpClient";
import { Endpoints } from "../../config/Endpoints";
import Spinner from "../../components/Spinner/Spinner";
import List from "../../components/List/List";
import Form from "../../components/Form/Form";

function Home() {
  const [data, setData] = useState([]);
  const [selectedOrd, setSelectedOrd] = useState({
    id: null,
    name: "",
    aliasName: "",
  });
  const [spinner, setSpinner] = useState(false);

  const getOrganization = () => {
    setSpinner(true);
    HttpClient.customFetch(
      "GET",
      Endpoints.GET_ORGANIZATION,
      null,
      handleSuccess,
      handleError,
      handleAlways
    );
  };

  const handleSuccess = (response) => {
    setData(response.data.slice(0, 10));
  };

  const handleError = (error) => {
    console.log(error);
  };
  const handleAlways = () => {
    setSpinner(false);
  };

  useEffect(() => {
    getOrganization();
  }, []);
  return (
    <div>
      <Form
        setSpinner={setSpinner}
        getList={getOrganization}
        selectedOrd={selectedOrd}
        setSelectedOrd={setSelectedOrd}
      />
      <Spinner spinner={spinner} />
      <List
        data={data}
        setSpinner={setSpinner}
        getList={getOrganization}
        setSelectedOrd={setSelectedOrd}
      />
    </div>
  );
}

export default Home;
