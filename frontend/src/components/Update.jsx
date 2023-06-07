import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  async function getSingleUser() {
    const response = await fetch(`http://localhost:5000/${id}`);

    const result = await response.json();

    if (!response.ok) {
      console.log("Error:", result.Error);
      setError(result.Error);
    }

    if (response.ok) {
      setError("");
      console.log("Updated User:", result);
      setName(result.name);
      setAge(result.age);
      setEmail(result.email);
    }
  }

  async function handleUpdate(d) {
    d.preventDefault();

    const updateUser = { name, email, age };

    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log("Error:", result.Error);
      setError(result.Error);
    }

    if (response.ok) {
      console.log("Update Result:", result);
      setError("");
      setName("");
      setAge(0);
      setEmail("");
      navigate("/all");
    }
  }

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className="text-center">Edit the Data</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
