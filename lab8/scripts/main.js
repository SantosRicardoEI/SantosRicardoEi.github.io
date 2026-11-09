// ======================================= Variáveis =======================================

// API
const apiProdutos = 'https://deisishop.pw.deisi.ulusofona.pt';
const endpoint = '/products';

// Listas de produtos e cesto
const nodeProdutos = document.querySelector('#produtos');
const nodeCesto = document.querySelector('#cesto');

// Filtros
const filtroCategoria = document.querySelector('#filtro-categoria');
const filtroOrdenacao = document.querySelector('#filtro-ordenacao');
const filtroBusca = document.querySelector('#filtro-busca');

// Local Storage
const cesto = localStorage.getItem('cesto') ? JSON.parse(localStorage.getItem('cesto')) : [];
const wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];

// Formulário de checkout
const nodeTotal = document.querySelector('#total');
const formularioCheckout = document.querySelector('#checkout-form');
const estudante = document.querySelector('#estudante').checked;
const cupao = document.querySelector('#cupao').value.trim();

// ======================================= Inicialização =======================================

// Fetch produtos do API e renderizar na página
let produtos  = []
fetch(apiProdutos + endpoint)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro no pedido: ' + response.status);
        }
        return response.json()})
    .then(data => {
        produtos = data;
        renderizarCategorias(produtos);
        renderizarProdutos(produtos, cesto, filtroCategoria.value, filtroOrdenacao.value, filtroBusca.value);
        atualizarTotal();
    })
    .catch(error => console.error('Erro: ' + error))

// Event Listeners
filtroCategoria.addEventListener('change', () => {
    renderizarProdutos(produtos, cesto, filtroCategoria.value, filtroOrdenacao.value,filtroBusca.value);
});

filtroOrdenacao.addEventListener('change', () => {
    renderizarProdutos(produtos, cesto, filtroCategoria.value, filtroOrdenacao.value, filtroBusca.value);
});

filtroBusca.addEventListener('input', () => {
    renderizarProdutos(produtos, cesto, filtroCategoria.value, filtroOrdenacao.value, filtroBusca.value);
});

formularioCheckout.addEventListener('submit', (event) => {
    event.preventDefault();
    gerarPagamento();
});

// ======================================= Funções utilitárias =======================================

// Cria article produto
function criarProduto(produto) {
    const nodeProduto = document.createElement('article');

    const image = document.createElement('img');
    const titulo = document.createElement('h2');
    const description = document.createElement('p');
    const price = document.createElement('p');

    image.src =  apiProdutos + produto.image;
    image.alt = produto.title;
    image.classList.add('imagem');

    titulo.textContent = produto.title;
    titulo.classList.add('titulo');

    description.textContent = produto.description;
    description.classList.add('descricao');

    price.textContent = `Preço: ${produto.price}€`;
    price.classList.add('preco');

    nodeProduto.append(titulo, image, description, price);

    return nodeProduto;
}


// Ordena uma lista de produtos dada
function ordenarProdutos(produtos, ordenacaoSelecionada) {
    if (ordenacaoSelecionada === 'preco-cre') {
        produtos.sort((a, b) => a.price - b.price);
    } else if (ordenacaoSelecionada === 'preco-dec') {
        produtos.sort((a, b) => b.price - a.price);
    }
}

