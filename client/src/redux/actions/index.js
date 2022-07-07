import { GET_ALL_DOGS, GET_DOG_BY_NAME, GET_DOG_DETAIL, GET_ALL_TEMPERAMENTS, ORDER_DOGS, TEMP_FILTER, CREATED_IN_DB, RACE_FILTER, FILTER_BY_HEIGHT, RESET_DETAIL } from './actionTypes'
const axios = require('axios')

export const getAllDogs = () => {
    return function (dispatch) {
        return axios("http://localhost:3001/dogs")
        .then(dogs => {
            dispatch({ type: GET_ALL_DOGS, payload: dogs.data })
        })
    }
}

export const getAllTemperaments = () => {
    return async function (dispatch) {
        const res = await axios("http://localhost:3001/temperaments")
        // .then(tempe => {
            return dispatch({ type:GET_ALL_TEMPERAMENTS, payload: res.data })
        // })
    }
}

export const getDetails = (id) => {
    return function (dispatch) {
        return axios(`http://localhost:3001/dogs/${id}`)
        .then(details => {
            dispatch({ type:GET_DOG_DETAIL, payload: details.data })
        })
        .catch(err => alert(err + " please return"))
    }
}

export const getDogByName = (name) => {
    return function (dispatch) {
        return axios(`http://localhost:3001/dogs?name=${name}`)
        .then(names => {
            dispatch({ type:GET_DOG_BY_NAME, payload: names.data })
        })
    }
}

export const temperamentsFilter = (payload) => {
    return function (dispatch) {
        return dispatch({ type:TEMP_FILTER, payload: payload })
    }
}

export const raceFilter = (payload) => {
    return function (dispatch) {
        return dispatch({ type:RACE_FILTER, payload: payload})
    }
}

export const orderDogs = (orderType) => {
    return function (dispatch) {
        return dispatch({ type:ORDER_DOGS, payload: orderType })
    }
}

export const createDog = (payload) => {
    return function() {
        return axios.post(`http://localhost:3001/dogs`, payload)
    }
}

export const createdInDb = (payload) => {
    return function (dispatch) {
        return dispatch({ type:CREATED_IN_DB, payload })
    }
}

export const filterByHeight = (payload) => {
    return function (dispatch) {
        return dispatch({ type:FILTER_BY_HEIGHT, payload })
    }
}

export const resetDetail = () => {
    return function (dispatch) {
        return dispatch({ type:RESET_DETAIL })
    }
}