document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('order-form');
    const ordersList = document.getElementById('orders-list');

    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const customerName = document.getElementById('customer-name').value;
        const order = document.getElementById('order').value;

        const newOrder = { customerName, order };
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));

        displayOrders();
        orderForm.reset();
    });

    function displayOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        ordersList.innerHTML = '';
        orders.forEach((order, index) => {
            const li = document.createElement('li');
            li.textContent = `${order.customerName} - ${order.order}`;
            ordersList.appendChild(li);
        });
    }

    displayOrders();
});

function adicionarItemMenu(nomeItem) {
    const select = document.getElementById('item');
    const option = document.createElement('option');
    option.text = nomeItem;
    option.value = nomeItem;
    select.add(option);
}

// Adicionar itens ao menu de pedidos
adicionarItemMenu('Feijoada');
adicionarItemMenu('Strogonoff');
adicionarItemMenu('Bife à milanesa');
adicionarItemMenu('Bife à parmegiana');
adicionarItemMenu('Caipirinha');
adicionarItemMenu('Suco natural');
adicionarItemMenu('Refrigerante');
adicionarItemMenu('Café');
adicionarItemMenu('Lasanha');
adicionarItemMenu('Whiskey');

// JavaScript para Gestão de Pedidos
const formPedidos = document.getElementById('form-pedidos');
const listaPedidos = document.getElementById('lista-pedidos');
const selecionarTodosBtn = document.getElementById('selecionar-todos');

// Adicionar botão de exclusão para cada item da lista
function adicionarBotaoExclusao(li) {
    const botaoExclusao = document.createElement('button');
    botaoExclusao.textContent = 'Excluir';
    botaoExclusao.classList.add('excluir');
    li.appendChild(botaoExclusao);
}

// Função para adicionar item ao menu de seleção
function adicionarItemMenu(nomeItem) {
    const select = document.getElementById('item');
    const option = document.createElement('option');
    option.text = nomeItem;
    option.value = nomeItem;
    select.add(option);
}

// Adicionar todos os itens disponíveis ao menu de seleção
const itensDisponiveis = [
    'Feijoada',
    'Strogonoff',
    'Bife à milanesa',
    'Bife à parmegiana',
    'Caipirinha',
    'Suco natural',
    'Refrigerante',
    'Café',
    'Strogonoff',
    'Whiskey'
];

itensDisponiveis.forEach(item => {
    adicionarItemMenu(item);
});

// Selecionar todos os itens disponíveis ao clicar no botão "Selecionar Todos"
selecionarTodosBtn.addEventListener('click', function() {
    const select = document.getElementById('item');
    itensDisponiveis.forEach(item => {
        const option = document.createElement('option');
        option.text = item;
        option.value = item;
        select.add(option);
    });
});

// Adicionar pedido à lista de pedidos e ao localStorage
formPedidos.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const item = document.getElementById('item').value;
    const quantidade = document.getElementById('quantidade').value;

    const pedido = { item, quantidade };

    // Adiciona o novo pedido à lista
    const li = document.createElement('li');
    li.textContent = `Pedido de ${pedido.quantidade} ${pedido.item}`;
    listaPedidos.appendChild(li);
    adicionarBotaoExclusao(li);

    // Atualiza o localStorage com a lista de pedidos
    let listaPedidosLocalStorage = localStorage.getItem('pedidos');
    if (!listaPedidosLocalStorage) {
        listaPedidosLocalStorage = [];
    } else {
        listaPedidosLocalStorage = JSON.parse(listaPedidosLocalStorage);
    }
    listaPedidosLocalStorage.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(listaPedidosLocalStorage));

    alert('Pedido realizado com sucesso!');
    formPedidos.reset();
});

// Exibir pedidos armazenados no localStorage
window.onload = function() {
    let listaPedidosLocalStorage = localStorage.getItem('pedidos');
    if (listaPedidosLocalStorage) {
        listaPedidosLocalStorage = JSON.parse(listaPedidosLocalStorage);
        listaPedidosLocalStorage.forEach(pedido => {
            const li = document.createElement('li');
            li.textContent = `Pedido de ${pedido.quantidade} ${pedido.item}`;
            listaPedidos.appendChild(li);
            adicionarBotaoExclusao(li);
        });
    }
};

// Excluir item da lista de pedidos ao clicar no botão de exclusão
listaPedidos.addEventListener('click', function(e) {
    if (e.target.classList.contains('excluir')) {
        e.target.parentElement.remove();
        const novoPedido = [];
        listaPedidos.querySelectorAll('li').forEach(item => {
            novoPedido.push({
                item: item.textContent.split(' ')[3],
                quantidade: item.textContent.split(' ')[2]
            });
        });
        localStorage.setItem('pedidos', JSON.stringify(novoPedido));
    }
});