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

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) closeModal();
}

// Lógica de Agenda das 06h às 23h
function gerarGrade() {
    const slot = parseInt(document.getElementById('slotTempo').value) || 20;
    const container = document.getElementById('gradeSemanal');
    
    let html = `<table class="grade-table"><thead><tr><th>Horário</th><th>Seg</th><th>Ter</th><th>Qua</th><th>Qui</th><th>Sex</th></tr></thead><tbody>`;
    
    let inicio = 360; // 06:00
    let fim = 1380;   // 23:00

    for (let min = inicio; min < fim; min += slot) {
        let h = Math.floor(min / 60).toString().padStart(2, '0');
        let m = (min % 60).toString().padStart(2, '0');
        let horaFormatada = `${h}:${m}`;
        
        html += `<tr><td><strong>${horaFormatada}</strong></td>`;
        for (let dia = 1; dia <= 5; dia++) {
            html += `<td>
                <select class="select-status" onchange="this.className='select-status status-' + this.value">
                    <option value="eletivo">Eletivo</option>
                    <option value="respiro">Respiro</option>
                    <option value="bloqueio">Bloqueio</option>
                    <option value="especifico">Específico</option>
                </select>
            </td>`;
        }
        html += `</tr>`;
    }
    html += `</tbody></table>`;
    container.innerHTML = html;
}

function calcularProdutividade() {
    const selects = document.querySelectorAll('.select-status');
    let exames = 0, respiros = 0;

    selects.forEach(s => {
        if (s.value === 'eletivo' || s.value === 'especifico') exames++;
        if (s.value === 'respiro' || s.value === 'bloqueio') respiros++;
    });

    document.getElementById('kpiExames').innerText = exames;
    document.getElementById('kpiRespiros').innerText = respiros;

    const display = document.getElementById('visualizacaoFinal');
    display.innerHTML = `<div class="card-icon" style="font-size:0.9rem; margin-top:20px; width:100%; border-radius:10px; padding:15px; background:#f0fdf4; color:#166534; border:1px solid #bbf7d0;">
        <i class="fas fa-check-circle"></i> Ocupação calculada: <strong>${((exames/selects.length)*100).toFixed(1)}%</strong>
    </div>`;
}

// Iniciar com a grade montada
window.onload = function() {
    gerarGrade();
};
