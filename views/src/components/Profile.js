import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import LineChart from "./LineChart";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  let origin;
  if (process.env.NODE_ENV === "development") {
    origin = "http://localhost:5000/form";
  }
  if (process.env.NODE_ENV === "production") {
    origin =
      "https://corsanywhere.herokuapp.com/https://cool-exercise-server.herokuapp.com/form";
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post(origin, { value });
      setResults((results) => [...results, ...response.data]);
    } catch (e) {
      console.log(e);
    }
  };
  
  
  const handleSubmit2 = async () => {
    try {
      const response = await axios.get(
        "https://corsanywhere.herokuapp.com/https://cool-exercise-server.herokuapp.com"
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div className="App">
          <span>Paste Path to File: </span>
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={handleSubmit}>Open</button>
          <button onClick={handleSubmit2}>test(GET)</button>
        </div>
        {results.length > 0 ? <LineChart results={results} /> : null}
      </div>
    )
  );
};

export default Profile;
