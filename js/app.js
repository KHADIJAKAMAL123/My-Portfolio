/**
 * Application Orchestrator & API Integration Module
 * Handles dynamic UI rendering from portfolioData, modal interactions,
 * filtering animations, and backend contact API integration.
 */
(function () {
  'use strict';

  const API_BASE_URL = '';

  // ==========================================
  // 1. Dynamic UI Renderers
  // ==========================================

  /**
   * Render About cards into container
   */
  function renderAbout() {
    const container = document.getElementById('about-cards-container');
    if (!container || !window.portfolioData?.about) return;

    const { academic, certifications, scope, objectives } = window.portfolioData.about;

    container.innerHTML = `
      <div class="glass-card h-100 reveal-card">
        <div class="d-flex align-items-center mb-3">
          <div class="icon-box me-3"><i class="fas fa-graduation-cap"></i></div>
          <div>
            <h3 class="h5 mb-0">${academic.title}</h3>
            <small class="text-muted">${academic.institution}</small>
          </div>
        </div>
        <p class="text-muted mb-2">${academic.degree}</p>
        <p class="text-muted small mb-0">${academic.details}</p>
      </div>

      <div class="glass-card h-100 reveal-card">
        <div class="d-flex align-items-center mb-3">
          <div class="icon-box me-3"><i class="fas fa-award"></i></div>
          <div>
            <h3 class="h5 mb-0">${certifications.title}</h3>
            <small class="text-muted">${certifications.institution}</small>
          </div>
        </div>
        <p class="text-muted mb-2">${certifications.name}</p>
        <p class="text-muted small mb-0">${certifications.details}</p>
      </div>

      <div class="glass-card h-100 reveal-card">
        <div class="d-flex align-items-center mb-3">
          <div class="icon-box me-3"><i class="fas fa-microchip"></i></div>
          <div>
            <h3 class="h5 mb-0">${scope.title}</h3>
            <small class="text-muted">Core Focus Areas</small>
          </div>
        </div>
        <p class="text-muted small mb-0">${scope.details}</p>
      </div>

      <div class="glass-card h-100 reveal-card">
        <div class="d-flex align-items-center mb-3">
          <div class="icon-box me-3"><i class="fas fa-bullseye"></i></div>
          <div>
            <h3 class="h5 mb-0">${objectives.title}</h3>
            <small class="text-muted">Career Vision</small>
          </div>
        </div>
        <p class="text-muted small mb-0">${objectives.details}</p>
      </div>
    `;
  }

  /**
   * Render Skills Matrix into container (Exactly 5 distinct cards layout)
   */
  function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container || !window.portfolioData?.skills) return;

    const {
      frontend = ['HTML5', 'CSS3', 'JavaScript ', 'Bootstrap 5'],
      backend = ['Node.js', 'Java', 'REST APIs', 'Python'],
      database = ['MongoDB', 'SQL Server'],
      tools = ['Git & GitHub', 'VS Code'],
      coreCompetencies = [
        'Data Structures & Algorithms',
        'Object-Oriented Programming',
        'Operating Systems & Scheduling',
        'System Design & Architecture',
        'Clean Code & Debugging'
      ]
    } = window.portfolioData.skills;

    container.innerHTML = `
      <div class="glass-card">
        <h3 class="h5 font-heading mb-3 text-gradient">
          <i class="fas fa-laptop-code me-2"></i>Frontend
        </h3>
        <div class="d-flex flex-wrap gap-2">
          ${frontend.map((item) => `<span class="skill-pill"><strong>${item}</strong></span>`).join('')}
        </div>
      </div>

      <div class="glass-card">
        <h3 class="h5 font-heading mb-3 text-gradient">
          <i class="fas fa-server me-2"></i>Backend
        </h3>
        <div class="d-flex flex-wrap gap-2">
          ${backend.map((item) => `<span class="skill-pill"><strong>${item}</strong></span>`).join('')}
        </div>
      </div>

      <div class="glass-card">
        <h3 class="h5 font-heading mb-3 text-gradient">
          <i class="fas fa-database me-2"></i>Database
        </h3>
        <div class="d-flex flex-wrap gap-2">
          ${database.map((item) => `<span class="skill-pill"><strong>${item}</strong></span>`).join('')}
        </div>
      </div>

      <div class="glass-card">
        <h3 class="h5 font-heading mb-3 text-gradient">
          <i class="fas fa-tools me-2"></i>Tools
        </h3>
        <div class="d-flex flex-wrap gap-2">
          ${tools.map((item) => `<span class="skill-pill"><strong>${item}</strong></span>`).join('')}
        </div>
      </div>

      <div class="glass-card">
        <h3 class="h5 font-heading mb-3 text-gradient">
          <i class="fas fa-microchip me-2"></i>Core Competencies
        </h3>
        <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
          ${coreCompetencies.map((c) => `
            <li class="d-flex align-items-center gap-2 text-muted small">
              <i class="fas fa-check-circle text-cyan"></i> ${c}
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  /**
   * Render Projects with Fade Transition using high-quality online images
   * @param {string} filter - Category filter ('all' | 'fullstack' | 'systems' | 'web')
   */
  function renderProjects(filter = 'all') {
    const grid = document.getElementById('projects-grid');
    if (!grid || !window.portfolioData?.projects) return;

    // Assign high-quality online image URLs (Unsplash) to projects if missing or update them
    const projectsWithImages = window.portfolioData.projects.map((p, index) => {
      const defaultImages = [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80', // nutrisync
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', // os algo 
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80', // gleam atelier
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'  // roomstyler 
      ];
      return {
        ...p,
        image: p.image || defaultImages[index % defaultImages.length]
      };
    });

    grid.style.opacity = '0';
    grid.style.transition = 'opacity 0.25s ease';

    setTimeout(() => {
      const filtered = filter === 'all'
        ? projectsWithImages
        : projectsWithImages.filter((p) => p.category === filter);

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="text-center w-100 py-5">
            <p class="text-muted">No projects found for this category.</p>
          </div>
        `;
      } else {
        grid.innerHTML = filtered.map((p) => `
          <div class="glass-card project-card project-item" data-id="${p.id}">
            <div class="project-card-image mb-3 overflow-hidden rounded-3" style="max-height: 180px;">
              <img src="${p.image}" alt="${p.title}" loading="lazy" class="w-100 h-100 object-fit-cover" style="transition: transform 0.4s ease;" />
            </div>
            <h3 class="h5 font-heading mb-2">${p.title}</h3>
            <p class="text-muted small mb-3">${p.description}</p>
            <div class="d-flex flex-wrap gap-1 mb-3">
              ${p.tags.map((t) => `<span class="skill-pill py-1 px-2 opacity-75">${t}</span>`).join('')}
            </div>
            <div class="project-card-actions d-flex gap-2">
              ${p.liveUrl ? `
                <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-live btn-sm magnetic-target">
                  <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
              ` : ''}
              ${p.githubUrl ? `
                <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-github btn-sm magnetic-target">
                  <i class="fab fa-github"></i> Repository
                </a>
              ` : ''}
              <button class="btn btn-glass btn-sm view-details-btn magnetic-target" data-id="${p.id}">
                Details
              </button>
            </div>
          </div>
        `).join('');
      }

      grid.style.opacity = '1';

      if (typeof window.reinitMotionEngine === 'function') {
        window.reinitMotionEngine();
      }
      setupModalListeners();
    }, 250);
  }

  /**
   * Bind Project Filter Buttons
   */
  function setupProjectFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        buttons.forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const filter = e.currentTarget.getAttribute('data-filter') || 'all';
        renderProjects(filter);
      });
    });
  }

  /**
   * Modal Details Binding
   */
  function setupModalListeners() {
    const detailBtns = document.querySelectorAll('.view-details-btn');
    const modalTitle = document.getElementById('project-modal-title');
    const modalBody = document.getElementById('project-modal-body');
    const modalEl = document.getElementById('project-modal');

    if (!modalEl || !modalTitle || !modalBody) return;

    detailBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const project = window.portfolioData.projects.find((p) => p.id === id);

        if (project) {
          modalTitle.textContent = project.title;
          modalBody.innerHTML = `
            <div class="project-modal-preview mb-3 overflow-hidden rounded-3" style="max-height: 220px;">
              <img src="${project.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop'}" alt="${project.title}" class="w-100 h-100 object-fit-cover" />
            </div>
            <p class="text-muted mb-3">${project.description}</p>
            <div class="mb-3">
              <strong class="d-block mb-2 text-gradient">Tech Stack & Tools:</strong>
              <div class="d-flex flex-wrap gap-1">
                ${project.tags.map((t) => `<span class="skill-pill">${t}</span>`).join('')}
              </div>
            </div>
            <div class="d-flex gap-2 pt-2">
              ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="btn btn-glow btn-sm">Visit Application</a>` : ''}
              ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-glass btn-sm">GitHub Source</a>` : ''}
            </div>
          `;

          const bsModal = new bootstrap.Modal(modalEl);
          bsModal.show();
        }
      });
    });
  }

  // ==========================================
  // 2. Contact Form & Express Backend API Integration
  // ==========================================

  function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusBox = document.getElementById('contact-status');
    const submitBtn = document.getElementById('contact-submit-btn');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const subject = document.getElementById('contact-subject')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !subject || !message) {
        showStatus(statusBox, 'Please complete all form fields before submitting.', 'error');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>Transmitting...`;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, subject, message }),
        });

        const data = await response.json();

        if (response.ok && data.status === 'success') {
          showStatus(statusBox, data.message || 'Message transmitted successfully!', 'success');
          form.reset();
        } else {
          const errorMsg = data.errors ? data.errors.join(' ') : (data.message || 'Failed to send message.');
          showStatus(statusBox, errorMsg, 'error');
        }
      } catch (err) {
        console.error('💥 API Transmission Error:', err);
        showStatus(statusBox, 'Unable to connect to backend server. Please verify Express API status.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Send Message</span><i class="fas fa-paper-plane ms-2"></i>`;
        }
      }
    });
  }

  function showStatus(container, message, type) {
    if (!container) return;

    container.style.display = 'block';
    container.className = type === 'success' ? 'status-banner status-success' : 'status-banner status-error';

    if (type === 'success') {
      container.style.background = 'rgba(123, 208, 244, 0.15)';
      container.style.border = '1px solid var(--accent-gold)';
      container.style.color = '#FFFFFF';
      container.innerHTML = `<i class="fas fa-check-circle text-cyan me-2"></i>${message}`;
    } else {
      container.style.background = 'rgba(122, 28, 62, 0.35)';
      container.style.border = '1px solid #FF4D4D';
      container.style.color = '#FF8080';
      container.innerHTML = `<i class="fas fa-exclamation-triangle me-2"></i>${message}`;
    }
  }

  // ==========================================
  // 3. Application Initialization
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    renderAbout();
    renderSkills();
    renderProjects('all');
    setupProjectFilters();
    initContactForm();
  });
})();