import React from 'react'

const Paging = ({dogsPerPage, allDogs, paging}) => {

    const pageNumbers = []

    for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <nav>
            <ul>
                { pageNumbers &&
                pageNumbers.map(number =>(
                    <li key={number}>
                        <a onClick={() => paging(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Paging