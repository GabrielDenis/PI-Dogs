import React from 'react'
import { useSelector } from 'react-redux'
import Dog from '../Dog/Dog'

const Dogs = () => {

    let props = useSelector(state => state.allDogs)

    return (
        <div className="dogs" key={props.id}>
            {props.map(d => {
                return (
                    <div key={d.name}>
                        <Dog
                            id={d.id}
                            image={d.image}
                            name={d.name}
                            temperament={d.temperament}
                            weight={d.weight}
                        />
                    </div>
                )
            })}               
        </div>
    )
}

export default Dogs