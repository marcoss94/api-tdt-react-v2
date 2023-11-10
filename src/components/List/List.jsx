/* eslint-disable react/prop-types */
import "./List.css";
function List({ data }) {
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
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default List;
