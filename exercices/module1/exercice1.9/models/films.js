/* eslint-disable no-unneeded-ternary */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
const path = require('node:path');
const {parse, serialize } = require('../utils/json');
const { json } = require('express');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const defaultFilms = [
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

function readAllFilms(duration) {
    let filmByDuration;
    const films = parse(jsonDbPath, defaultFilms);
    if (duration)
        filmByDuration = (films.filter(film => film.duration >= duration));
    return filmByDuration ? filmByDuration : films;
}


function readOneFilms(id) {
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilms);
    const indexOfFilmFound = films.findIndex((film) => film.id === idNumber);
    if (indexOfFilmFound < 0) return undefined;

    return films[indexOfFilmFound];
}


function createOneFilms(title, duration, budget, link) {
    const films = parse(jsonDbPath, defaultFilms);

    const createdFilm = {
        id: getNextId(),
        title, 
        duration,
        budget,
        link,
    };

    films.push(createdFilm);
    serialize(jsonDbPath, films);
    return createdFilm;
}


function getNextId() {
    const films = parse(jsonDbPath, defaultFilms);
    const lastItemIndex = films?.length !== 0 ? films.length -1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = films[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
}


function deleteOneFilm(id) {
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilms);
    const foundIndex = films.findIndex((film) => film.id === idNumber);
    if (foundIndex < 0) return undefined;
    const deletedFilms = films.splice(foundIndex, 1);
    const deletedFilm = defaultFilms[0];
    serialize(jsonDbPath, films);

    return deletedFilm;
}


function updateOneFilm(id, propertiesToUpdate) {
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, defaultFilms);
    const foundIndex = films.findIndex((film) => film.id === idNumber);
    if (foundIndex < 0) return undefined;

    const updatedFilm = {...films[foundIndex], ...propertiesToUpdate};

    films[foundIndex] = updatedFilm;

    serialize(jsonDbPath, films);

    return updatedFilm;
}

function updateFullyOneFilmOrCreateOneFilm(id, filmProps) {
    const idAsNumber = Number(id, 10);
    const films = parse(jsonDbPath);
    const indexOfFilmFound = films.findIndex((film) => film.id === idAsNumber);
  
    if (indexOfFilmFound < 0) {
      const newFilm = { id: idAsNumber, ...filmProps };
      films.push(newFilm);
      serialize(jsonDbPath, films);
      return newFilm;
    }
  
    const filmPriorToChange = films[indexOfFilmFound];
  
    const updatedFilm = {
      ...filmPriorToChange,
      ...filmProps,
    };
  
    films[indexOfFilmFound] = updatedFilm;
  
    serialize(jsonDbPath, films);
  
    return updatedFilm;
  }


module.exports = {
    readAllFilms,
    readOneFilms,
    createOneFilms,
    deleteOneFilm,
    updateOneFilm,
    updateFullyOneFilmOrCreateOneFilm,
};

