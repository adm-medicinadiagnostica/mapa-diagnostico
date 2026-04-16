let agendaAtual = 'agenda1';
const mesesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function showPage(p) {
    document.querySelectorAll('.page').forEach(pg => pg.classList.remove('active'));
    document.getElementById(p).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-btn'));
    const btnAtivo = document.getElementById('btn-' + p);
    if (btnAtivo) btnAtivo.classList.add('active-btn');
    if (p === 'agendas') carregarAgendaSalva();
}

function openModal(title, text) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerHTML = text; // Permite HTML no texto
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Lógica de Agendas
function iniciarSeletores() {
    const mesSel = document.getElementById('selectMes');
    const anoSel = document.getElementById('selectAno');
    if (!mesSel) return;
    const d = new Date();
    mesesNomes.forEach((m, i) => mesSel.add(new Option(m, i)));
    for (let a = d.getFullYear(); a <= d.getFullYear() + 1; a++) anoSel.add(new Option(a, a));
    mesSel.value = d.getMonth();
}

function gerarGrade() {
    const slot = 20; // Fixo para exemplo, mas pode ser dinâmico
    const container = document.getElementById('gradeSemanal');
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    let html = `<table class="grade-table"><thead><tr><th>Hora</th>`;
    dias.forEach(d => html += `<th>${d}</th>`);
    html += `</tr></thead><tbody>`;
    for (let min = 360; min < 1380; min += slot) {
        let h = Math.floor(min / 60).toString().padStart(2, '0');
        let m = (min % 60).toString().padStart(2, '0');
        html += `<tr><td><strong>${h}:${m}</strong></td>`;
        for (let dia = 0; dia < 7; dia++) {
            html += `<td><select class="select-status" id="s-${min}-${dia}" onchange="atualizarKPI()"><option value="eletivo">Eletivo</option><option value="manutencao">Manutenção</option></select></td>`;
        }
        html += `</tr>`;
    }
    container.innerHTML = html + `</tbody></table>`;
    atualizarKPI();
}

function carregarAgendaSalva() {
    gerarGrade();
    // Aqui viria a lógica de LocalStorage...
}

function atualizarKPI() {
    const selects = document.querySelectorAll('.select-status');
    let ex = 0, ma = 0;
    selects.forEach(s => {
        if(s.value === 'eletivo') ex++;
        if(s.value === 'manutencao') ma++;
        s.className = 'select-status status-' + s.value;
    });
    document.getElementById('kpiExames').innerText = ex * 4;
    document.getElementById('kpiManutencao').innerText = ma * 4;
}

window.onload = () => {
    iniciarSeletores();
};
