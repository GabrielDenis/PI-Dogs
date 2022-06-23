import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs } from "../../redux/actions/index.js";
import Dogs from "../Dogs/Dogs.jsx";

function Home () {

    const dispatch = useDispatch();
    let allDogs = useSelector(state => state.allDogs);
    React.useEffect(() => {
        dispatch(getAllDogs())
    },[])

    return (
        <div>
            <input type='text' placeholder="Ingresa una Raza"/>
            <Dogs/>
        </div>
    )
}

export default Home