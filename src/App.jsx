import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import List from "./components/List/List";
import Navbar from "./components/Navbar/Navbar";
import { HttpClient } from "./services/HttpClient";
import { Endpoints } from "./config/Endpoints";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const [data, setData] = useState([]);
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
    <main>
      <Navbar />
      <Form />
      <Spinner spinner={spinner} />
      <List data={data} />
    </main>
  );
}

export default App;
