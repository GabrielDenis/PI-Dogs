import React from 'react'
import Dog from '../Dog/Dog'
import './Dogs.css'

const Dogs = (dogs) => {

    return (
        <div className="dogs" key={dogs.id}>
            {dogs.currentDog[0].map(d => {
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