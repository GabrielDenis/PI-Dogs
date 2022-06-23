import React from "react";

const Dog = (props) => {
  let { image, name, temperament, weight } = props
  let validTemperament
  console.log(temperament)
  if (Array.isArray(temperament)) {
    validTemperament = temperament.map(e => {
      let a = e.charAt(0).toUpperCase() + e.slice(1)
      return a
    }).join(", ")
  } else {
    validTemperament = temperament
  }
  return (
    <div className='dog'>
      <div className="dogImage">
        <img src={image} alt={name}/>
      </div>
      <div className="dogInfo">
        <h2 className="dogName">{name}</h2>
        <h4 className="dogTemperament">It's temperaments are: {validTemperament}</h4>
        <h4 className="dogWeight">Between: {weight} Kg.</h4>
      </div>
    </div>
  )
}

export default Dog
