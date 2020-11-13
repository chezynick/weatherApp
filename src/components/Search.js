import React, { useState } from "react";

const Search = ({ cities, setCities, setCurrentCity, currentCity }) => {
  //state for adding new city to list
  const [newCity, setNewCity] = useState({ name: "" });
  //event handlers
  const changeHandler = (e) => {
    setNewCity({ name: e.target.value });
    
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setCities([...cities, newCity]);
    setCurrentCity([newCity]);
    setNewCity({ name: "" })
    
    return currentCity;
  };

  return (
    <form className="Search" onChange={changeHandler} onSubmit={submitHandler}>
      <input type="text" placeholder="Search for your City?" value={newCity.name}/>
      <button type="submit">Submit</button>
    </form>
  );
};
export default Search;
