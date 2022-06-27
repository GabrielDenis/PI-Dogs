import React, { useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux'
import { getDetails } from "../../redux/actions/index.js";

const Detail = (props) => {

    const dispatch = useDispatch();
    const dogDetail = useSelector(state => state.dogDetail)
    const id = props.match.params.id
    
    useEffect(() => {
        dispatch(getDetails(id))
    },[dispatch, id]) 
    console.log(dogDetail)
    return (
        <div className='dog' key={dogDetail[0]?.id}>
            <div className="dogImage">
                <img src={dogDetail[0]?.image} alt={dogDetail[0]?.name}/>
            </div>
            <div className="dogInfo">
                <h2 className="dogName">{dogDetail[0]?.name}</h2>
                <h4 className="dogTemperament">It's temperaments are: {dogDetail[0]?.temperament}</h4>
                <h4 className="dogHeight">Height: between {dogDetail[0]?.height} Cm.</h4>
                <h4 className="dogWeight">Weight: between {dogDetail[0]?.weight} Kg.</h4>
                <h4 className="dogLifeSpan">Life Span: between {dogDetail[0]?.lifeSpan}.</h4>
            </div>
        </div>
    )
}

export default Detail