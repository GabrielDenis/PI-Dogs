import React, { useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux'
import { getDetails } from "../../redux/actions/index.js";
import img from '../../images/default_dog.jpg'
import './Detail.css'
import { Link } from "react-router-dom";
import image from '../../images/logo.png'

const Detail = (props) => {

    const dispatch = useDispatch();
    const dogDetail = useSelector(state => state.dogDetail)
    const id = props.match.params.id
    
    useEffect(() => {
        dispatch(getDetails(id))
    },[dispatch, id]) 

    return (
        <div className='dogDetail' key={dogDetail[0]?.id}>
            <Link to={"/home"}>
                <img className='logo' src={image} alt='logo'/>
            </Link>
            <div className="dogInfoContainer">
                <div>
                    <img className="dogImage" src={dogDetail[0]?.image ? dogDetail[0].image : img } alt={dogDetail[0]?.name}/>
                </div>
                <div className="dogInfo">
                    <h2 className="dogName">{dogDetail[0]?.name}</h2>
                    <h4 className="dogTemperament">It's temperaments are: {
                        Array.isArray(dogDetail[0]?.temperament) ? dogDetail[0].temperament.map(e => e + " ") : dogDetail[0]?.temperament
                    }</h4>
                    <h4 className="dogHeight">Height: between {dogDetail[0]?.height} Cm.</h4>
                    <h4 className="dogWeight">Weight: between {dogDetail[0]?.weight} Kg.</h4>
                    <h4 className="dogLifeSpan">Life Span: between {dogDetail[0]?.lifeSpan}</h4>
                </div>
            </div>
        </div>
    )
}

export default Detail