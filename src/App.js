import React, { useState } from "react";
import "./App.css";

//component import
import Header from "./components/Header";
import Search from "./components/Search";
import Weather from "./components/Weather";
import PlaceHolder from "./components/PlaceHolder";

function App() {
  //state variables
  const [cities, setCities] = useState([
    { name: "glossop" },
    { name: "manchester" },
    { name: "hull" },
  ]);
  const [currentCity, setCurrentCity] = useState([{ name: "manchester" }]);

  return (
    <div className="App">
      <Header />
      <Search setCities={setCities} cities={cities} setCurrentCity={setCurrentCity}/>
      <Weather currentCity={currentCity} />
      <PlaceHolder cities={cities} setCities={setCities} currentCity={currentCity} setCurrentCity={setCurrentCity} />
    </div>
  );
}

export default App;
