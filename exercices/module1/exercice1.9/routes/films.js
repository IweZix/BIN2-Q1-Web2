/* eslint-disable prefer-template */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
var express = require('express');
const {
    readAllFilms,
    readOneFilms,
    createOneFilms,
    deleteOneFilm,
    updateOneFilm,
    updateFullyOneFilmOrCreateOneFilm,
} = require ('../models/films')

var router = express.Router();

/** Read all the films from list
    GET /films?duration={number} : return list with the films have an upper or equals duration
 */
router.get('/', (req, res, next) => {
    const allFilmsPotentiallyOrdered = readAllFilms(req?.query?.duration);

    res.json(allFilmsPotentiallyOrdered);
})

// Read the film identified by an id in the menu
router.get('/:id', (req, res) => {
    const foundFilm = readOneFilms(req.params.id);

    if (!foundFilm) return res.sendStatus(404);

    return res.json(foundFilm);
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

    if (!title || ! duration || ! budget || !link)
        res.sendStatus(400);

    const createdFilm = createOneFilms(title, duration, budget, link);

    return res.json(createdFilm);
})

// Update a film based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
    const title = req?.body?.title;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    const link = req?.body?.link;

    if ((!title && !duration && !budget && !link) || title?.length === 0 || duration?.length === 0 || budget?.length === 0 || link?.length === 0) 
        return res.sendStatus(400);

    const updatedFilm = updateOneFilm(req.params.id, {title, duration, budget, link});

    if (!updatedFilm) return res.sendStatus(404);

    return res.json(updatedFilm);
})

// Delete a film from the list based on its id
router.delete('/:id', (req, res) => {
    const deletedFilm = deleteOneFilm(req.params.id);

    if (!deletedFilm) return res.sendStatus(404);

    return res.json(deletedFilm);
})

// Update a film based on its id and new values for its parameters
router.put('/:id', (req, res) => {
    const title = req?.body?.title;
    const link = req?.body?.link;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
  
    if (!req.body || !title || !title.trim() || !link || !link.trim() || duration === undefined || 
        typeof req?.body?.duration !== 'number' || duration < 0 || budget === undefined || 
        typeof req?.body?.budget !== 'number' || budget < 0) return res.sendStatus(400);
  
    const updatedFilmOrNewFilm = updateFullyOneFilmOrCreateOneFilm(req?.params?.id, req?.body);
  
    return res.json(updatedFilmOrNewFilm);
});

module.exports = router;