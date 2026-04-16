function showPage(p) {
    document.querySelectorAll('.page').forEach(pg => pg.classList.remove('active'));
    document.getElementById(p).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-btn'));
    const btn = document.getElementById('btn-' + p);
    if (btn) btn.classList.add('active-btn');
}

function filtrar(contexto) {
    let input = contexto === 'diagnostica' ? 'searchDiag' : 'searchInter';
    let filter = document.getElementById(input).value.toLowerCase();
    let grid = contexto === 'diagnostica' ? 'grid-diagnostica' : 'grid-intervencionista';
    let buttons = document.querySelectorAll(`#${grid} .button-list button`);

    buttons.forEach(btn => {
        let text = btn.innerText.toLowerCase();
        if (text.includes(filter)) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    });

    // Esconde colunas vazias
    document.querySelectorAll(`#${grid} .column-card`).forEach(card => {
        let btnVisiveis = Array.from(card.querySelectorAll('button')).some(b => b.style.display !== 'none');
        card.style.display = btnVisiveis ? "block" : "none";
    });
}

function openModal(title, content) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerHTML = content;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = (event) => {
    if (event.target == document.getElementById('modal')) closeModal();
}
