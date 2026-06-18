/* ═══════════════════════════════════════════════
   THE GIANT REACH — Shared Utilities v2
   Opeyemi Akinremi · thegiantreach.com
═══════════════════════════════════════════════ */

// ── BLOG STORAGE ──
const BLOG_KEY = 'tgr_blog_posts';

function getPosts() {
  try { return JSON.parse(localStorage.getItem(BLOG_KEY) || '[]'); }
  catch(e) { return []; }
}
function savePosts(posts) {
  localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
}
function getPost(slug) {
  return getPosts().find(p => p.slug === slug) || null;
}

// ── MOBILE MENU ──
function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // close on any internal link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      menu.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ── SCROLL REVEAL ──
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target); // fire once
      }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px 0px 0px' }); // FIX: was threshold:0.07, rootMargin:'0px 0px -40px 0px'

  // FIX: Immediately reveal elements already in viewport on load
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      obs.observe(el);
    }
  });
}

// ── NAV SCROLL SHADOW ──
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 24px rgba(0,0,0,0.25)'
      : 'none';
  }, { passive: true });
}

// ── SMOOTH ANCHOR SCROLLING ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ── ACTIVE NAV LINK ──
function initActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || href === './' + path) a.classList.add('active');
  });
}

// ── STAGGERED REVEAL CHILDREN ──
function initStaggeredReveal() {
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const children = parent.children;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
      child.classList.add('reveal');
    });
  });
}

// ── INIT ALL ──
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initNavScroll();
  initSmoothScroll();
  initStaggeredReveal();
});

