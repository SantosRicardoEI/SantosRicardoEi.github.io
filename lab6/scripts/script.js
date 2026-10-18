// ==================== A. declaração de variáveis ====================
// [DOM] Formulario de registo e os seus campos
const form = document.querySelector("form");
const nodeInputNumero = document.querySelector("#registo input[type='number']");
const nodeInputSubmit = document.querySelector("#registo input[type='submit']");

// [DOM] Listas de cromos (coleão e repetidos)
const nodeUlColecao = document.querySelector("#colecao ul");
const nodeUlRepetidos = document.querySelector("#repetidos ul");

// [DOM] Contador de cromos (coleção e repetidos)
const nodeTotalColecao = document.querySelector("#colecao h3 span");
const nodeTotalRepetidos = document.querySelector("#repetidos h3 span");

// [LISTAS] Se ainda não há listas guardadas, começamos com arrays vazios, senão, carregamos as listas guardadas
const colecao = JSON.parse(localStorage.getItem("colecao") || "[]");
const repetidos = JSON.parse(localStorage.getItem("repetidos") || "[]");

// ==================== B. event handlers ====================
// Apaga e volta a desenhar uma lista no HTML.
function atualizaLista(lista, nodeUl) {
    nodeUl.innerHTML = "";

    // Criar um li por cromo. O index indica a posição na lista.
    lista.forEach((numero, index) => {
        const li = document.createElement("li");

        // Na lista de repetidos, cada número também tem um botão para o eliminar.
        if (nodeUl === nodeUlRepetidos) {
            li.innerHTML = `${numero} <button>Eliminar</button>`;

            // Ao clicar, remove este repetido, guarda a lista e volta a desenhá-la.
            li.querySelector("button").onclick = () => {
                repetidos.splice(index, 1);
                localStorage.setItem("repetidos", JSON.stringify(repetidos));
                atualizaLista(repetidos, nodeUlRepetidos);
            };
        } else {
            // Na coleção, mostramos apenas o número.
            li.textContent = numero;
        }

        // Coloca o <li> dentro do <ul> correspondente.
        nodeUl.append(li);
    });

    // Atualiza a contagem apresentada junto da lista.
    if (nodeUl === nodeUlColecao) {
        nodeTotalColecao.textContent = lista.length;
    } else {
        nodeTotalRepetidos.textContent = lista.length;
    }
}

// Guarda o número escrito no formulário na lista apropriada.
function guardaCarta() {
    // O valor de um input é recebido como texto.
    const numero = nodeInputNumero.value;

    // Se o número já estiver na coleção, é uma repetição.
    if (colecao.includes(numero)) {
        repetidos.push(numero);
        // Ordena os números do menor para o maior.
        repetidos.sort((a, b) => a - b);
        // Guarda a lista como texto JSON no navegador.
        localStorage.setItem("repetidos", JSON.stringify(repetidos));
        // Atualiza a lista e a contagem na página.
        atualizaLista(repetidos, nodeUlRepetidos);
    } else {
        // Se ainda não estiver na coleção, adiciona-o à coleção.
        colecao.push(numero);
        colecao.sort((a, b) => a - b);
        localStorage.setItem("colecao", JSON.stringify(colecao));
        atualizaLista(colecao, nodeUlColecao);
    }

    // Limpa o campo para permitir registar outro cromo.
    nodeInputNumero.value = "";
}

// ==================== C. event listeners ====================
// Interceta o envio do formulário para a página não recarregar.
form.onsubmit = (event) => {
    event.preventDefault();
    guardaCarta();
};

// ==================== D. inicialização ====================
// Mostra os dados guardados assim que a página abre.
atualizaLista(colecao, nodeUlColecao);
atualizaLista(repetidos, nodeUlRepetidos);

