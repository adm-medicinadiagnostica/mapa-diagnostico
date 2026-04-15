function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active-btn'));
    
    const activeBtn = document.getElementById('btn-' + pageId);
    if (activeBtn) activeBtn.classList.add('active-btn');

    document.querySelector('.main-content').scrollTo(0, 0);
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
