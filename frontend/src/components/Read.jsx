import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  async function getData() {
    const response = await fetch("http://localhost:5000");

    const result = await response.json();

    if (!response.ok) {
      console.log("Error:", result.Error);
      setError(result.Error);
    }

    if (response.ok) {
      setData(result);
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      console.log("Error:", result.Error);
      setError(result.Error);
    }

    if (response.ok) {
      setError("Deleted Successfully");

      setTimeout(() => {
        setError("");
        getData();
      }, 2000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className="text-center">All Data</h2>
      <div className="row">
        {data.map((d) => (
          <div key={d._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{d.name}</h5>
                <h6 className="card-text">{d.email}</h6>
                <h6 className="card-text">{d.age}</h6>
                <Link to={`/${d._id}`} className="card-link">
                  Edit
                </Link>
                <a
                  href="#"
                  className="card-link"
                  onClick={() => handleDelete(d._id)}
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
