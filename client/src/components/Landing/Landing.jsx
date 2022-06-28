import React, { useEffect } from "react";
import { useDispatch} from 'react-redux'
import { getAllDogs, getAllTemperaments } from "../../redux/actions/index.js";
import { Link } from 'react-router-dom'
import './Landing.css'
import subimg from '../../images/subrayado.png'

function Landing () {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getAllTemperaments())
    },[dispatch])   

    return (
        <div className='container'>
            <div>
                <h2 className="title">Bienvenido a la App de Chuchos</h2>
                <img className="landingImg" src={subimg} alt="subrayado"/>
            </div>
            <Link to='/home'><button className="btn">Ingresar</button></Link>
        </div>
    )
}

export default Landing