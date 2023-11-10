import { useState } from "react";
import "./Form.css";

function Form() {
  const [name, setName] = useState("");
  const [aliasName, setAliasName] = useState("");

  const handleInputChange = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else {
      setAliasName(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  console.log(name);
  console.log(aliasName);
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="alias_name"
          placeholder="Alias name"
          onChange={handleInputChange}
        />
        <input type="submit" name="create" value={"Create"} />
      </form>
    </section>
  );
}

export default Form;
