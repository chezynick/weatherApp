import React, { useState } from "react";

const Search = ({ cities, setCities, setCurrentCity }) => {
  //state for adding new city to list
  const [newCity, setNewCity] = useState({ name: "" });
  //event handlers
  const changeHandler = (e) => {
    setNewCity({ name: e.target.value });
    console.log(newCity);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setCities([...cities, newCity]);
    setCurrentCity([newCity])
    
  };
  return (
    <form className="Search" onChange={changeHandler} onSubmit={submitHandler}>
      <input type="text" placeholder="Search for your City?" />
      <button type="submit">Submit</button>
    </form>
  );
};
export default Search;
