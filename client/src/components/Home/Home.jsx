import React, { useState } from "react";
import { useSelector } from "react-redux";
import Dogs from "../Dogs/Dogs.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import Paging from "../Paging/Paging"
import './Home.css'

function Home () {

    const { allDogs } = useSelector(state => state)

    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)

    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    let currentDog = [allDogs.slice(indexOfFirstDog, indexOfLastDog)]

    const paging = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="homeContainer">
            <NavBar/>
            <Paging
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paging={paging}
            />
            <Dogs currentDog={currentDog}/>
        </div>
    )
}

export default Home