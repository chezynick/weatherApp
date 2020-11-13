import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const PlaceHolder = ({ cities, setCities, setCurrentCity}) => {

  //select and delete functions 
  
const changeHandler = (e) => {
 
    const newCity = cities.filter(city => city.name === e.target.innerText)
    setCurrentCity(newCity)
    
}
  return (
    <div className="PlaceHolder">
      {cities.map((city) => {
        return (<div className="Place" key={city.name} onClick={changeHandler}>
        <h1 className='placeNames' >{city.name}</h1>
        <FontAwesomeIcon   className="trash" size="2x" icon={faTrashAlt} />
</div>
        )
      })}
    </div>
  );
};
export default PlaceHolder;
