document.addEventListener('DOMContentLoaded', () => {
    const stockForm = document.getElementById('stock-form');
    const stockTable = document.getElementById('stock-table').getElementsByTagName('tbody')[0];
    const stockId = document.getElementById('stock-id');
    const itemInput = document.getElementById('item');
    const quantityInput = document.getElementById('quantity');

    stockForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const id = stockId.value || Date.now().toString();
        const item = itemInput.value;
        const quantity = quantityInput.value;

        const stockItem = { id, item, quantity };

        let stock = JSON.parse(localStorage.getItem('stock')) || [];
        
        const existingIndex = stock.findIndex(item => item.id === id);
        if (existingIndex >= 0) {
            stock[existingIndex] = stockItem;
        } else {
            stock.push(stockItem);
        }
        
        localStorage.setItem('stock', JSON.stringify(stock));

        displayStock();
        stockForm.reset();
        stockId.value = '';
    });

    function displayStock() {
        const stock = JSON.parse(localStorage.getItem('stock')) || [];
        stockTable.innerHTML = '';
        stock.forEach((stockItem) => {
            const row = stockTable.insertRow();
            row.setAttribute('data-id', stockItem.id);
            row.innerHTML = `
                <td>${stockItem.item}</td>
                <td>${stockItem.quantity}</td>
                <td>
                    <button class="edit">Editar</button>
                    <button class="delete">Excluir</button>
                </td>
            `;
        });
    }

    stockTable.addEventListener('click', (event) => {
        const row = event.target.closest('tr');
        const id = row.getAttribute('data-id');
        let stock = JSON.parse(localStorage.getItem('stock')) || [];

        if (event.target.classList.contains('delete')) {
            stock = stock.filter(item => item.id !== id);
            localStorage.setItem('stock', JSON.stringify(stock));
            displayStock();
        } else if (event.target.classList.contains('edit')) {
            const stockItem = stock.find(item => item.id === id);
            stockId.value = stockItem.id;
            itemInput.value = stockItem.item;
            quantityInput.value = stockItem.quantity;
        }
    });

    displayStock();
});

// JavaScript para Controle de Estoque
const formEstoque = document.getElementById('form-estoque');
const listaEstoque = document.getElementById('lista-estoque');

// Exemplo de item de estoque
const itensEstoque = [
    { codigo: '001', nome: 'Arroz', quantidade: 10 },
    { codigo: '002', nome: 'Feijão', quantidade: 5 },
    { codigo: '003', nome: 'Carne', quantidade: 3 }
];

// Função para adicionar item ao estoque
function adicionarItemEstoque(item) {
    const li = document.createElement('li');
    li.textContent = `Código: ${item.codigo} - Nome: ${item.nome} - Quantidade: ${item.quantidade} unidades`;
    listaEstoque.appendChild(li);

    const botaoExclusao = document.createElement('button');
    botaoExclusao.textContent = 'Excluir';
    botaoExclusao.classList.add('excluir');
    li.appendChild(botaoExclusao);
}

// Exibir lista de itens de estoque
itensEstoque.forEach(item => {
    adicionarItemEstoque(item);
});

// Cadastrar novo item de estoque
formEstoque.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const codigo = document.getElementById('codigo').value;
    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;

    const novoItemEstoque = { codigo, nome, quantidade };
    adicionarItemEstoque(novoItemEstoque);

    alert('Item cadastrado com sucesso!');
    formEstoque.reset();
});

// Excluir item de estoque
listaEstoque.addEventListener('click', function(e) {
    if (e.target.classList.contains('excluir')) {
        e.target.parentElement.remove();
    }
});