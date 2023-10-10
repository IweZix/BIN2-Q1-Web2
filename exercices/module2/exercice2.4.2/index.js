const divRed = document.querySelector('#red');
const divOrange = document.querySelector('#orange');
const divGreen = document.querySelector('#green');

const stopButton = document.querySelector('#stop');
const restartButton = document.querySelector('#restart');

let direction = "down";
let myInterval;

startApplication();

function startApplication() {
    myInterval = setInterval(start, 500);
}

function start() {
    if (divRed.style.backgroundColor === "" && divOrange.style.backgroundColor === "" && divGreen.style.backgroundColor === "") {
        divRed.style.backgroundColor = "red";
        direction = down;
    } else if (divRed.style.backgroundColor === "red") {
        divRed.style.backgroundColor = "";
        divOrange.style.backgroundColor = "orange"
    } else if (divOrange.style.backgroundColor === "orange" && direction === "down") {
        divOrange.style.backgroundColor = "";
        divGreen.style.backgroundColor = "green";
    } else if (divOrange.style.backgroundColor === "orange" && direction === "up") {
        divOrange.style.backgroundColor = "";
        divRed.style.backgroundColor = "red";
        direction = "down"
    } else {
        divGreen.style.backgroundColor = "";
        divOrange.style.backgroundColor = "orange"
        direction = "up"
    }
}   

function stop(interval) {
    clearInterval(interval);
}


