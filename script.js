let currentAg = 'ag1';
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function showPage(p) {
    document.querySelectorAll('.page').forEach(pg => pg.classList.remove('active'));
    document.getElementById(p).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-btn'));
    const b = document.getElementById('btn-' + p);
    if (b) b.classList.add('active-btn');
    if (p === 'agendas') carregar();
}

function iniciarDatas() {
    const m = document.getElementById('mesSel');
    const a = document.getElementById('anoSel');
    if (!m) return;
    const d = new Date();
    months.forEach((name, i) => m.add(new Option(name, i)));
    for (let i = d.getFullYear(); i <= d.getFullYear() + 1; i++) a.add(new Option(i, i));
    m.value = d.getMonth();
}

function selecionarAgenda(id, btn) {
    currentAg = id;
    document.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    carregar();
}

function gerar() {
    const container = document.getElementById('gradeRender');
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    let html = `<table class="grade-table"><thead><tr><th>Hora</th>`;
    dias.forEach(d => html += `<th>${d}</th>`);
    html += `</tr></thead><tbody>`;

    for (let min = 360; min < 1380; min += 20) {
        let h = Math.floor(min / 60).toString().padStart(2, '0');
        let m = (min % 60).toString().padStart(2, '0');
        html += `<tr><td style="background:#f8fafc; font-weight:700;">${h}:${m}</td>`;
        for (let d = 0; d < 7; d++) {
            const id = `s-${min}-${d}`;
            html += `<td><select class="s-input" id="${id}" onchange="calc()"><option value="ex">Eletivo</option><option value="ma">Manut.</option></select></td>`;
        }
        html += `</tr>`;
    }
    container.innerHTML = html + `</tbody></table>`;
    calc();
}

function calc() {
    const sels = document.querySelectorAll('.s-input');
    let ex = 0, ma = 0;
    sels.forEach(s => {
        if(s.value === 'ex') ex++; else ma++;
        s.style.backgroundColor = s.value === 'ma' ? '#fee2e2' : '#dcfce7';
    });
    const diasMes = new Date(document.getElementById('anoSel').value, parseInt(document.getElementById('mesSel').value)+1, 0).getDate();
    const fator = diasMes / 7;
    document.getElementById('kpiEx').innerText = Math.round(ex * fator);
    document.getElementById('kpiMa').innerText = Math.round(ma * fator);
}

function carregar() {
    gerar();
    const key = `vc58_${currentAg}_${document.getElementById('mesSel').value}_${document.getElementById('anoSel').value}`;
    const salvo = localStorage.getItem(key);
    if(salvo) {
        const d = JSON.parse(salvo);
        d.forEach(item => {
            const s = document.getElementById(item.id);
            if(s) s.value = item.st;
        });
    }
    calc();
}

function salvar() {
    const key = `vc58_${currentAg}_${document.getElementById('mesSel').value}_${document.getElementById('anoSel').value}`;
    const dados = [];
    document.querySelectorAll('.s-input').forEach(s => dados.push({ id: s.id, st: s.value }));
    localStorage.setItem(key, JSON.stringify(dados));
    alert("Parametrização Salva!");
}

function openModal(t, txt) {
    document.getElementById('modal-title').innerText = t;
    document.getElementById('modal-text').innerHTML = txt;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() { document.getElementById('modal').style.display = 'none'; }

window.onload = () => iniciarDatas();
