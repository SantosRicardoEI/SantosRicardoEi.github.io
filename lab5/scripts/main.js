/* ------- Contadores ------- */
let counter1 = 0;
/* com arrow function, e sem variaveis */
document.querySelector('#countButton').addEventListener('click', () => {
    counter1++;
    document.querySelector('#counter1').textContent = counter1;
});

/* ------- contador persistente ------- */
/* cria local storage para counter se não existir */
if (!localStorage.getItem('counter2')) {
    localStorage.setItem('counter2', '0');
}
/* Operações com o counter2, manuseia no local storage 
e atualiza interface com valor de localstorage */
document.querySelector('#incrementButton').addEventListener('click', () => {
    let counter2 = localStorage.getItem('counter2');
    counter2++;
    document.querySelector('#counter2').textContent = counter2;
    localStorage.setItem('counter2', counter2);
});
document.querySelector('#resetButton').addEventListener('click', () => {
    localStorage.setItem('counter2', '0');
    document.querySelector('#counter2').textContent = '0';
});
document.querySelector('#decrementButton').addEventListener('click', () => {
    let counter2 = localStorage.getItem('counter2');
    counter2--;
    localStorage.setItem('counter2', counter2);     
    document.querySelector('#counter2').textContent = counter2;
});

/* Ao carregar a página, atualiza o contador com o valor do local storage */
document.querySelector('#counter2').textContent = localStorage.getItem('counter2');


/* ------- Botao para colorir texto ------- */
/* usando querySelectorAll */
const botoes = document.querySelectorAll(".painterButton");
const textPaint = document.querySelector("#textPaint");

/* usando forEach e data-color */
botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        textPaint.style.color = botao.dataset.color;
    });
});

/* ------- Passa por aqui ------- */
const hoverChangeText = document.querySelector("#hoverChange");
hoverChangeText.addEventListener("mouseover", () => {
    hoverChangeText.textContent = "Obrigado por passares!";
});
hoverChangeText.addEventListener("mouseout", () => {
    hoverChangeText.textContent = "Passa por aqui!";
});


/* ------- Input reativo com cores ------- */
const reactiveInput = document.querySelector("#reactiveInput");
const colors = ["orange", "purple", "pink", "yellow"];
reactiveInput.addEventListener("input", () => {
    reactiveInput.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
});

/* ------- Input para escolher cor ------- */
const colorSelector = document.querySelector("#colorSelector");
const body = document.querySelector("body");

/* usando this */
colorSelector.addEventListener("change", function() {
    body.style.backgroundColor = this.value;
});

/* ------- Select para flex direction ------- */
const flexSelector = document.querySelector("#flexSelector");
const flexContainer = document.querySelector("#flexContainer");

flexSelector.addEventListener("change", () => {
    flexContainer.style.flexDirection = flexSelector.value;
});

/* ------- Formulário ------- */
const nameForm = document.querySelector("#nameForm");
const name = document.querySelector("#name");
const age = document.querySelector("#age");
const submitMessage = document.querySelector("#submitMessage");

nameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitMessage.textContent = `Olá, o ${name.value} tem ${age.value} anos!`;
});

/* ------- Temporizador ------- */

if (!localStorage.getItem('timer')) {
    localStorage.setItem('timer', '0');
}
function updateTimer() {
    let timer = localStorage.getItem('timer');
    timer++;
    localStorage.setItem('timer', timer);
    document.querySelector("#timer").textContent = localStorage.getItem('timer');
}

document.querySelector("#timer").textContent = localStorage.getItem('timer');
setInterval(updateTimer, 1000);