function gerarPagamento() {

        /*
    Request:
        {
        "products": [0],
        "student": false,
        "coupon": "",
        "name": ""
        }
   Response:
        {
        "totalCost": "string",
        "reference": "string",
        "message": "string",
        "error": ""
        } 
    */

    const dados = {
    products: cesto.map(produto => produto.id),
    student: document.querySelector('#estudante').checked,
    coupon: document.querySelector('#cupao').value.trim(),
    name: document.querySelector('#nome').value.trim()
    };

    console.log("Request enviado:", dados);

    fetch(apiProdutos + "/buy", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => { 

        if (!response.ok) {
            return response.json().then(data => {
                console.error("Erro devolvido pela API:", data);
                throw new Error(data.error || data.message || `HTTP ${response.status}`);
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }

        console.log('Pagamento gerado com sucesso:', data);
        renderizarPagamento(data);
        formularioCheckout.reset();
    })
    .catch(error => {
        console.error('Erro ao gerar pagamento:', error);
        renderizarPagamento({
            totalCost: '',
            reference: '',
            message: '',
            error: error.message
        }); 
    });
}

// ======================================= Renders =======================================

function renderizarPagamento(data) {
    const nodePayment = document.querySelector('#Payment');
    nodePayment.innerHTML = '';

    if (data.error) {
        const erro = document.createElement('p');
        erro.textContent = data.error;
        erro.classList.add('erro');
        nodePayment.appendChild(erro);
        return;
    }

    const totalCost = document.createElement('p');
    totalCost.textContent = `Custo total: ${data.totalCost}`;

    const reference = document.createElement('p');
    reference.textContent = `Referência: ${data.reference}`;

    const message = document.createElement('p');
    message.textContent = `Mensagem: ${data.message}`;

    nodePayment.append(totalCost, reference, message);
}

function renderizarCategorias(produtos) {
    const categorias = [];

    produtos.forEach(produto => {
        if (!categorias.includes(produto.category)) {
            categorias.push(produto.category);
        }
    });

    filtroCategoria.innerHTML = '';

    const optionTudo = document.createElement('option');
    optionTudo.value = '';
    optionTudo.textContent = 'Tudo';
    filtroCategoria.appendChild(optionTudo);

    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        filtroCategoria.appendChild(option);
    });
}

function atualizarTotal() {
    let total = 0;

    cesto.forEach(produto => {
        total += Number(produto.price);
    });
    nodeTotal.textContent = total + '€';
}

function renderizarProdutos(produtos, cesto, categoria, ordenacao, busca) {
    ordenarProdutos(produtos, ordenacao);

    let produtosFiltrados = categoria
        ? produtos.filter(produto => produto.category === categoria)
        : produtos;

    if (busca) {
        produtosFiltrados = produtosFiltrados.filter(produto =>
            produto.title.toLowerCase().includes(busca.toLowerCase()) ||
            produto.category.toLowerCase().includes(busca.toLowerCase())
        );
    }

    nodeProdutos.querySelectorAll(':scope > article')
        .forEach(article => article.remove());

    produtosFiltrados.forEach(produto => {
        const nodeProduto = criarProduto(produto);

        const button = document.createElement('button');
        button.textContent = 'Comprar';
        button.type = 'button';

        button.addEventListener('click', () => {
            adicionarAoCesto(produto);
        });

        nodeProduto.append(button);
        nodeProdutos.appendChild(nodeProduto);
    });

    renderizarCesto(cesto);
}

function renderizarCesto(cesto) {
    nodeCesto.querySelectorAll(':scope > article')
        .forEach(article => article.remove());

    cesto.forEach(produto => {
        const nodeProduto = criarProduto(produto);
        nodeProduto.querySelector('.descricao').remove();

        const button = document.createElement('button');
        button.textContent = 'Remover do Cesto';
        button.type = 'button';

        button.addEventListener('click', () => {
            removerDoCesto(produto);
        });

        nodeProduto.append(button);
        nodeCesto.appendChild(nodeProduto);
    });
}


// ======================================= Gestão do cesto =======================================
function adicionarAoCesto(produto) {
    cesto.push(produto);
    localStorage.setItem('cesto', JSON.stringify(cesto));
    renderizarCesto(cesto);
    atualizarTotal();
}

function removerDoCesto(produto) {
    const index = cesto.findIndex(item => item.id === produto.id);

    if (index !== -1) {
        cesto.splice(index, 1);

        localStorage.setItem('cesto', JSON.stringify(cesto));
        renderizarCesto(cesto);
    }

    atualizarTotal();
}

function esvaziarCesto() {
    cesto.length = 0;
    localStorage.setItem('cesto', JSON.stringify(cesto));
    renderizarCesto(cesto);
    atualizarTotal();
}



