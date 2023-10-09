const compteur = document.querySelector('#compteur');
const phrase = document.querySelector('#phrase');

let clic = 0;

window.addEventListener('click', () => {
    clic++;
    compteur.innerHTML = clic;
    if (clic > 4 && clic < 9)
        phrase.innerHTML = `Bravo, bel échauffement !`;
    else if (clic > 9)
        phrase.innerHTML = `Vous êtes passé maître en l'art du clic !`;
})