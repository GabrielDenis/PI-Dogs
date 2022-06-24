import React from 'react'
import { useSelector } from 'react-redux'

function Create () {

    let propsTemperaments = useSelector(state => state.allTemperaments)

    return (
        <div>
            <form>
                <div>
                    <label>Nombre de la Raza:</label>
                    <input type="text" name="name"/>
                </div>
                <div>
                    <label>Altura:</label>
                    <input type="text" name="minH" placeholder='Altura mínima'/>
                    <input type="text" name="maxH" placeholder='Altura máxima'/>
                </div>
                <div>
                    <label>Peso:</label>
                    <input type="text" name="minW" placeholder='Peso mínimo'/>
                    <input type="text" name="maxW" placeholder='Peso máximo'/>
                </div>
                <div>
                    <label>Años de Vida:</label>
                    <input type="text" name="lifeSpan" placeholder='Años de Vida'/>
                </div>
                <div>
                    <label>Temperamentos:</label>
                    <select>
                        {propsTemperaments.map(e => {
                            return <option value={e.name} key={e.id}>{e.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <input type="submit" value="Agregar Raza"></input>
                </div>
            </form>
        </div>
    )
}

export default Create