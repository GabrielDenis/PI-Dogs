import { GET_ALL_DOGS, GET_DOG_BY_NAME, GET_DOG_DETAIL, GET_ALL_TEMPERAMENTS, ORDER_DOGS, TEMP_FILTER, CREATED_IN_DB, RACE_FILTER } from './actionTypes'
const axios = require('axios')

export const getAllDogs = () => {
    return async function (dispatch) {
        return axios("http://localhost:3001/dogs")
        .then(dogs => {
            dispatch({ type: GET_ALL_DOGS, payload: dogs.data })
        })
    }
}

export const getAllTemperaments = () => {
    return async function (dispatch) {
        return axios("http://localhost:3001/temperaments")
        .then(tempe => {
            dispatch({ type:GET_ALL_TEMPERAMENTS, payload: tempe.data })
        })
    }
}

export const getDetails = (id) => {
    return async function (dispatch) {
        return axios(`http://localhost:3001/dogs/${id}`)
        .then(details => {
            dispatch({ type:GET_DOG_DETAIL, payload: details.data })
        })
    }
}

export const getDogByName = (name) => {
    return async function (dispatch) {
        return axios(`http://localhost:3001/dogs?name=${name}`)
        .then(names => {
            dispatch({ type:GET_DOG_BY_NAME, payload: names.data })
        })
        .catch(err => alert("No dogs found"))
    }
}

export const temperamentsFilter = (payload) => {
    return async function (dispatch) {
        return dispatch({ type:TEMP_FILTER, payload: payload })
    }
}

export const raceFilter = (payload) => {
    return async function (dispatch) {
        return dispatch({ type:RACE_FILTER, payload: payload})
    }
}

export const orderDogs = (orderType) => {
    return async function (dispatch) {
        return dispatch({ type:ORDER_DOGS, payload: orderType })
    }
}

export const createDog = (payload) => {
    return async function() {
        return axios.post(`http://localhost:3001/dogs`, payload)
    }
}

export const createdInDb = (payload) => {
    return async function (dispatch) {
        return dispatch({ type:CREATED_IN_DB, payload })
    }
}