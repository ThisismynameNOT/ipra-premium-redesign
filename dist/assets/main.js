import { capabilities, projects, translations } from './data.js';
import { filterProjects, localize, validateEnquiry } from './lib.js';
const qs = (s, r = document) => r.querySelector(s);
const qsa = (s, r = document) => [...r.querySelectorAll(s)];
let locale = 'cs';
try {
    const saved = localStorage.getItem('ipraLocale');
    if (saved === 'cs' || saved === 'en')
        locale = saved;
}
catch {
    locale = 'cs';
}
function translatePage() {
    const t = translations[locale];
    document.documentElement.lang = locale;
    qsa('[data-i18n]').forEach(node => {
        const key = node.dataset.i18n;
        if (key && t[key])
            node.textContent = t[key];
    });
    const toggle = qs('#languageToggle');
    if (toggle) {
        toggle.textContent = locale === 'cs' ? 'EN' : 'CZ';
        toggle.setAttribute('aria-label', locale === 'cs' ? 'Switch to English' : 'Přepnout do češtiny');
    }
    renderCapabilities();
    renderProjects();
}
function renderCapabilities() {
    const grid = qs('#capabilityGrid');
    if (!grid)
        return;
    grid.innerHTML = capabilities.map(item => `<button class="capability-card" type="button" data-system="${item.id}"><span>${item.code}</span><h3>${localize(item.title, locale)}</h3><p>${localize(item.summary, locale)}</p><i>↗</i></button>`).join('');
}
function renderProjects(category = 'all') {
    const grid = qs('#projectGrid');
    if (!grid)
        return;
    grid.innerHTML = filterProjects(projects, category).map((p, i) => `<button class="project-card ${i === 0 ? 'project-card--wide' : ''}" type="button" data-project="${p.id}"><img src="${p.image}" alt="${localize(p.title, locale)}" loading="lazy"><div><span>${p.year} / ${localize(p.location, locale)}</span><h3>${localize(p.title, locale)}</h3><p>${localize(p.scope, locale)}</p></div></button>`).join('');
}
function openSystem(id) {
    const item = capabilities.find(x => x.id === id);
    const dialog = qs('#systemDialog');
    const content = dialog && qs('[data-system-content]', dialog);
    if (!item || !dialog || !content)
        return;
    content.innerHTML = `<span class="tech-code">${item.code}</span><p class="eyebrow">${locale === 'cs' ? 'První technický směr' : 'First technical direction'}</p><h2>${localize(item.title, locale)}</h2><p>${localize(item.summary, locale)}</p><div class="diagnostic"><small>${locale === 'cs' ? 'Klíčová otázka' : 'Key question'}</small><strong>${localize(item.question, locale)}</strong></div><button class="button button--cyan" type="button" data-open-enquiry>${translations[locale].primaryCta}</button>`;
    dialog.showModal();
}
function openProject(id) {
    const p = projects.find(x => x.id === id);
    const dialog = qs('#projectDialog');
    const content = dialog && qs('[data-project-content]', dialog);
    if (!p || !dialog || !content)
        return;
    content.innerHTML = `<div class="project-dialog-media"><img src="${p.image}" alt="${localize(p.title, locale)}"></div><div class="project-dialog-copy"><p class="eyebrow">${p.year} · ${localize(p.location, locale)}</p><h2>${localize(p.title, locale)}</h2><dl><div><dt>${locale === 'cs' ? 'Generální dodavatel' : 'General contractor'}</dt><dd>${p.contractor}</dd></div><div><dt>${locale === 'cs' ? 'Rozsah prací' : 'Scope'}</dt><dd>${localize(p.scope, locale)}</dd></div></dl><p class="source-note">${locale === 'cs' ? 'Údaje jsou převzaty z veřejného portfolia IPRA. Grafika je redakční vizualizace pro demo.' : 'Data comes from IPRA’s public portfolio. The artwork is an editorial demo visualisation.'}</p><button class="button button--cyan" type="button" data-open-enquiry>${translations[locale].primaryCta}</button></div>`;
    dialog.showModal();
}
function bindNavigation() {
    const toggle = qs('#menuToggle'), nav = qs('#mobileNav');
    toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav?.toggleAttribute('hidden', !open); document.body.classList.toggle('nav-open', open); });
    nav?.addEventListener('click', e => { if (e.target.closest('a')) {
        nav.hidden = true;
        toggle?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
    } });
}
function bindForms() {
    const dialog = qs('#enquiryDialog'), form = qs('#enquiryForm');
    qsa('[data-open-enquiry]').forEach(b => b.addEventListener('click', () => dialog?.showModal()));
    form?.addEventListener('submit', e => { e.preventDefault(); const f = new FormData(form); const data = { project: String(f.get('project') || ''), phase: String(f.get('phase') || ''), solution: String(f.get('solution') || ''), location: String(f.get('location') || ''), area: Number(f.get('area')), documentation: String(f.get('documentation') || ''), date: String(f.get('date') || ''), name: String(f.get('name') || ''), email: String(f.get('email') || ''), phone: String(f.get('phone') || '') }; const errors = validateEnquiry(data, locale); qsa('[data-error]', form).forEach(n => n.textContent = ''); Object.entries(errors).forEach(([k, v]) => { const n = qs(`[data-error="${k}"]`, form); if (n)
        n.textContent = v; }); if (Object.keys(errors).length)
        return; form.innerHTML = `<div class="success-state"><span>✓</span><p class="eyebrow">${locale === 'cs' ? 'Demonstrační odeslání' : 'Demo submission'}</p><h2>${locale === 'cs' ? 'Technické zadání je připravené.' : 'Your technical brief is ready.'}</h2><p>${locale === 'cs' ? 'Tato ukázka data nikam neposílá. Produkční verze bude napojena na firemní e-mail nebo CRM.' : 'This demo does not transmit data. The production version will connect to company email or CRM.'}</p><button class="button button--navy" type="button" data-dialog-close>${locale === 'cs' ? 'Zavřít' : 'Close'}</button></div>`; });
}
function bindDialogs() { qsa('dialog').forEach(d => d.addEventListener('click', e => { const t = e.target; if (t === d || t.closest('[data-dialog-close]'))
    d.close(); })); }
function bindInteractions() {
    qs('#languageToggle')?.addEventListener('click', () => { locale = locale === 'cs' ? 'en' : 'cs'; try {
        localStorage.setItem('ipraLocale', locale);
    }
    catch { } translatePage(); });
    qs('#capabilityGrid')?.addEventListener('click', e => { const b = e.target.closest('[data-system]'); if (b)
        openSystem(b.dataset.system); });
    qs('#projectFilters')?.addEventListener('click', e => { const b = e.target.closest('[data-filter]'); if (!b)
        return; qsa('[data-filter]').forEach(x => x.classList.remove('is-active')); b.classList.add('is-active'); renderProjects(b.dataset.filter); });
    qs('#projectGrid')?.addEventListener('click', e => { const b = e.target.closest('[data-project]'); if (b)
        openProject(b.dataset.project); });
    document.addEventListener('click', e => { if (e.target.closest('[data-open-enquiry]'))
        qs('#enquiryDialog')?.showModal(); });
}
translatePage();
bindNavigation();
bindForms();
bindDialogs();
bindInteractions();
