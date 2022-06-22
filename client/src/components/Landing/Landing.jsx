import React from "react";
import img from '../../images/istockphoto-809869206-612x612.jpg'
import { Link } from 'react-router-dom'

function Landing () {
    return (
        <div>
            <img src={img} alt="Chihuahua"/>
            <Link to='/home'>Bienvenido a la App de Chuchos</Link>
        </div>
    )
}

export default Landing