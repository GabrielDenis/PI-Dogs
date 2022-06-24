import React, { useEffect } from "react";
import { useDispatch} from 'react-redux'
import { getAllDogs, getAllTemperaments } from "../../redux/actions/index.js";
import img from '../../images/landing_image.jpg'
import { Link } from 'react-router-dom'

function Landing () {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getAllTemperaments())
    },[dispatch])   

    return (
        <div>
            <img src={img} alt="Chihuahua"/>
            <Link to='/home'>Bienvenido a la App de Chuchos</Link>
        </div>
    )
}

export default Landing