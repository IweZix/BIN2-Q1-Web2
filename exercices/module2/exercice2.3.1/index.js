let name = document.querySelector('#name');
let surname = document.querySelector('#surname');
let email = document.querySelector('#email');
let btn = document.querySelector('#btn');
let resetBtn;
const body = document.querySelector('body');

const DEFAULT_BODY = `
    <div id="formDiv">
        <form id="form">
            name : <input type="text" name="name" id="name"> <br> <br>
            surname : <input type="text" name="surname" id="surname"> <br> <br>
            email : <input type="text" name="email" id="email"> <br> <br>
            <input type="button" value="SUBMIT" id="btn">
        </form>
    </div>`;

function form(name, surname, email) {
    body.innerHTML = `
    <div>
        Votre prénom est : ${name.value} <br>
        Votre nom est : ${surname.value} <br>
        Votre email est : ${email.value} <br>
    </div>
    <form>
        <input type="button" value="RESET" id="resetBtn">
    </form>`;

    resetBtn = document.querySelector('#resetBtn');
}

btn.addEventListener('click', (e) => {
    form(name, surname, email);
    e.preventDefault();
})

body.addEventListener('click', (e) => {
    if (e.target.id === 'resetBtn') {
        body.innerHTML = DEFAULT_BODY;
        name = document.querySelector('#name');
        surname = document.querySelector('#surname');
        email = document.querySelector('#email');
        btn = document.querySelector('#btn');
        
        btn.addEventListener('click', (e) => {
            form(name, surname, email);
            e.preventDefault();
        });
    }
})
