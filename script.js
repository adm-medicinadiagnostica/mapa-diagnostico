function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active-btn'));
    const activeBtn = document.getElementById('btn-' + pageId);
    if (activeBtn) activeBtn.classList.add('active-btn');
    document.querySelector('.main-content').scrollTo({ top: 0, behavior: 'smooth' });
}

function openModal(title, text) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerHTML = text;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() { document.getElementById('modal').style.display = 'none'; }

window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) closeModal();
}

// LÓGICA DE GRADE
function gerarGrade() {
    const slot = parseInt(document.getElementById('slotTempo').value) || 20;
    const container = document.getElementById('gradeSemanal');
    let html = `<table class="grade-table"><thead><tr><th>Hora</th><th>Seg</th><th>Ter</th><th>Qua</th><th>Qui</th><th>Sex</th></tr></thead><tbody>`;
    
    for (let min = 360; min < 1380; min += slot) {
        let h = Math.floor(min / 60).toString().padStart(2, '0');
        let m = (min % 60).toString().padStart(2, '0');
        html += `<tr><td><strong>${h}:${m}</strong></td>`;
        for (let dia = 1; dia <= 5; dia++) {
            const idU = `slot-${min}-${dia}`;
            html += `<td>
                <select id="${idU}-sel" class="select-status" onchange="tratarSelecao(this)">
                    <option value="eletivo">Eletivo</option>
                    <option value="respiro">Respiro</option>
                    <option value="bloqueio">Bloqueio</option>
                    <option value="especifico">Específico</option>
                </select>
                <input id="${idU}-input" type="text" class="input-especifico" placeholder="...">
            </td>`;
        }
        html += `</tr>`;
    }
    container.innerHTML = html + `</tbody></table>`;
}

function tratarSelecao(sel) {
    const input = document.getElementById(sel.id.replace('-sel', '-input'));
    sel.className = 'select-status status-' + sel.value;
    input.style.display = (sel.value === 'especifico') ? 'block' : 'none';
    if (sel.value !== 'especifico') input.value = '';
    calcularProdutividade();
}

function salvarAgenda() {
    const key = document.getElementById('agendaSelect').value;
    const selects = document.querySelectorAll('.select-status');
    const inputs = document.querySelectorAll('.input-especifico');
    const dados = {
        titulo: document.getElementById('renameAgenda').value,
        periodo: document.getElementById('agendaPeriodo').value,
        slot: document.getElementById('slotTempo').value,
        mapa: []
    };

    selects.forEach((sel, i) => {
        dados.mapa.push({ id: sel.id, st: sel.value, txt: inputs[i].value });
    });

    localStorage.setItem('vCruz_' + key, JSON.stringify(dados));
    document.getElementById('display-titulo').innerText = dados.titulo;
    document.getElementById('display-periodo').innerText = dados.periodo ? "Período: " + dados.periodo : "";
    alert("Gravado com sucesso!");
}

function carregarAgendaSalva() {
    const key = document.getElementById('agendaSelect').value;
    const salvo = localStorage.getItem('vCruz_' + key);
    
    if (salvo) {
        const d = JSON.parse(salvo);
        document.getElementById('renameAgenda').value = d.titulo || "";
        document.getElementById('agendaPeriodo').value = d.periodo || "";
        document.getElementById('slotTempo').value = d.slot;
        document.getElementById('display-titulo').innerText = d.titulo || "";
        document.getElementById('display-periodo').innerText = d.periodo ? "Período: " + d.periodo : "";
        
        gerarGrade();

        d.mapa.forEach(item => {
            const sel = document.getElementById(item.id);
            const inp = document.getElementById(item.id.replace('-sel', '-input'));
            if (sel) {
                sel.value = item.st;
                sel.className = 'select-status status-' + item.st;
                if (item.st === 'especifico') { inp.style.display = 'block'; inp.value = item.txt; }
            }
        });
    } else {
        document.getElementById('renameAgenda').value = "";
        document.getElementById('agendaPeriodo').value = "";
        document.getElementById('display-titulo').innerText = "";
        document.getElementById('display-periodo').innerText = "";
        gerarGrade();
    }
    calcularProdutividade();
}

function exportarImagem() {
    const area = document.getElementById('capture-area');
    const nome = document.getElementById('renameAgenda').value || 'agenda';
    html2canvas(area).then(canvas => {
        const link = document.createElement('a');
        link.download = `${nome}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
}

function calcularProdutividade() {
    const selects = document.querySelectorAll('.select-status');
    let ex = 0, pe = 0;
    selects.forEach(s => {
        if (s.value === 'eletivo' || s.value === 'especifico') ex++;
        else pe++;
    });
    document.getElementById('kpiExames').innerText = ex;
    document.getElementById('kpiRespiros').innerText = pe;
}

window.onload = () => { carregarAgendaSalva(); };
