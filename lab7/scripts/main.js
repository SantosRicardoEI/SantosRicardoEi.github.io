// A. Variables

const nodeProdutos = document.querySelector('#produtos');
const nodeCesto = document.querySelector('#cesto');
const cesto = localStorage.getItem('cesto') ? JSON.parse(localStorage.getItem('cesto')) : [];

// B. Event handlers

function renderizarProdutos(produtos,cesto) {
    nodeProdutos.querySelectorAll(':scope > article').forEach(article => article.remove());
    nodeCesto.querySelectorAll(':scope > article').forEach(article => article.remove());

    produtos.forEach(produto => {
        const nodeProduto = criarProduto(produto);
        const button = document.createElement('button');
        button.textContent = 'Comprar';
        button.type = 'button';
        nodeProduto.append(button);
        nodeProdutos.appendChild(nodeProduto)

        // Listener
        button.addEventListener('click', () => {
            adicionarAoCesto(produto);
        });

    });
    cesto.forEach(produto => {
        const button = document.createElement('button');
        button.textContent = 'Remover do Cesto';
        button.type = 'button';
        const nodeProduto = criarProduto(produto);
        nodeProduto.append(button);
        nodeCesto.appendChild(nodeProduto)

        // Listener
        button.addEventListener('click', () => {
            removerDoCesto(produto);
        });
    });
}



// B. Funções utilitárias

function criarProduto(produto) {
    const nodeProduto = document.createElement('article');

    const image = document.createElement('img');
    const titulo = document.createElement('h2');
    const description = document.createElement('p');
    const price = document.createElement('p');

    image.src = produto.image;
    image.alt = produto.title;

    titulo.textContent = produto.title;

    description.textContent = produto.description;
    description.classList.add('descricao');

    price.textContent = `Preço: ${produto.price}€`;
    price.classList.add('preco');

    nodeProduto.append(image, titulo, description, price);

    return nodeProduto;
}

function adicionarAoCesto(produto) {
    cesto.push(produto);
    localStorage.setItem('cesto', JSON.stringify(cesto));
    nodeCesto.innerHTML = '';
    renderizarProdutos(produtos, cesto);
}

function removerDoCesto(produto) {
    const index = cesto.findIndex(item => item.id === produto.id);
    if (index !== -1) {
        cesto.splice(index, 1);
        localStorage.setItem('cesto', JSON.stringify(cesto));
        nodeCesto.innerHTML = '';
        renderizarProdutos(produtos, cesto);
    }
}

// D. Inicialização
renderizarProdutos(produtos, cesto);