import React from 'react'
import { useSelector } from 'react-redux'
import Dog from '../Dog/Dog'

const Dogs = () => {
    let props = useSelector(state => state.allDogs)
    return (
        <div className="dogs" key={props.name}>
            {props.map(d => <Dog
                image={d.image}
                name={d.name}
                temperament={d.temperament}
                weight={d.weight}
            />)}    
        </div>
    )
}

export default Dogs