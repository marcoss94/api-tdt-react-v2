/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Endpoints } from "../../config/Endpoints";
import { HttpClient } from "../../services/HttpClient";
import "./List.css";
function List({ data, setSpinner, getList, setSelectedOrd }) {
  const navigate = useNavigate();
  const handleDelete = (id) => {
    setSpinner(true);
    HttpClient.customFetch(
      "DELETE",
      Endpoints.DEL_PUT_ORGANIZATION.replace(":id", id),
      null,
      handleSuccess,
      handleError,
      handleAlways
    );
  };

  const handleSuccess = (response) => {
    if (response) {
      getList();
    }
  };

  const handleError = (error) => {
    console.log(error);
    setSpinner(false);
  };
  const handleAlways = () => {};
  const handleEdit = (id, name, aliasName) => {
    setSelectedOrd({
      id,
      name,
      aliasName,
    });
  };

  const handleView = (id) => {
    navigate(`/detail/${id}`);
  };
  return (
    <section className="organization-list">
      <h1>Organization List</h1>
      <ul>
        {data.map(({ id, attributes }) => (
          <li key={id}>
            <div>
              {attributes.name} - {attributes.alias_name}
            </div>
            <div>
              <button onClick={() => handleView(id)}>View</button>
              {/* <Link to={`/detail/${id}`}>View</Link> */}
              <button
                onClick={() =>
                  handleEdit(id, attributes.name, attributes.alias_name)
                }
              >
                Edit
              </button>
              <button onClick={() => handleDelete(id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default List;
