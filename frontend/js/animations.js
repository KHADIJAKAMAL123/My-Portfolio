/**
 * ==========================================================================
 * INTERACTIVE MOTION & INTERACTION ENGINE
 * Features: Dual-Cursor Lerp, Magnetic Element Pull, 
 *           IntersectionObserver Staggered Scroll Reveal, Theme Switcher
 * ==========================================================================
 */

// Immediate execution script block to prevent flash of unstyled/wrong theme content on page load
(function() {
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
   * 1. Dual-Cursor Engine with Lerp Smoothing
   * ------------------------------------------------------------------------ */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  let mouse = { x: -100, y: -100 };
  let ring = { x: -100, y: -100 };
  const LERP_FACTOR = 0.12; // Smoothness interpolation coefficient

  // Capture real-time mouse position
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Instant update for precision center dot
    if (cursorDot) {
      cursorDot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
    }
  });

  // RAF loop for smooth trailing motion on outer ring
  function renderCursor() {
    ring.x += (mouse.x - ring.x) * LERP_FACTOR;
    ring.y += (mouse.y - ring.y) * LERP_FACTOR;

    if (cursorRing) {
      cursorRing.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
    }

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Dynamic cursor states on click
  window.addEventListener('mousedown', () => document.body.classList.add('cursor-active'));
  window.addEventListener('mouseup', () => document.body.classList.remove('cursor-active'));

  /* ------------------------------------------------------------------------
   * 2. Interactive Target Class Toggling & Magnetic Attraction Logic
   * ------------------------------------------------------------------------ */
  const magneticSelectors = '.magnetic-target, .btn-glow, .btn-glass, .btn-live, .btn-github, .glass-card, .project-card, .nav-link, button';

  function attachCursorInteractions() {
    const targets = document.querySelectorAll(magneticSelectors);

    targets.forEach((target) => {
      // Prevent duplicate event binding
      if (target.dataset.cursorBound === 'true') return;
      target.dataset.cursorBound = 'true';

      // Hover aura triggers
      target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      target.addEventListener('mouseleave', (e) => {
        document.body.classList.remove('cursor-hover');
        // Reset magnetic transformation with smooth spring transition
        target.style.transform = '';
        target.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });

      // Magnetic vector calculation on mouse move inside element
      target.addEventListener('mousemove', (e) => {
        // Skip magnetic vector displacement for large structural glass containers
        if (target.classList.contains('glass-card') || target.classList.contains('project-card')) return;

        target.style.transition = 'none'; // Instant response on hover move
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Pull element 28% toward the cursor
        const pullFactor = 0.28;
        target.style.transform = `translate3d(${deltaX * pullFactor}px, ${deltaY * pullFactor}px, 0)`;
      });
    });
  }

  attachCursorInteractions();

  /* ------------------------------------------------------------------------
   * 3. IntersectionObserver Staggered Scroll Reveal
   * ------------------------------------------------------------------------ */
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-zoom, .reveal-card');

    const observerOptions = {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          
          // Calculate stagger delay based on DOM child index if inside grid
          const parent = el.parentElement;
          let delay = 0;
          if (parent) {
            const siblings = Array.from(parent.children).filter(child => 
              child.classList.contains('reveal-card') || child.classList.contains('reveal-zoom')
            );
            const index = siblings.indexOf(el);
            if (index >= 0) {
              delay = index * 80; // 80ms progressive stagger delay
            }
          }

          setTimeout(() => {
            el.classList.add('reveal-active');
          }, delay);

          // Unobserve once element is revealed
          observer.unobserve(el);
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  initScrollReveals();

  /* ------------------------------------------------------------------------
   * 4. Theme Switcher Engine (Dark/Light Mode)
   * ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle');

  if (themeToggleBtn) {
    // Sync UI icon state with already applied theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateThemeIcon(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  /* Expose re-initialization helper for dynamic JS content rendering */
  window.reinitMotionEngine = () => {
    attachCursorInteractions();
    initScrollReveals();
  };
});