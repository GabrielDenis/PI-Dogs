import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createDog } from '../../redux/actions'
import { useHistory, Link } from 'react-router-dom'
import image from '../../images/logo.png'
import './Create.css'

const regExLetters = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
const regExNumbers = /^[0-9]*$/;

const validateSimples = ({ name, temperament }) => {
    const errors = {}

    if(name.search(regExLetters) === -1) errors.name = "*Name must be only letters" 
    if(name.length < 4) errors.name = "*Name must be 4 characters or longer"
    if(!name) errors.name = "*Name is required"

    if(temperament.length === 0) errors.temperament = "*At least one temperament is required"

    return errors
}

const validateMinAndMax = ({ minH, maxH, minW, maxW, minLS, maxLS }) => {
    const errors = {}

    if(!minH) errors.heightMin = "*A minimum height is required"
    if(!maxH) errors.heightMax = "*A maximum height is required"
    if(minH > maxH) errors.heightMin = "*Minimum value must be smaller than maximum value"

    if(!minW) errors.weightMin = "*A minimum weight is required"
    if(!maxW) errors.weightMax = "*A maximum weight is required"
    if(minW > maxW) errors.weightMin = "*Minimum value must be smaller than maximum value"

    if(!minLS) errors.lifeSpanMin = "*A minimum life span is required"
    if(!maxLS) errors.lifeSpanMax = "*A maximum life span is required"
    if(minLS > maxLS) errors.lifeSpanMin = "*Minimum value must be smaller than maximum value"

    return errors
}

function Create () {

    const dispatch = useDispatch();
    const history = useHistory();

    let propsDogs = useSelector(state => state.allDogs)
    let propsTemperaments = useSelector(state => state.allTemperaments)

    const [tempe, setTempe] = useState('')
    const [wehe, setWeHe] = useState({
        minH: '',
        maxH: '',
        minW: '',
        maxW: '',
        minLS: '',
        maxLS: '',
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
    }

    function handleAddWH (e) {
        e.preventDefault()
        if (e.target.name === "height") {
            setNewDog({
                ...newDog,
                height: wehe.minH + " - " + wehe.maxH
            })
        } else if (e.target.name === "weight") {
            setNewDog({
                ...newDog,
                weight: wehe.minW + " - " + wehe.maxW
            })
        } else {
            setNewDog({
                ...newDog,
                lifeSpan: wehe.minLS + " - " + wehe.maxLS + " years"
            })
        }
        setErrorsMinAndMax (validateMinAndMax({
            ...wehe,
            [e.target.name]: e.target.value
        }))
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
        setErrorsSimple (validateSimples({
            ...newDog,
            temperament: [...tempe, e.target.value]
        }))
    }

    function handleSubmit (e) {
        e.preventDefault()
        let errorsSimple = Object.keys(validateSimples(newDog))
        let errorsMinAndMax = Object.keys(validateMinAndMax(wehe))
        for (let i in propsDogs){
            if (propsDogs[i].name.toLowerCase() === newDog.name.toLowerCase()){
              return alert("Dog already exists!")
            }
        }
        if (errorsSimple.length !== 0 && errorsMinAndMax !== 0) {
            alert("You have errors!, Please fix them.")
        } else {

            console.log("dog",newDog)
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
        <div className='createContainer'>
            <Link to={"/home"}>
                <img className='logo' src={image} alt='logo'/>
            </Link>
            <form onSubmit={(e) => handleSubmit(e)} className="formContainer">
                <div className='createName'>
                    <label>Race name: </label>
                    <input type="text" name="name" placeholder='Race name...' onChange={(e) => handleInputChange(e)}/>
                    {errorsSimple.name && <div className='errors'><p>{errorsSimple.name}</p></div>}
                </div>
                <div className='createHeight'>
                    <label>Height: </label>
                    <input type="number" name="minH" placeholder='Minimum height...' onChange={(e) => handleNewWH(e)}/>
                    <input type="number" name="maxH" placeholder='Maximum height...' onChange={(e) => handleNewWH(e)}/>
                    <div>Between {newDog.height} Cm.</div>
                    {errorsMinAndMax.heightMin && <div className='errors'><p>{errorsMinAndMax.heightMin}</p></div>}
                    {errorsMinAndMax.heightMax && <div className='errors'><p>{errorsMinAndMax.heightMax}</p></div>}
                    <button type='button' name='height' onClick={(e) => handleAddWH(e)}>Add</button>
                </div>
                <div className='createWeight'>
                    <label>Weight: </label>
                    <input type="number" name="minW" placeholder='Minimum weight...' onChange={(e) => handleNewWH(e)}/>
                    <input type="number" name="maxW" placeholder='Maximum weight...' onChange={(e) => handleNewWH(e)}/>
                    <div>Between {newDog.weight} Kg.</div>
                    {errorsMinAndMax.weightMin && <div className='errors'><p>{errorsMinAndMax.weightMin}</p></div>}
                    {errorsMinAndMax.weightMax && <div className='errors'><p>{errorsMinAndMax.weightMax}</p></div>}
                    <button type='button' name='weight' onClick={(e) => handleAddWH(e)}>Add</button>
                </div>
                <div className='createLife'>
                <label>Life span: </label>
                    <input type="number" name="minLS" placeholder='Minimum life span...' onChange={(e) => handleNewWH(e)}/>
                    <input type="number" name="maxLS" placeholder='Maximum life span...' onChange={(e) => handleNewWH(e)}/>
                    <div>Between {newDog.lifeSpan} Years.</div>
                    {errorsMinAndMax.lifeSpanMin && <div className='errors'><p>{errorsMinAndMax.lifeSpanMin}</p></div>}
                    {errorsMinAndMax.lifeSpanMax && <div className='errors'><p>{errorsMinAndMax.lifeSpanMax}</p></div>}
                    <button type='button' name='lifeSpan' onClick={(e) => handleAddWH(e)}>Add</button>
                </div>
                <div className='createTemp'>
                    <label>Temperaments: </label>
                    <select onChange={(e) => handleNewTemperament(e)}>
                        <option value="invalid">Select temperaments</option>
                        {propsTemperaments.map(e => {
                            return <option value={e.name} key={e.id}>{e.name}</option>
                        })}
                    </select>
                    <div>{newDog.temperament.map(e => e + ', ')}</div>
                    {errorsSimple.temperament && <div className='errors'><p>{errorsSimple.temperament}</p></div>}
                    <button type='button' onClick={(e) => handleAddTemperament(e)}>Add</button>
                </div>
                <div className='createAdd'>
                    <input type="submit" value="Add Race"></input>
                </div>
            </form>
        </div>
    )
}

export default Create