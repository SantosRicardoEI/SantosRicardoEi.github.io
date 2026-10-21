// A. declaração de variáveis

const nodeForm = document.querySelector("form");
const nodeInputNumero = document.querySelector("input[type='number']");

const nodeUlColecao = document.querySelector("#colecao ul");
const nodeContador = document.querySelector("#contador");

const nodeUlRepetidos = document.querySelector("#repetidos ul");
const nodeContadorRepetidos = document.querySelector("#contador-repetidos");

const colecao = JSON.parse(localStorage.getItem("colecao") || "[]");
const repetidos = JSON.parse(localStorage.getItem("repetidos") || "[]");

localStorage.clear();
colecao = []
repetidos = []

atualizaLista();

// B. Event Handlers
function guardaCarta() {
    var numero = nodeInputNumero.value;

    if (colecao.includes(numero)) {
        repetidos.push(nodeInputNumero.value);
        repetidos.sort((a, b) => a - b);
    } else {
        colecao.push(numero);
        colecao.sort((a, b) => a - b);
    }
    
    atualizaLista();
}

// Atualiza dados no HTML e no localStorage
function atualizaLista() {
    nodeUlColecao.innerHTML = "";
    nodeUlRepetidos.innerHTML = "";

    colecao.forEach(numero => {
        const nodeLi = document.createElement("li");
        nodeLi.textContent = numero;
        nodeUlColecao.appendChild(nodeLi);
    });

    repetidos.forEach(numero => {
        const nodeLi = document.createElement("li");
        nodeLi.textContent = numero;
        const nodeButton = document.createElement("button");
        nodeButton.textContent = "Eliminar";
        nodeButton.classList.add("botao-eliminar");
        nodeLi.appendChild(nodeButton);

        nodeButton.addEventListener("click", function(event) {
            event.preventDefault();
            const index = repetidos.indexOf(numero);
            repetidos.splice(index, 1);
            atualizaLista();
        })

        nodeUlRepetidos.appendChild(nodeLi);
    });

    nodeContador.textContent = colecao.length;
    nodeContadorRepetidos.textContent = repetidos.length;

    localStorage.setItem("colecao", JSON.stringify(colecao));
    localStorage.setItem("repetidos", JSON.stringify(repetidos));
}

// C. Event Listeners

nodeForm.addEventListener("submit", function(event) {
    event.preventDefault();
    guardaCarta();
    nodeInputNumero.value = "";
});
