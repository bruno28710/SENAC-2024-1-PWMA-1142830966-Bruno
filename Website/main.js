const itensSelecionados = [];

document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('click', () => {
        const itemNome = item.getAttribute('data-item');
        if (!itensSelecionados.includes(itemNome)) {
            itensSelecionados.push(itemNome);
            item.classList.add('selecionado');
        } else {
            itensSelecionados.splice(itensSelecionados.indexOf(itemNome), 1);
            item.classList.remove('selecionado');
        }
    });
});

document.querySelector('.menu li:nth-child(3) a').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `pedidos.html?itens=${itensSelecionados.join(',')}`;
});
