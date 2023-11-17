/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Form.css";
import { HttpClient } from "../../services/HttpClient";
import { Endpoints } from "../../config/Endpoints";

function Form({ setSpinner, getList, selectedOrd, setSelectedOrd }) {
  const [name, setName] = useState("");
  const [aliasName, setAliasName] = useState("");

  useEffect(() => {
    setName(selectedOrd.name);
    setAliasName(selectedOrd.aliasName);
  }, [selectedOrd]);

  const handleInputChange = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else {
      setAliasName(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSpinner(true);
    if (selectedOrd.id) {
      let params = {
        data: {
          id: selectedOrd.id,
          type: "organizations",
          attributes: {
            name: name,
            alias_name: aliasName,
            organization_type_id: 2,
            subcategory_id: 92,
          },
        },
      };

      HttpClient.customFetch(
        "PUT",
        Endpoints.DEL_PUT_ORGANIZATION.replace(":id", selectedOrd.id),
        JSON.stringify(params),
        handleSuccess,
        handleError,
        handleAlways
      );
    } else {
      var formData = new FormData();
      formData.append("data[type]", "organizations");
      formData.append("data[attributes][name]", name);
      formData.append("data[attributes][alias_name]", aliasName);
      formData.append("data[attributes][organization_type_id]", "2");
      formData.append("data[attributes][subcategory_id]", "286");

      HttpClient.customFetch(
        "POST",
        Endpoints.POST_ORGANIZATION,
        formData,
        handleSuccess,
        handleError,
        handleAlways
      );
    }
  };

  const handleSuccess = (response) => {
    if (response) {
      if (selectedOrd.id) {
        setSelectedOrd({
          id: null,
          name: "",
          aliasName: "",
        });
        alert("Se edito la organizacion");
      } else {
        alert("Se creo la organizacion");
      }
      getList();
      setAliasName("");
      setName("");
    }
  };

  const handleError = (error) => {
    console.log(error);
  };

  const handleAlways = () => {
    // setSpinner(false);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="alias_name"
          value={aliasName}
          placeholder="Alias name"
          onChange={handleInputChange}
        />
        <input
          type="submit"
          name="create"
          value={selectedOrd.id ? "Edit" : "Create"}
        />
      </form>
    </section>
  );
}

export default Form;
