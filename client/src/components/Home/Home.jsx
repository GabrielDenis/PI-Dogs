import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDogs, getAllTemperaments } from "../../redux/actions/index.js";
import Dogs from "../Dogs/Dogs.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import Paging from "../Paging/Paging"
import Loading from '../Loading/Loading'
import './Home.css'

function Home () {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getAllTemperaments())
    },[dispatch])  

    const { allDogs } = useSelector(state => state)

    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage] = useState(8)

    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    let currentDog = [allDogs.slice(indexOfFirstDog, indexOfLastDog)]

    const paging = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return allDogs.length === 0 ? (
        <Loading/>
    ) : (
        <div className="homeContainer">
            <NavBar
                paging={paging}
            />
            <Paging
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paging={paging}
            />
            {allDogs[0] === "empty" ? (
                <h1>Dogs not Found</h1>
            ) : <Dogs currentDog={currentDog}/>
            }
        </div>
    )
}

export default Home