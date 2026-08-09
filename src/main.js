const AI_SYSTEMS = [
  {name:'GPT',provider:'OpenAI',description:'Reasoning, writing, coding, analysis and multimodal work.',url:'https://chatgpt.com/'},
  {name:'Claude',provider:'Anthropic',description:'Deep analysis, long documents, writing and coding.',url:'https://claude.ai/'},
  {name:'Gemini',provider:'Google',description:'Research, multimodal reasoning and productivity.',url:'https://gemini.google.com/'},
  {name:'Perplexity',provider:'Perplexity',description:'Web research and source-backed answers.',url:'https://www.perplexity.ai/'},
  {name:'Grok',provider:'xAI',description:'Conversation, reasoning and current information.',url:'https://grok.com/'}
];

const CATEGORIES = [
  ['RESEARCH','Find, investigate and understand information.','↗'],
  ['CREATE','Writing, images, video, audio and design.','✦'],
  ['BUILD','Coding, software and technical work.','</>'],
  ['ANALYSE','Documents, data and complex problems.','◌']
];

const NAV_GROUPS = [
  ['DISCOVER',['Dashboard','AI Directory','Categories']],
  ['INTELLIGENCE',['Compare','AI Router','Intelligence Feed']],
  ['MY ORÍKÌ',['My AI','Saved']],
  ['SYSTEM',['Settings']]
];

function escapeHtml(value){
  return String(value).replace(/[&<>'"]/g,function(char){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char];});
}

function renderApp(){
  const root=document.getElementById('root');
  if(!root)return;

  const navIcons=['⌂','◈','◫','⇄','⌁','◉','☆','▱','⚙'];
  let navIndex=0;
  const navHtml=NAV_GROUPS.map(function(group){
    const label=group[0];
    const items=group[1];
    const itemsHtml=items.map(function(item){
      const icon=navIcons[navIndex++]||'•';
      const active=item==='Dashboard';
      return '<button class="nav-item'+(active?' active':'')+'" data-nav="'+escapeHtml(item)+'"><span class="nav-icon">'+icon+'</span><span>'+escapeHtml(item)+'</span>'+(active?'<span class="active-dot"></span>':'')+'</button>';
    }).join('');
    return '<div class="nav-group"><div class="nav-label">'+label+'</div>'+itemsHtml+'</div>';
  }).join('');

  const cardsHtml=AI_SYSTEMS.map(function(ai,index){
    return '<article class="ai-card">'+
      '<div class="card-top"><div class="ai-emblem">'+escapeHtml(ai.name.charAt(0))+'</div><span class="card-number">'+String(index+1).padStart(2,'0')+'</span></div>'+
      '<h3>'+escapeHtml(ai.name)+'</h3><div class="provider">'+escapeHtml(ai.provider)+'</div>'+
      '<p>'+escapeHtml(ai.description)+'</p>'+
      '<div class="card-footer"><div class="capability"><span></span><span></span><span></span></div><a class="arrow-button" href="'+escapeHtml(ai.url)+'" target="_blank" rel="noopener noreferrer" aria-label="Open '+escapeHtml(ai.name)+'">↗</a></div>'+
      '</article>';
  }).join('');

  const categoriesHtml=CATEGORIES.map(function(category){
    return '<button class="category-card" data-category="'+escapeHtml(category[0])+'"><span class="category-glyph">'+category[2]+'</span><span><strong>'+category[0]+'</strong><small>'+escapeHtml(category[1])+'</small></span><span class="category-arrow">→</span></button>';
  }).join('');

  root.innerHTML='<div class="app-shell">'+
    '<aside class="sidebar">'+
      '<div class="brand"><div class="brand-mark">O</div><div><div class="brand-name">ORÍKÌ</div><div class="brand-type">AI</div></div></div>'+ 
      '<div class="tagline">Know your intelligence.</div>'+navHtml+
      '<div class="sidebar-foot"><span class="status-dot"></span>ORÍKÌ online<span class="version">v1.0</span></div>'+ 
    '</aside>'+ 
    '<main class="main">'+
      '<header class="topbar"><button class="mobile-menu" id="menu">☰</button><div class="breadcrumb"><b>ORÍKÌ</b><span>/</span>Dashboard</div><div class="top-actions"><button class="icon-button" id="searchTop">⌕</button><button class="icon-button">◌</button><div class="avatar">BS</div></div></header>'+
      '<section class="hero">'+
        '<div class="eyebrow">AI INTELLIGENCE PLATFORM</div>'+ 
        '<h1>What intelligence<br><em>do you need?</em></h1>'+ 
        '<p class="hero-copy">Discover, compare and choose the right AI for the work in front of you.</p>'+ 
        '<div class="search-box"><span class="search-symbol">⌕</span><input id="task" placeholder="What do you want to accomplish?" autocomplete="off"><button id="find">Find intelligence<span>→</span></button></div>'+ 
        '<div class="search-hints"><span>Try:</span><button data-fill="Research a market">research a market</button><button data-fill="Build a web application">build an application</button><button data-fill="Create a brand identity">create a brand</button></div>'+ 
      '</section>'+ 
      '<section class="section"><div class="section-head"><div><div class="section-kicker">FEATURED</div><h2>Explore intelligence</h2></div><button class="text-button" id="viewAll">View all <span>→</span></button></div><div class="ai-grid">'+cardsHtml+'</div></section>'+ 
      '<section class="section"><div class="section-head"><div><div class="section-kicker">DISCOVER BY PURPOSE</div><h2>What are you working on?</h2></div></div><div class="category-grid">'+categoriesHtml+'</div></section>'+ 
      '<footer><span>ORÍKÌ AI</span><span>Know your intelligence.</span><span>Stage 1 · Foundation</span></footer>'+ 
    '</main>'+ 
    '</div><div class="toast" id="toast" role="status" aria-live="polite"></div>';

  bindInteractions();
}

function showToast(message){
  const toast=document.getElementById('toast');
  if(!toast)return;
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(window.__orikiToast);
  window.__orikiToast=setTimeout(function(){toast.classList.remove('show');},2400);
}

function bindInteractions(){
  document.querySelectorAll('[data-nav]').forEach(function(button){
    button.addEventListener('click',function(){
      if(button.dataset.nav!=='Dashboard')showToast(button.dataset.nav+' will be added in a later stage.');
    });
  });

  document.querySelectorAll('[data-fill]').forEach(function(button){
    button.addEventListener('click',function(){
      const input=document.getElementById('task');
      input.value=button.dataset.fill;
      input.focus();
    });
  });

  const find=document.getElementById('find');
  if(find)find.addEventListener('click',function(){
    const input=document.getElementById('task');
    showToast(input&&input.value.trim()?'ORÍKÌ will route this task in a future stage.':'Tell ORÍKÌ what you want to accomplish.');
  });

  const viewAll=document.getElementById('viewAll');
  if(viewAll)viewAll.addEventListener('click',function(){showToast('The full AI directory will arrive in Stage 2.');});

  const searchTop=document.getElementById('searchTop');
  if(searchTop)searchTop.addEventListener('click',function(){
    const input=document.getElementById('task');
    if(input){input.focus();window.scrollTo({top:0,behavior:'smooth'});}
  });

  document.querySelectorAll('[data-category]').forEach(function(button){
    button.addEventListener('click',function(){showToast(button.dataset.category+' intelligence tools will be added in a later stage.');});
  });
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',renderApp);else renderApp();
