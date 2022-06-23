const axios = require('axios');
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db.js');

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiInfo = apiUrl.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            height: e.height.metric,
            weight: e.weight.metric,
            lifeSpan: e.life_span,
            temperament: e.temperament,
            image: e.image.url
        }
    })
    return apiInfo
}

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllInfo = async () => {
    const apiInfo = await getApiInfo()
    const dataBaseInfo = await getDbInfo()
    const allInfo = apiInfo.concat(dataBaseInfo)
    return allInfo
}

module.exports = { getApiInfo, getAllInfo }