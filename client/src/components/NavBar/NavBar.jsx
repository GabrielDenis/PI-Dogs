import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import image from '../../images/logo.png'
import { getDogByName, orderDogs, temperamentsFilter, createdInDb, raceFilter } from '../../redux/actions'
import './NavBar.css'


const NavBar = ({ paging }) => {

    let propsTemperaments = useSelector(state => state.allTemperaments)
    let propsDogs = useSelector(state => state.allDogs)
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    //filtro por nombre
    const handleOnChange = (e) => {
        e.preventDefault()
        setName(e.target.value);
    }
    
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getDogByName(name))
        paging(1)
    }

    const handleEmpty = (e) => {
        e.preventDefault()
        setName('')
        dispatch(getDogByName(''))
        paging(1)
    }

    //filtro por temperamento
    const handleOnChangeTemperaments = (e) => {
        dispatch(temperamentsFilter(e.target.value))
        paging(1)
    }

    //filtro raza
    const handleOnChangeRace = (e) => {
        dispatch(raceFilter(e.target.value))
        paging(1)
    }

    //filtro alfabetico
    const handleOnChangeFilter = (e) => {
        dispatch(orderDogs(e.target.value))
        paging(1)
    }
    
    //Filtro DB
    const handleFilterOrigin = (e) => {
        dispatch(createdInDb(e.target.value))
        paging(1)
    }

    return (
        <div className='navBarContainer'>
            <Link to={"/"}>
                <img className='logo' src={image} alt='logo'/>
            </Link>
            <div className='searchName'>
                <h5>Search by name:</h5>
                <input type="text" placeholder='Name...' value={name} onChange={(e) => handleOnChange(e)}/>
                <button type='submit' onClick={(e) => handleClick(e)}>Search</button>
                <button type='submit' onClick={(e) => handleEmpty(e)}>Empty</button>
            </div>
            <div className='filterContainer'>
                <div className='filterTemp'>
                    <h5>Filter by temperament:</h5>
                    <select onChange={(e) => handleOnChangeTemperaments(e)}>
                        <option value="all">All temperaments</option>
                        {propsTemperaments?.map(e => {
                            return <option value={e.name} key={e.id}>{e.name}</option>
                        })}
                    </select>
                </div>
                <div className='filterDB'>
                    <h5>Created by:</h5>
                    <select onChange={(e) => handleFilterOrigin(e)}>
                        <option value="todos">All dogs</option>
                        <option value="db">Data Base</option>
                        <option value="api">Api</option>
                    </select>
                </div>
                <div className='filterRace'>
                    <h5>Order by Race:</h5>
                    <select onChange={(e) => handleOnChangeRace(e)}>
                        <option value="allRace">All races</option>
                        {propsDogs?.map(e => {
                            return <option value={e.name} key={e.name}>{e.name}</option>
                        })}
                    </select>
                </div>
                <div className='filterAD'>
                    <h5>Order by:</h5>
                    <select onChange={(e) => handleOnChangeFilter(e)}>
                        <option value="all">None</option>
                        <option value="ascendente">A - Z</option>
                        <option value="descendente">Z - A</option>
                        <option value="min">Avarage Minimum Weight</option>
                        <option value="max">Avarage Maximum Weight</option>
                    </select>
                </div>
                <div className='create'>
                    <Link className='createLink' to="/create">Create your own Race!</Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar