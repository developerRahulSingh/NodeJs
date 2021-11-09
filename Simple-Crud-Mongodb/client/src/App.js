import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [updateFoodName, setUpdateFoodName] = useState("");

  useEffect(() => {
    getFoodList();
  }, []);

  const getFoodList = () => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  };

  const addToList = () => {
    Axios.post("http://loca lhost:3001/insert", {
      foodName: foodName,
      days: days,
    }).then((response) => {
      console.log("Success ==>> ", response);
      getFoodList();
    });
  };

  const updateFoodNameFunc = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      updateFoodName: updateFoodName,
    }).then((response) => {
      getFoodList();
    });
  };

  const deleteFoodNameFunc = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      getFoodList();
    });
  };

  return (
    <div className="App">
      <h1> CRUD App with MERN</h1>
      <label>Food Name:</label>
      <input
        type="text"
        onChange={(event) => {
          setFoodName(event.target.value);
        }}
      />
      <label>Days Since You Ate It:</label>
      <input
        type="number"
        onChange={(event) => {
          setDays(event.target.value);
        }}
      />
      <button onClick={addToList}>Add To List</button>
      <h1>Food List</h1>
      {foodList.map((value, key) => {
        return (
          <div key={key} className="food">
            <h1>{value.foodName}</h1>
            <h1>{value.daySinceIAte}</h1>
            <input
              type="text"
              placeholder="Update Food Name"
              onChange={(event) => {
                setUpdateFoodName(event.target.value);
              }}
            />
            <button onClick={() => updateFoodNameFunc(value._id)}>
              Update
            </button>
            <button onClick={() => deleteFoodNameFunc(value._id)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
