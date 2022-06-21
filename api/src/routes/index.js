const { Router } = require('express');
require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { API_KEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiInfo = apiUrl.data.map(e => {
        return {
            id: e.id,
            name: e.name,
            height: e.height,
            weight: e.weight,
            lifeSpan: e.life_span,
            temperament: e.temperament
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

router.get('/dogs', async (req, res) => {
    const name = req.query.name
    let allDogs = await getAllInfo()
    console.log(name);
    if (name) {
        let dogName = await allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ? 
        res.status(200).send(dogName) : 
        res.status(404).send("Dog not Found")
    } else {
        res.status(200).send(allDogs)
    }
})

router.get('/dogs/:id', async (req, res) => {
    const dogId = parseInt(req.params.id)
    let allDogs = await getAllInfo()
    if (dogId) {
        let dog = await allDogs.filter(e => e.id === dogId)
        dog ?
        res.status(200).send(dog) :
        res.status(400).send("Dog not Found")
    } else {
        res.status(404).send("ID doesn't exists")
    }
})

router.post('/dogs', async (req, res) => {
    let { name, height, weight, lifeSpan, createdInDb, temperament } = req.body

    let createdDog = await Dog.create ({
        name,
        height,
        weight,
        lifeSpan,
        createdInDb,
        temperament
    })

    let temperamentDb = await Temperament.findAll({
        where: {name: temperament}
    })

    createdDog.addTemperament(temperamentDb)

    res.status(200).send("Dog succefully created")
})

module.exports = router;
