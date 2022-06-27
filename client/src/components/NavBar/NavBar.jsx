import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import image from '../../images/logo.png'
import { getDogByName, orderDogs, temperamentsFilter } from '../../redux/actions'
import './NavBar.css'


const NavBar = () => {

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
    }

    const handleEmpty = (e) => {
        e.preventDefault()
        setName('')
        dispatch(getDogByName(''))
    }

    //filtro por temperamento
    const handleOnChangeTemperaments = (e) => {
        dispatch(temperamentsFilter(e.target.value))
    }

    //filtro alfabetico
    const handleOnChangeFilter = (e) => {
        dispatch(orderDogs(e.target.value))
    }

    return (
        <div>
            <Link to={"/home"}>
                <img className='logo' src={image} alt='logo'/>
            </Link>
            <div>
                <h5>Buscar por Raza:</h5>
                <input type="text" placeholder='Busca una raza!' value={name} onChange={(e) => handleOnChange(e)}/>
                <button type='submit' onClick={(e) => handleClick(e)}>Buscar</button>
                <button type='submit' onClick={(e) => handleEmpty(e)}>Vaciar</button>
            </div>
            <div>
                <div>
                    <h5>Filtrar por Temperamento:</h5>
                    <select onChange={(e) => handleOnChangeTemperaments(e)}>
                        <option value="all">Todos los Temperamentos</option>
                        {propsTemperaments.map(e => {
                            return <option value={e.name} key={e.id}>{e.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <h5>Ordenar por Raza:</h5>
                    <select>
                        <option value="race">Todas las Raza</option>
                        {propsDogs.map(e => {
                            return <option value={e.name} key={e.name}>{e.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <h5>Orden por:</h5>
                    <select onChange={(e) => handleOnChangeFilter(e)}>
                        <option value="all">Sin orden</option>
                        <option value="ascendente">Ascendente</option>
                        <option value="descendente">Descendente</option>
                        <option value="min">Menor Peso</option>
                        <option value="max">Mayor Peso</option>
                    </select>
                </div>
                <div>
                    <Link to="/home/create">Crea tu propia Raza!</Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar