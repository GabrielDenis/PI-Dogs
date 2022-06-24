import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import image from '../../images/logo.png'


const NavBar = () => {

    let propsTemperaments = useSelector(state => state.allTemperaments)
    let propsDogs = useSelector(state => state.allDogs)
    
    return (
        <div>
            <Link to={"/home"}>
                <img src={image} alt='logo'/>
            </Link>
            <div>
                <input type="text" placeholder="Ingresa una raza de perro"/>
            </div>
            <div>
                <div>
                    <h5>Ordenar por Temperamento:</h5>
                    <select>
                        <option value="temperament">Todos los Temperamentos</option>
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
                    <h5>Orden Alfabético:</h5>
                    <select>
                        <option value="ascendente">Ascendente</option>
                        <option value="descendente">Descendente</option>
                    </select>
                </div>
                <div>
                    <h5>Orden por Peso:</h5>
                    <select>
                        <option value="all">Todos</option>
                        <option value="min">Menor Peso</option>
                        <option value="max">Mayor Peso</option>
                    </select>
                </div>
                {/* <div>
                    <Link to="/home/create">Crea tu propia Raza!</Link>
                </div> */}
            </div>
        </div>
    )
}

export default NavBar