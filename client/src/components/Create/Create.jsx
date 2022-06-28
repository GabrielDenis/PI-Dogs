import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createDog } from '../../redux/actions'

function Create () {

    const dispatch = useDispatch();

    let propsTemperaments = useSelector(state => state.allTemperaments)
    const [tempe, setTempe] = useState('')
    const [wehe, setWeHe] = useState({
        minH: '',
        maxH: '',
        minW: '',
        mixW: '',
    })
    const [newDog, setNewDog] = useState({
        name: '',
        height: '',
        weight: '',
        lifeSpan: '',
        temperament: []
    })

    function handleInputChange (e) {
        setNewDog({
            ...newDog,
            [e.target.name]: e.target.value
        })
    }

    function handleNewWH (e) {
        e.preventDefault()
        setWeHe({...wehe,
            [e.target.name]: e.target.value
        })
    }

    function handleAddWH (e) {
        e.preventDefault()
        if (e.target.name === "height") {
            setNewDog({
                ...newDog,
                height: wehe.minH + " - " + wehe.maxH
            })
        } else {
            setNewDog({
                ...newDog,
                weight: wehe.minW + " - " + wehe.maxW
            })
        }
    }

    function handleNewTemperament (e) {
        if (e.target.value !== 'invalid') {
            setTempe(e.target.value)
        }
    }

    function handleAddTemperament (e) {
        e.preventDefault()
        if (tempe && !newDog.temperament.includes(tempe)) {
            setNewDog({
                ...newDog,
                temperament: [...newDog.temperament, tempe]
            })
        }
    }

    function handleSubmit (e) {
        e.preventDefault()
        console.log(newDog)
        dispatch(createDog(newDog))
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre de la Raza:</label>
                    <input type="text" name="name" placeholder='Nombre de la Raza...' onChange={(e) => handleInputChange(e)}/>
                </div>
                <div>
                    <label>Altura:</label>
                    <input type="text" name="minH" placeholder='Altura mínima' onChange={(e) => handleNewWH(e)}/>
                    <input type="text" name="maxH" placeholder='Altura máxima' onChange={(e) => handleNewWH(e)}/>
                    <div>{wehe.minH + ' - ' + wehe.maxH}</div>
                    <button type='button' name='height' onClick={(e) => handleAddWH(e)}>Agregar</button>
                </div>
                <div>
                    <label>Peso:</label>
                    <input type="text" name="minW" placeholder='Peso mínimo' onChange={(e) => handleNewWH(e)}/>
                    <input type="text" name="maxW" placeholder='Peso máximo' onChange={(e) => handleNewWH(e)}/>
                    <div></div>
                    <button type='button' name='weight' onClick={(e) => handleAddWH(e)}>Agregar</button>
                </div>
                <div>
                    <label>Años de Vida:</label>
                    <input type="text" name="lifeSpan" placeholder='Años de Vida' onChange={(e) => handleInputChange(e)}/>
                </div>
                <div>
                    <label>Temperamentos:</label>
                    <select onChange={(e) => handleNewTemperament(e)}>
                        <option value="invalid">Selecciona un temperamento</option>
                        {propsTemperaments.map(e => {
                            return <option value={e.name} key={e.id}>{e.name}</option>
                        })}
                    </select>
                    <div>{newDog.temperament.map(e => e + ', ')}</div>
                    <button type='button' onClick={(e) => handleAddTemperament(e)}>Agregar</button>
                </div>
                <div>
                    <input type="submit" value="Agregar Raza"></input>
                </div>
            </form>
        </div>
    )
}

export default Create