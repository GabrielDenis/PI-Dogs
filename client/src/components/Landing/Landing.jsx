import React from "react";
import { Link } from 'react-router-dom'
import './Landing.css'
import subimg from '../../images/subrayado.png'

function Landing () { 

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