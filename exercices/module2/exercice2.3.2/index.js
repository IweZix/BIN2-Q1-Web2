const divs = document.querySelectorAll('.color-div');

let lastDiv;

divs.forEach((div) => {
    div.addEventListener("click", () => {
        if (lastDiv !== undefined) {
            lastDiv.innerText = ``;
            lastDiv.style.width = '50px';
            lastDiv.style.height = '50px';
        }
        div.innerText = div.style.backgroundColor;
        div.style.width = '100px';
        div.style.height = '100px';
        lastDiv = div;
        console.log(lastDiv);
    });
  
  });