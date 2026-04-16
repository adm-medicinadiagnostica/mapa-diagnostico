// Navegação
function showPage(p) {
    document.querySelectorAll('.page').forEach(pg => pg.classList.remove('active'));
    document.getElementById(p).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-btn'));
    const btn = document.getElementById('btn-' + p);
    if (btn) btn.classList.add('active-btn');
}

// Filtro de Busca
function filtrarConteudo(contexto) {
    let inputId = contexto === 'diagnostica' ? 'searchDiagnostica' : 'searchIntervencionista';
    let filter = document.getElementById(inputId).value.toLowerCase();
    let gridId = contexto === 'diagnostica' ? 'grid-diagnostica' : 'grid-intervencionista';
    let buttons = document.querySelectorAll(`#${gridId} .button-list button`);

    buttons.forEach(btn => {
        let texto = btn.innerText.toLowerCase();
        // A busca também "olha" para o texto que passamos no openModal (simulado aqui)
        let modalText = btn.getAttribute('onclick').toLowerCase(); 
        
        if (texto.includes(filter) || modalText.includes(filter)) {
            btn.style.display = "";
            btn.parentElement.parentElement.style.display = ""; // Mostra o card pai
        } else {
            btn.style.display = "none";
        }
    });

    // Esconde colunas que ficaram vazias
    document.querySelectorAll(`#${gridId} .column-card`).forEach(card => {
        let visiveis = card.querySelectorAll('.button-list button[style="display: px;"], .button-list button:not([style*="display: none"])');
        card.style.display = visiveis.length > 0 ? "" : "none";
    });
}

// Modal
function openModal(title, content) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerHTML = content;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() { document.getElementById('modal').style.display = 'none'; }

// Inicialização de Agenda (Simplificado para o código completo)
function iniciarSeletores() {
    const mesSel = document.getElementById('selectMes');
    const anoSel = document.getElementById('selectAno');
    if (!mesSel) return;
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const d = new Date();
    meses.forEach((m, i) => mesSel.add(new Option(m, i)));
    for (let a = d.getFullYear(); a <= d.getFullYear() + 1; a++) anoSel.add(new Option(a, a));
    mesSel.value = d.getMonth();
}

window.onload = () => {
    iniciarSeletores();
};
