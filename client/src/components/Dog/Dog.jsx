import React from "react";
import imageDb from "../../images/default_dog.jpg"
import { Link } from "react-router-dom"

const Dog = (props) => {
  let { id, image, name, temperament, weight } = props
  let validTemperament, validImage

  if (Array.isArray(temperament)) {
    validTemperament = temperament.map(e => {
      let a = e.charAt(0).toUpperCase() + e.slice(1)
      return a
    }).join(", ")
    validImage = imageDb
  } else {
    validTemperament = temperament
    validImage = image
  }

  return (
    <Link to={`/home/${id}`}>
      <div className='dog'>
        <div className="dogImage">
          <img src={validImage} alt={name}/>
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
