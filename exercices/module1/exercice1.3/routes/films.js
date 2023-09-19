var express = require('express');
var router = express.Router();

var get = 0;
var getFilm = 0;
var getFilmById = 0;
var postFilm = 0;
var deleteFilm = 0;

const FILMS = [
    {
        id: 1,
        title : `Harry Potter à l'école des sorciers`,
        duration : 110,
        budget : 120,
        link : `google.com`

    },
    {
        id: 2,
        title : `Harry Potter et la chambre des secrets`,
        duration : 110,
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

/** Read all the films from list
    GET /films?duration={number} : return list with the films have an upper or equals duration
 */
router.get('/', (req, res, next) => {
    const minDuration = req?.query?.duration 
    let orderedFilm;
    console.log(`order by minimum duration ${minDuration ?? 'not requested'}`);
    if (minDuration)
        orderedFilm = (FILMS.filter(film => film.duration >= minDuration));
    console.log('GET /films');
    getFilm++;
    res.json(orderedFilm ?? FILMS)
})

// Read the film identified by an id in the menu
router.get('/:id', (req, res) => {
    console.log(`GET /films/${req.params.id}`);
    const indexOfFilmFound = FILMS.findIndex((film) => film.id == req.params.id);
    if (indexOfFilmFound < 0) return res.sendStatus(404);
    getFilmById++;
    res.json(FILMS[indexOfFilmFound]);
})

// Create a film to be added to the list
router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 
        ? req.body.title 
        : undefined;
    const duration = req?.body?.duration.length !== 0
        ? req.body.duration 
        : undefined;
    const budget = req?.body?.budget.length !== 0
        ? req.body.budget 
        : undefined;
    const link = req?.body?.link.length !== 0
        ? req.body.link 
        : undefined;
    
    console.log('POST /films');

    if (!title || ! duration || ! budget || !link)
        res.sendStatus(400);

    const lastItemIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? FILMS[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const newFilm = {
        id: nextId,
        title: title,
        duration: duration,
        budget: budget,
        link: link,
    };

    FILMS.push(newFilm);

    res.json(newFilm);

})

module.exports = router;