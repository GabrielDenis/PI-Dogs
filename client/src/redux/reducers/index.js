import { GET_ALL_DOGS, GET_DOG_BY_NAME, GET_DOG_DETAIL, CREATE_DOG, GET_ALL_TEMPERAMENTS, ORDER_DOGS, TEMP_FILTER } from '../actions/actionTypes'

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
                    console.log(dog)
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
        default:
            return {...state}
    }
}

export default rootReducer