import React from 'react'
import './Paging.css'

const Paging = ({dogsPerPage, allDogs, paging}) => {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className='navBar'>
            <ul className='listContainer'>
                { pageNumbers &&
                pageNumbers.map(number =>(
                    <li className='listElement' key={number}>
                        <a onClick={() => paging(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Paging