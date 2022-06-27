import React from "react";
import { Link } from "react-router-dom"
import './Dog.css'

const Dog = (props) => {
  let { id, image, name, temperament, weight } = props
  let validTemperament

  if (Array.isArray(temperament)) {
    validTemperament = temperament.map(e => {
      let a = e.charAt(0).toUpperCase() + e.slice(1)
      return a
    }).join(", ")
  } else {
    validTemperament = temperament
  }

  return (
    <Link className="dogLink" to={`/home/${id}`}>
      <div className='dog'>
        <div>
          <img className="dogImage" src={image} alt={name}/>
        </div>
        <div className="dogInfo">
          <h2 className="dogName">{name}</h2>
          <h4 className="dogTemperament">It's temperaments are: {validTemperament}</h4>
          <h4 className="dogWeight">Between: {weight} Kg.</h4>
        </div>
      </div>
    </Link>
  )
}

export default Dog
