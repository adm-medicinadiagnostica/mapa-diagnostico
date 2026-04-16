let agendaAtual = 'agenda1';
const mesesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// Controle de Páginas
function showPage(p) {
    document.querySelectorAll('.page').forEach(pg => pg.classList.remove('active'));
    document.getElementById(p).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-btn'));
    const btnAtivo = document.getElementById('btn-' + p);
    if (btnAtivo) btnAtivo.classList.add('active-btn');
    if (p === 'agendas') carregarAgendaSalva();
}

// Filtro de Busca Inteligente
function filtrar(contexto) {
    let inputId = contexto === 'diagnostica' ? 'searchDiag' : 'searchInter';
    let filter = document.getElementById(inputId).value.toLowerCase();
    let gridId = contexto === 'diagnostica' ? 'grid-diagnostica' : 'grid-intervencionista';
    let cards = document.querySelectorAll(`#${gridId} .column-card`);

    cards.forEach(card => {
        let buttons = card.querySelectorAll('button');
        let cardTemCorrespondencia = false;

        buttons.forEach(btn => {
            let txt = btn.innerText.toLowerCase();
            if (txt.includes(filter)) {
                btn.style.display = "block";
                cardTemCorrespondencia = true;
            } else {
                btn.style.display = "none";
            }
        });
        card.style.display = cardTemCorrespondencia ? "block" : "none";
    });
}

// Modal
function openModal(title, text) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerHTML = text;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() { document.getElementById('modal').style.display = 'none'; }

// Seleção de Agenda
function selecionarAgenda(id, btn) {
    agendaAtual = id;
    document.querySelectorAll('.agenda-selector-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    carregarAgendaSalva();
}

// Gerar Grade de Domingo a Sábado (06:00 às 23:00)
function gerarGrade() {
    const slot = 20;
    const container = document.getElementById('gradeSemanal');
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    let html = `<table class="grade-table"><thead><tr><th>Hora</th>`;
    dias.forEach(d => html += `<th>${d}</th>`);
    html += `</tr></thead><tbody>`;
    
    for (let min = 360; min < 1380; min += slot) {
        let h = Math.floor(min / 60).toString().padStart(2, '0');
        let m = (min % 60).toString().padStart(2, '0');
        html += `<tr><td><strong>${h}:${m}</strong></td>`;
        for (let d = 0; d < 7; d++) {
            html += `<td><select class="select-status" onchange="atualizarKPI()"><option value="eletivo">Eletivo</option><option value="manutencao">Manutenção</option></select></td>`;
        }
        html += `</tr>`;
    }
    container.innerHTML = html + `</tbody></table>`;
    atualizarKPI();
}

function atualizarKPI() {
    const selects = document.querySelectorAll('.select-status');
    let ex = 0, ma = 0;
    selects.forEach(s => {
        s.className = 'select-status status-' + s.value;
        if(s.value === 'eletivo') ex++;
        if(s.value === 'manutencao') ma++;
    });
    // Cálculo Projetado Mensal
    document.getElementById('kpiExames').innerText = ex * 4;
    document.getElementById('kpiManutencao').innerText = ma * 4;
}

function carregarAgendaSalva() {
    gerarGrade();
    const d = new Date();
    document.getElementById('display-detalhe').innerText = mesesNomes[d.getMonth()] + " / " + d.getFullYear();
}

window.onload = () => {
    // Inicia seletores de mês (pode expandir conforme v5.3)
    const mesSel = document.getElementById('selectMes');
    if(mesSel) mesesNomes.forEach((m, i) => mesSel.add(new Option(m, i)));
    carregarAgendaSalva();
};
