const { getApiInfo, getAllInfo } = require ('./utils')
const { Router } = require('express');
require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Temperament } = require('../db.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
    const name = req.query.name
    let allDogs = await getAllInfo()

    let filtered = allDogs.map(e => {

        return {
            id: e.id,
            image: e.image,
            name: e.name,
            weight: e.weight,
            temperament: e.temperaments ? e.temperaments.map(e => e.name) : e.temperament,
        }
    })

    if (name) {
        let dogName = await filtered.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ? 
        res.status(200).send(dogName) : 
        res.status(404).send("Dog not Found")
    } else {
        res.status(200).send(filtered)
    }
})

router.get('/dogs/:id', async (req, res) => {
    const dogId = parseInt(req.params.id)
    let allDogs = await getAllInfo()

    let filtered = allDogs.map(e => {
        return {
            id: e.id,
            image: e.image,
            name: e.name,
            temperament: e.temperament,
            height: e.height,
            weight: e.weight,
            lifeSpan: e.lifeSpan,
        }
    })

    if (dogId) {
        let dog = await filtered.filter(e => e.id === dogId)
        dog ?
        res.status(200).send(dog) :
        res.status(400).send("Dog not Found")
    } else {
        res.status(404).send("ID doesn't exists")
    }
})

router.post('/dogs', async (req, res) => {
    let imageDefault = '../../../client/src/images/default_dog.jpg'
    let { name, height, weight, lifeSpan, createdInDb, temperament } = req.body

    let createdDog = await Dog.create ({
        name,
        image: req.body.image ? req.body.image : imageDefault,
        height,
        weight,
        lifeSpan,
        createdInDb,
        temperament
    })

    let temperamentDb = await Temperament.findAll({
        where: {name: temperament.map(e => e)}
    })
    
    createdDog.addTemperament(temperamentDb)

    res.status(200).send("Dog succesfully created")
})

router.get('/temperaments', async (req, res) => {
    let allDogs = await getApiInfo()
    const temperaments = new Set()

    allDogs.forEach(e => {
        let dogTemps = e.temperament?.split(", ")
        dogTemps?.forEach(el => {
            temperaments.add(el)
        })
    });

    for (let tempe of temperaments) {
        Temperament.findOrCreate({
            where: {name: tempe.toLowerCase()}
        })
    }

    let temperamentsList = await Temperament.findAll()
    res.status(200).send(temperamentsList)
})

module.exports = router;