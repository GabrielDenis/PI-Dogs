import { GET_ALL_DOGS, GET_DOG_BY_NAME, GET_DOG_DETAIL, GET_ALL_TEMPERAMENTS, ORDER_DOGS, TEMP_FILTER, CREATED_IN_DB, RACE_FILTER } from '../actions/actionTypes'

const initialState = {
    allDogs: [],
    dogDetail: {},
    allTemperaments: [],
    dogsFilter: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                dogsFilter: action.payload
            }
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: action.payload
            }
        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            }
        case GET_DOG_BY_NAME:
            return {
                ...state,
                allDogs: action.payload
            }
        case TEMP_FILTER:
            const dogs = state.dogsFilter
            const dogsFiltered = action.payload === 'all' ? dogs : forInTemperaments()

            function forInTemperaments () {
                let array = [];

                for (const dog of dogs) {
                    if (dog.temperament && !Array.isArray(dog.temperament)) {
                        dog.temperament = dog.temperament.toLowerCase().split(", ")
                    }

                    dog.temperament?.map(e => {
                        if (e === action.payload) {
                            array.push(dog)
                        }
                    })
                }

                return array
            }

            return {
                ...state,
                allDogs: dogsFiltered
            }
        case RACE_FILTER:
            const races = state.dogsFilter
            const raceFiltered = action.payload === "allRace" ? races : forInRace()

            function forInRace() {
                let newRaces = []

                for (const race of races) {
                    if (race.name === action.payload) {
                        newRaces.push(race)
                    }
                }

                return newRaces
            }

            return{
                ...state,
                allDogs: raceFiltered
            }
        case ORDER_DOGS:
            var sortFunction
            switch (action.payload) {
                case 'ascendente':
                    sortFunction = function (a, b) {
                        if (a.name < b.name) {
                            return -1
                        }
                        if (a.name > b.name) {
                            return 1
                        }
                        return 0
                    }
                    break;
                case 'descendente':
                    sortFunction = function (a, b) {
                        if (a.name > b.name) {
                            return -1
                        }
                        if (a.name < b.name) {
                            return 1
                        }
                        return 0
                    }
                    break;
                case 'min':
                    sortFunction = function (a, b) {
                        let awA = a.weight.split(" - ")
                        let awB = b.weight.split(" - ")

                        let mediaWa =  (awA[0] + awA[1]) / 2
                        let mediaWb =  (awB[0] + awB[1]) / 2

                        if (mediaWa < mediaWb) {
                            return -1
                        }
                        if (mediaWa > mediaWb) {
                            return 1
                        }
                        return 0
                    }
                    break;
                case 'max':
                    sortFunction = function (a, b) {
                        let awA = a.weight.split(" - ")
                        let awB = b.weight.split(" - ")

                        let mediaWa =  (awA[0] + awA[1]) / 2
                        let mediaWb =  (awB[0] + awB[1]) / 2

                        if (mediaWa > mediaWb) {
                            return -1
                        }
                        if (mediaWa < mediaWb) {
                            return 1
                        }
                        return 0
                    }
                    break;
                default:
                    break;
            }
            return {
                ...state,
                allDogs: state.allDogs.sort(sortFunction)
            }
        case CREATED_IN_DB:
            const createdInDb = state.dogsFilter
            switch (action.payload) {
                case "todos":
                    return {
                        ...state,
                        allDogs: createdInDb
                    }
                case "db":
                    let newArray = []
                    for (const i in createdInDb) {
                        if (typeof createdInDb[i].id === "string") {
                            newArray.push(createdInDb[i])
                        }
                    }
                    return {
                        ...state,
                        allDogs: newArray
                    }
                case "api":
                    let array = []
                    for (const i in createdInDb) {
                        if (typeof createdInDb[i].id !== "string") {
                            array.push(createdInDb[i])
                        }
                    }
                    return {
                        ...state,
                        allDogs: array
                    }
                default:
                    return
            }
        default:
            return {...state}
    }
}

export default rootReducer