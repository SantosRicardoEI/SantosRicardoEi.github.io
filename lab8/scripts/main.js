// A. Variables
const apiProdutos = 'https://deisishop.pw.deisi.ulusofona.pt'
const nodeProdutos = document.querySelector('#produtos');
const nodeCesto = document.querySelector('#cesto');
const filtroCategoria = document.querySelector('#filtro-categoria');
const filtroOrdenacao = document.querySelector('#filtro-ordenacao');
const filtroBusca = document.querySelector('#filtro-busca');
const cesto = localStorage.getItem('cesto') ? JSON.parse(localStorage.getItem('cesto')) : [];

// Inicialização
let produtos  = []
fetch(apiProdutos + "/products")
    .then(response => response.json())
    .then(data => {
        produtos = data;
        renderizarCategorias(produtos);
        renderizarProdutos(produtos, cesto, filtroCategoria.value, filtroOrdenacao.value, filtroBusca.value);
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



// B. Funções utilitárias

function ordenarProdutos(produtos, ordenacaoSelecionada) {
    if (ordenacaoSelecionada === 'preco-cre') {
        produtos.sort((a, b) => a.price - b.price);
    } else if (ordenacaoSelecionada === 'preco-dec') {
        produtos.sort((a, b) => b.price - a.price);
    }
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

// B. Event handlers

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


// Adicionar e remover do cesto

function adicionarAoCesto(produto) {
    cesto.push(produto);
    localStorage.setItem('cesto', JSON.stringify(cesto));
    renderizarCesto(cesto);
}

function removerDoCesto(produto) {
    const index = cesto.findIndex(item => item.id === produto.id);

    if (index !== -1) {
        cesto.splice(index, 1);

        localStorage.setItem('cesto', JSON.stringify(cesto));
        renderizarCesto(cesto);
    }
}

