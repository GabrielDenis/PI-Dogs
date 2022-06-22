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
            <ul>
                {
                    allDogs.map(e => {
                        console.log(e)
                        return (
                            <div key={e.name}>
                                <img src={e.image} />
                                <li>{e.name}</li>
                                <li>Temperamento: {e.temperament}</li>
                                <li>Peso: {e.weight}Kg.</li>
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Home