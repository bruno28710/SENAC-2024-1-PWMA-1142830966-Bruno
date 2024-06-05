document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.getElementById('reservation-form');
    const reservationsList = document.getElementById('reservations-list');

    reservationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const people = document.getElementById('people').value;
        const time = document.getElementById('time').value;

        const reservation = { name, phone, people, time };
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));

        displayReservations();
        reservationForm.reset();
    });

    function displayReservations() {
        const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservationsList.innerHTML = '';
        reservations.forEach((reservation, index) => {
            const li = document.createElement('li');
            li.textContent = `${reservation.name} - ${reservation.phone} - ${reservation.people} pessoas - ${reservation.time}`;
            reservationsList.appendChild(li);
        });
    }

    displayReservations();
});

// JavaScript para Gestão de Reservas
const formReservas = document.getElementById('form-reservas');
const listaReservas = document.getElementById('lista-reservas');

formReservas.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const horario = document.getElementById('horario').value;
    const pessoas = document.getElementById('pessoas').value;

    const reserva = { nome, horario, pessoas };

    // Verifica se já existe uma lista de reservas no localStorage
    let listaReservasLocalStorage = localStorage.getItem('reservas');
    if (!listaReservasLocalStorage) {
        listaReservasLocalStorage = [];
    } else {
        listaReservasLocalStorage = JSON.parse(listaReservasLocalStorage);
    }

    // Adiciona a nova reserva à lista
    listaReservasLocalStorage.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(listaReservasLocalStorage));

    // Atualiza a lista de reservas exibida na página
    const li = document.createElement('li');
    li.textContent = `Reserva de ${reserva.nome} para ${reserva.pessoas} pessoas às ${reserva.horario}`;
    listaReservas.appendChild(li);
    adicionarBotaoExclusao(li);

    alert('Reserva realizada com sucesso!');
    formReservas.reset();
});

// Exibir reservas armazenadas no localStorage
window.onload = function() {
    let listaReservasLocalStorage = localStorage.getItem('reservas');
    if (listaReservasLocalStorage) {
        listaReservasLocalStorage = JSON.parse(listaReservasLocalStorage);
        listaReservasLocalStorage.forEach(reserva => {
            const li = document.createElement('li');
            li.textContent = `Reserva de ${reserva.nome} para ${reserva.pessoas} pessoas às ${reserva.horario}`;
            listaReservas.appendChild(li);
            adicionarBotaoExclusao(li);
        });
    }
};

// Adicionar botão de exclusão para cada reserva da lista
function adicionarBotaoExclusao(li) {
    const botaoExclusao = document.createElement('button');
    botaoExclusao.textContent = 'Excluir Reserva';
    botaoExclusao.classList.add('excluir');
    li.appendChild(botaoExclusao);
}

// Excluir reserva da lista ao clicar no botão de exclusão
listaReservas.addEventListener('click', function(e) {
    if (e.target.classList.contains('excluir')) {
        e.target.parentElement.remove();
        const novasReservas = [];
        listaReservas.querySelectorAll('li').forEach(item => {
            novasReservas.push({
                nome: item.textContent.split(' ')[2],
                horario: item.textContent.split(' ')[8],
                pessoas: item.textContent.split(' ')[4]
            });
        });
        localStorage.setItem('reservas', JSON.stringify(novasReservas));
    }
});