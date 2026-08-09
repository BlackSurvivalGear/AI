import './styles.css';
import { aiSystems, aiCategories } from './data/ai.js';

const nav = [
  { group: 'Discover', items: [['dashboard', 'Dashboard'], ['directory', 'AI Directory'], ['categories', 'Categories']] },
  { group: 'Intelligence', items: [['compare', 'Compare'], ['router', 'AI Router'], ['feed', 'Intelligence Feed']] },
  { group: 'My ORÍKÌ', items: [['my-ai', 'My AI'], ['saved', 'Saved']] },
  { group: 'System', items: [['settings', 'Settings']] }
];

const categoryGlyphs = { research: '↗', create: '✦', build: '</>', analyse: '◌' };

function icon(name) {
  const icons = {
    dashboard: '<span class="nav-icon">⌂</span>', directory: '<span class="nav-icon">◈</span>', categories: '<span class="nav-icon">◫</span>',
    compare: '<span class="nav-icon">⇄</span>', router: '<span class="nav-icon">⌁</span>', feed: '<span class="nav-icon">◉</span>',
    'my-ai': '<span class="nav-icon">☆</span>', saved: '<span class="nav-icon">▱</span>', settings: '<span class="nav-icon">⚙</span>'
  };
  return icons[name] || '<span class="nav-icon">•</span>';
}

function render() {
  document.querySelector('#root').innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark" aria-hidden="true"><span>O</span></div>
          <div><div class="brand-name">ORÍKÌ</div><div class="brand-type">AI</div></div>
        </div>
        <div class="tagline">Know your intelligence.</div>
        <nav aria-label="Primary navigation">
          ${nav.map(section => `
            <div class="nav-group">
              <div class="nav-label">${section.group}</div>
              ${section.items.map(([id, label]) => `<button class="nav-item ${id === 'dashboard' ? 'active' : ''}" data-page="${id}">${icon(id)}<span>${label}</span>${id === 'dashboard' ? '<span class="active-dot"></span>' : ''}</button>`).join('')}
            </div>
          `).join('')}
        </nav>
        <div class="sidebar-foot"><span class="status-dot"></span><span>ORÍKÌ online</span><span class="version">v0.1</span></div>
      </aside>

      <main class="main">
        <header class="topbar">
          <button class="mobile-menu" aria-label="Open navigation">☰</button>
          <div class="breadcrumb">ORÍKÌ <span>/</span> Dashboard</div>
          <div class="top-actions">
            <button class="icon-button" aria-label="Search">⌕</button>
            <button class="icon-button" aria-label="Notifications">◌</button>
            <div class="avatar">BS</div>
          </div>
        </header>

        <section class="hero">
          <div class="eyebrow">AI INTELLIGENCE PLATFORM</div>
          <h1>What intelligence<br><em>do you need?</em></h1>
          <p class="hero-copy">Discover, compare and choose the right AI for the work in front of you.</p>
          <div class="search-box">
            <span class="search-symbol">⌕</span>
            <input id="task-search" placeholder="What do you want to accomplish?" autocomplete="off" />
            <button id="find-btn">Find intelligence <span>→</span></button>
          </div>
          <div class="search-hints"><span>Try:</span><button data-fill="Research the Nigerian construction market">research a market</button><button data-fill="Build a web application">build an application</button><button data-fill="Create a brand identity">create a brand</button></div>
        </section>

        <section class="section featured-section">
          <div class="section-head"><div><div class="section-kicker">FEATURED</div><h2>Explore intelligence</h2></div><button class="text-button">View all <span>→</span></button></div>
          <div class="ai-grid">
            ${aiSystems.map((ai, index) => `
              <article class="ai-card">
                <div class="card-top"><div class="ai-emblem" aria-label="${ai.name} logo">${ai.name.slice(0,1)}</div><span class="card-number">${String(index + 1).padStart(2, '0')}</span></div>
                <h3>${ai.name}</h3><div class="provider">${ai.provider}</div><p>${ai.description}</p>
                <div class="card-footer"><div class="capability">${ai.capabilities.slice(0, 3).map(() => '<span></span>').join('')}</div><a class="arrow-button" href="${ai.website}" target="_blank" rel="noreferrer" aria-label="Open ${ai.name}">↗</a></div>
              </article>
            `).join('')}
          </div>
        </section>

        <section class="section categories-section">
          <div class="section-head"><div><div class="section-kicker">DISCOVER BY PURPOSE</div><h2>What are you working on?</h2></div></div>
          <div class="category-grid">
            ${aiCategories.map(category => `<button class="category-card"><span class="category-glyph">${categoryGlyphs[category.id] || '•'}</span><span><strong>${category.name}</strong><small>${category.description}</small></span><span class="category-arrow">→</span></button>`).join('')}
          </div>
        </section>

        <footer><span>ORÍKÌ AI</span><span>Know your intelligence.</span><span>Stage 1 · Foundation</span></footer>
      </main>
    </div>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>
  `;

  document.querySelectorAll('.nav-item').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    btn.classList.add('active');
    if (btn.dataset.page !== 'dashboard') showToast(`${btn.textContent.trim()} is coming in the next stage.`);
  }));

  document.querySelectorAll('[data-fill]').forEach(btn => btn.addEventListener('click', () => {
    document.querySelector('#task-search').value = btn.dataset.fill;
    document.querySelector('#task-search').focus();
  }));

  document.querySelector('#find-btn').addEventListener('click', () => {
    const value = document.querySelector('#task-search').value.trim();
    showToast(value ? 'AI Router is being prepared for this task.' : 'Tell ORÍKÌ what you want to accomplish.');
  });
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

render();
