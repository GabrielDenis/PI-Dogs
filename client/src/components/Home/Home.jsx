import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs } from "../../redux/actions/index.js";

function Home () {

    const dispatch = useDispatch();
    let allDogs = useSelector(state => state.allDogs);
    React.useEffect(() => {
        dispatch(getAllDogs())
    },[])

    return (
        <div>
            <input type='text' placeholder="Ingresa una Raza"/>
            <div>
                {
                    allDogs.forEach(e => console.log(e))
                }
            </div>
        </div>
    )
}

export default Home