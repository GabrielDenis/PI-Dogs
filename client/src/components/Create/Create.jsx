import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createDog } from '../../redux/actions'
import { useHistory, Link } from 'react-router-dom'
import image from '../../images/logo.png'

const validateSimples = ({ name, lifeSpan, temperament }) => {
    const errors = {}

    if(!name) errors.name = "Name is required"
    if(!lifeSpan) errors.lifeSpan = "Life Span is required"
    if(temperament.length === 0) errors.temperament = "At least one temperament is required"

    return errors
}

const validateMinAndMax = ({ minH, maxH, minW, maxW }) => {
    const errors = {}
    if(!minH) errors.heightMin = "A minimum height is required"
    if(!maxH) errors.heightMax = "A maximum height is required"
    if(minH > maxH) errors.heightMin = "Minimum values must be smaller than maximum value"
    if(!minW) errors.weightMin = "A minimum weight is required"
    if(!maxW) errors.weightMax = "A maximum weight is required"
    if(minW > maxW) errors.weightMin = "Minimum value must be smaller than maximum value"

    return errors
}

function Create () {

    const dispatch = useDispatch();
    const history = useHistory();

    let propsTemperaments = useSelector(state => state.allTemperaments)

    const [tempe, setTempe] = useState('')
    const [wehe, setWeHe] = useState({
        minH: '',
        maxH: '',
        minW: '',
        maxW: '',
    })
    const [newDog, setNewDog] = useState({
        name: '',
        height: '',
        weight: '',
        lifeSpan: '',
        temperament: []
    })
    const [errorsSimple, setErrorsSimple] = useState({})
    const [errorsMinAndMax, setErrorsMinAndMax] = useState({})

    function handleInputChange (e) {
        setNewDog({
            ...newDog,
            [e.target.name]: e.target.value
        })

        setErrorsSimple (validateSimples({
            ...newDog,
            [e.target.name]: e.target.value
        }))
    }

    function handleNewWH (e) {
        e.preventDefault()
        setWeHe({
            ...wehe,
            [e.target.name]: e.target.value
        })
        setErrorsMinAndMax (validateMinAndMax({
            ...wehe,
            [e.target.name]: e.target.value
        }))
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
        let errorsSimple = Object.keys(validateSimples(newDog))
        let errorsMinAndMax = Object.keys(validateMinAndMax(wehe))
        console.log(errorsSimple, errorsMinAndMax)
        if (errorsSimple.length !== 0 && errorsMinAndMax !== 0) {
            alert("You have errors!, Please fix them.")
        } else {
            dispatch(createDog(newDog))
            alert("Dog created!")
            setNewDog({
                name: '',
                height: '',
                weight: '',
                lifeSpan: '',
                temperament: []
            })
            history.push('/home')
        }
    }

    return (
        <div>
            <Link to={"/home"}>
                <img className='logo' src={image} alt='logo'/>
            </Link>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Race name: </label>
                    <input type="text" name="name" placeholder='Race name...' onChange={(e) => handleInputChange(e)}/>
                    {errorsSimple.name && <div><p>{errorsSimple.name}</p></div>}
                </div>
                <div>
                    <label>Height: </label>
                    <input type="text" name="minH" placeholder='Minimum height...' onChange={(e) => handleNewWH(e)}/>
                    <input type="text" name="maxH" placeholder='Maximum height...' onChange={(e) => handleNewWH(e)}/>
                    <div>Between {newDog.height} Kg.</div>
                    {errorsMinAndMax.heightMin && <div><p>{errorsMinAndMax.heightMin}</p></div>}
                    {errorsMinAndMax.heightMax && <div><p>{errorsMinAndMax.heightMax}</p></div>}
                    <button type='button' name='height' onClick={(e) => handleAddWH(e)}>Add</button>
                </div>
                <div>
                    <label>Weight: </label>
                    <input type="text" name="minW" placeholder='Minimum weight...' onChange={(e) => handleNewWH(e)}/>
                    <input type="text" name="maxW" placeholder='Maximum weight...' onChange={(e) => handleNewWH(e)}/>
                    <div>Between {newDog.weight} Cm.</div>
                    {errorsMinAndMax.weightMin && <div><p>{errorsMinAndMax.weightMin}</p></div>}
                    {errorsMinAndMax.weightMax && <div><p>{errorsMinAndMax.weightMax}</p></div>}
                    <button type='button' name='weight' onClick={(e) => handleAddWH(e)}>Add</button>
                </div>
                <div>
                    <label>Life span: </label>
                    <input type="text" name="lifeSpan" placeholder='Life span...' onChange={(e) => handleInputChange(e)}/>
                    {errorsSimple.lifeSpan && <div><p>{errorsSimple.lifeSpan}</p></div>}
                </div>
                <div>
                    <label>Temperaments: </label>
                    <select onChange={(e) => handleNewTemperament(e)}>
                        <option value="invalid">Select temperaments</option>
                        {propsTemperaments.map(e => {
                            return <option value={e.name} key={e.id}>{e.name}</option>
                        })}
                    </select>
                    <div>{newDog.temperament.map(e => e + ', ')}</div>
                    {errorsSimple.temperament && <div><p>{errorsSimple.temperament}</p></div>}
                    <button type='button' onClick={(e) => handleAddTemperament(e)}>Add</button>
                </div>
                <div>
                    <input type="submit" value="Add Race"></input>
                </div>
            </form>
        </div>
    )
}

export default Create