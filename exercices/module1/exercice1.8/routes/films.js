var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/pizzas.json';

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

/** Read all the films from list
    GET /films?duration={number} : return list with the films have an upper or equals duration
 */
router.get('/', (req, res, next) => {
    const minDuration = req?.query?.duration 
    if (minDuration < 0) return res.sendStatus(400);
    let orderedFilm;
    console.log(`order by minimum duration ${minDuration ?? 'not requested'}`);

    const films = parse(jsonDbPath, FILMS);

    if (minDuration)
        orderedFilm = (films.filter(film => film.duration >= minDuration));
    console.log('GET /films');
    res.json(orderedFilm ?? films);
})

// Read the film identified by an id in the menu
router.get('/:id', (req, res) => {
    console.log(`GET /films/${req.params.id}`);

    const films = parse(jsonDbPath, FILMS);

    const indexOfFilmFound = films.findIndex((film) => film.id == req.params.id);

    if (indexOfFilmFound < 0) return res.sendStatus(400);

    res.json(films[indexOfFilmFound]);
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

    for (const film of FILMS) {
        if (film.title === title) {
            res.sendStatus(400);
            return;
        }
    }

    const existingFilm = FILMS.find(
        (film) => film.title.toLowerCase() === title.toLowerCase()
      );
      if (existingFilm) return res.sendStatus(409);

    const films = parse(jsonDbPath, FILMS);

    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const newFilm = {
        id: nextId,
        title: title,
        duration: duration,
        budget: budget,
        link: link,
    };

    films.push(newFilm);

    serialize(jsonDbPath, films);

    res.json(newFilm);
})

// Update a film based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
    console.log(`PATCH /films/${req.params.id}`);

    const title = req?.body?.title;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    const link = req?.body?.link;

    console.log('POST /films');

    if ((!title && !duration && !budget && !link) || title?.length === 0 || duration?.length === 0 || budget?.length === 0 || link?.length === 0) return res.sendStatus(400);

    const films = parse(jsonDbPath, FILMS);

    const foundIndex = films.findIndex(film => film.id == req.params.id);

    if (foundIndex < 0) return res.sendStatus(404);

    const updatedFilm = {...films[foundIndex], ...req.body};

    films[foundIndex] = updatedFilm;

    serialize(jsonDbPath, films);

    return res.json(updatedFilm);
})

// Delete a film from the list based on its id
router.delete('/:id', (req, res) => {
    console.log(`DELETE /films/${req.params.id}`);

    const films = parse(jsonDbPath, FILMS);

    const foundIndex = films.findIndex(film => film.id == req.params.id);

    if (foundIndex < 0) return res.sendStatus(404);

    const itemsRemovedFromMenu = films.splice(foundIndex, 1);
    const itemRemoved = itemsRemovedFromMenu[0];

    serialize(jsonDbPath, films);

    return res.json(itemRemoved);
})

// Update a film based on its id and new values for its parameters
router.put('/:id', (req, res) => {
    console.log(`PUT /films/${req.params.id}`);

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

    const films = parse(jsonDbPath, FILMS);

    const existingFilm = films.find(
        (film) => film.title.toLowerCase() === title.toLowerCase()
      );
      if (existingFilm) return res.sendStatus(409);

    const foundIndex = films.findIndex(film => film.id == req.params.id);

    if (foundIndex < 0) return res.sendStatus(404);

    const updatedFilm = {...films[foundIndex], ...req.body};

    films[foundIndex] = updatedFilm;

    serialize(jsonDbPath, films);

    return res.json(updatedFilm);
})

module.exports = router;