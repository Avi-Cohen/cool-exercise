import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  /*
  check connection to back
  */
  // useEffect(() => {
  //   const fetch = async () => {
  //     const data = await axios.get("http://localhost:5000/");
  //     console.log(data);
  //   };
  //   fetch();
  // }, []);
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log(results);
  }, [results]);
  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:5000/form", { value });
    console.log(response);
    setResults((results) => [...results, ...response.data]);
  };
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div className="App">
          in App
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={handleSubmit}>Submit value</button>
        </div>
        <div>
          {results.map(result => (<div>{JSON.stringify(result)}</div>))}
        </div>
      </div>
    )
  );
};

export default Profile;
