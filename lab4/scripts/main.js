/* Contador */
let counter = 0;
const heading = document.querySelector('#counter');
const button = document.querySelector('#incrementButton');

button.addEventListener('click', count);
function count() {
   counter++;
   heading.textContent = counter;
} 


/* Botão fugitivo */
const runawayButton = document.querySelector('#runawayButton');
const escapeZone = document.querySelector('.escape-zone');

runawayButton.addEventListener('pointerenter', moveButton);
function moveButton() {
    const maxX = escapeZone.clientWidth - runawayButton.offsetWidth;
    const maxY = escapeZone.clientHeight - runawayButton.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    runawayButton.style.left = `${randomX}px`;
    runawayButton.style.top = `${randomY}px`;
    runawayButton.style.transform = 'none';
}


/* Desenho */
const drawingArea = document.querySelector('#drawingArea');

drawingArea.addEventListener('mousemove', (event) => {
    const dot = document.createElement('span');

    dot.textContent = '✦';
    dot.style.left = `${event.offsetX}px`;
    dot.style.top = `${event.offsetY}px`;

    drawingArea.appendChild(dot);
});


/* Abrir ficheiro misterioso */
const messageFile = document.querySelector('#messageFile');
const messageWindow = document.querySelector('#messageWindow');
const closeWindow = document.querySelector('#closeWindow');

messageFile.addEventListener('dblclick', () => {
    messageWindow.showModal();
});

closeWindow.addEventListener('click', () => {
    messageWindow.close();
});



/* Temporizador de área */
const timerArea = document.querySelector('#timerArea');
const timerDisplay = document.querySelector('#timer');

let seconds = 0;
let timerId;

timerArea.addEventListener('mouseenter', () => {
    timerId = setInterval(() => {
        seconds++;
        timerDisplay.textContent = seconds;
    }, 1000);
});

timerArea.addEventListener('mouseleave', () => {
    clearInterval(timerId);

    seconds = 0;
    timerDisplay.textContent = seconds;
});