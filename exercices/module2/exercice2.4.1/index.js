const compteur = document.querySelector('#compteur');
const button = document.querySelector('#button');

let clic = 0;
let timeoutId;
const delayInSecondes = 5;
const delayInMilisecondes = delayInSecondes * 1000;

button.addEventListener('click', () => {
    if (clic > 9) {
        clearTimeout(timeoutId);
        alert(`You Win !`);
        clic = 0;
    }
    if (timeoutId === undefined) {
        timeoutId = setTimeout(() => {
            alert(`Game over, you did not click 10 times within 5s !`)
        }, delayInMilisecondes);
    }
    clic++;
    compteur.innerHTML = clic;
})
