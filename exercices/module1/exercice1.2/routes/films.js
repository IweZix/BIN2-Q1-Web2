var express = require('express');
var router = express.Router();

var get = 0;
var getFilm = 0;
var postFilm = 0;
var deleteFilm = 0;

const FILMS = [
    {
        id: 1,
        title : `Harry Potter à l'école des sorciers`,
        duration : 120,
        budget : 120,
        link : `google.com`

    },
    {
        id: 2,
        title : `Harry Potter et la chambre des secrets`,
        duration : 120,
        budget : 130,
        link : `google.com`
    },
    {
        id: 3,
        title : `Harry Potter et le prisonnier d'Azkaban`,
        duration : 120,
        budget : 140,
        link : `google.com`
    },
];

// s'éxécute à chaque reload du router films
router.use((req, res, next) => {
    console.log(`
    Request counter :
    - GET / : ${get}
    - GET /films : ${getFilm}
    - POST /films: ${postFilm}
    - DELETE /films : ${deleteFilm}
    `);
    next();
});

// Read all the films from the list
router.get('/', (req, res, next) => {
    console.log('GET /films');
    getFilm++;
    res.json(FILMS);
})

module.exports = router;