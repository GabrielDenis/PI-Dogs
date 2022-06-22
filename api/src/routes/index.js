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
            where: {name: tempe}
        })
    }

    res.status(200).send("Temperaments succesfully created")
})

module.exports = router;


const array = ['Stubborn',
    'Curious',
    'Playful',
    'Adventurous',
    'Active',
    'Fun-loving',
    'Aloof',
    'Clownish',
    'Dignified',
    'Independent',
    'Happy',
    'Wild',
    'Hardworking',
    'Dutiful',
    'Outgoing',
    'Friendly',
    'Alert',
    'Confident',
    'Intelligent',
    'Courageous',
    'Loyal',
    'Brave',
    'Docile',
    'Responsive',
    'Composed',
    'Receptive',
    'Faithful',
    'Loving',
    'Protective',
    'Trainable',
    'Responsible',
    'Energetic',
    'Gentle',
    'Affectionate',
    'Devoted',
    'Assertive',
    'Dominant',
    'Strong Willed',
    'Obedient',
    'Reserved',
    'Kind',
    'Sweet-Tempered',
    'Tenacious',
    'Attentive',
    'Steady',
    'Bold',
    'Proud',
    'Reliable',
    'Fearless',
    'Lively',
    'Self-assured',
    'Cautious',
    'Eager',
    'Good-natured',
    'Spirited',
    'Companionable',
    'Even Tempered',
    'Rugged',
    'Fierce',
    'Refined',
    'Joyful',
    'Agile',
    'Amiable',
    'Excitable',
    'Determined',
    'Self-confidence',
    'Hardy',
    'Calm',
    'Good-tempered',
    'Watchful',
    'Hard-working',
    'Feisty',
    'Cheerful',
    'Sensitive',
    'Easygoing',
    'Adaptable',
    'Trusting',
    'Lovable',
    'Territorial',
    'Keen',
    'Familial',
    'Rational',
    'Bright',
    'Quick',
    'Powerful',
    'Gay',
    'Stable',
    'Quiet',
    'Inquisitive',
    'Strong',
    'Sociable',
    'Patient',
    'Suspicious',
    'Great-hearted',
    'Merry',
    'Vocal',
    'Tolerant',
    'Mischievous',
    'People-Oriented',
    'Bossy',
    'Cunning',
    'Athletic',
    'Boisterous',
    'Cooperative',
    'Trustworthy',
    'Self-important',
    'Respectful',
    'Thoughtful',
    'Generous',
    'Cat-like',
    'Sturdy',
    'Benevolent',
    'Clever',
    'Bubbly',
    'Opinionated',
    'Aggressive',
    'Extroverted',
    'Charming',
    'Unflappable',
    'Spunky',
    'Diligent',
    'Willful',
    'Fast',
    'Vigilant']