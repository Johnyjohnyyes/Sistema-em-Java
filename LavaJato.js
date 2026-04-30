const form = document.getElementById('lavajato-form');
const listaVeiculos = document.getElementById('lista-veiculos');
const contadorTotal = document.getElementById('contador-total');

let atendimentos = JSON.parse(localStorage.getItem('brilho_rapido_dados')) || [];

function salvarEDesenhar() {
    localStorage.setItem('brilho_rapido_dados', JSON.stringify(atendimentos));
    renderizar();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cliente = document.getElementById('cliente').value;
    const servico = document.getElementById('servico').value;

    atendimentos.push({
        id: Date.now(),
        cliente,
        servico,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    form.reset();
    salvarEDesenhar();
});

function removerAtendimento(id) {
    atendimentos = atendimentos.filter(item => item.id !== id);
    salvarEDesenhar();
}

function renderizar() {
    listaVeiculos.innerHTML = '';
    atendimentos.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card-atendimento';
        div.innerHTML = `
            <div>
                <strong>${item.cliente}</strong> <span class="badge">${item.servico}</span>
                <br><small>🕒 ${item.hora}</small>
            </div>
            <button onclick="removerAtendimento(${item.id})" class="btn-check">Concluído</button>
        `;
        listaVeiculos.appendChild(div);
    });
    contadorTotal.innerText = atendimentos.length;
}

renderizar();