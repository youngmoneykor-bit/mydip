/*
 * Main JavaScript for interactive features on the portfolio website.
 *
 * Features:
 * - Mobile navigation toggle
 * - Light/dark mode toggle with localStorage persistence
 * - Dynamic year in footer
 */

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
    // Toggle the hamburger animation
    navToggle.classList.toggle('active');
  });

  // Dark mode toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Helper function to set the icon based on mode
  function updateThemeIcon(isDark) {
    themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
  }

  // Load theme preference from localStorage
  const storedTheme = localStorage.getItem('prefers-dark');
  if (storedTheme) {
    const prefersDark = storedTheme === 'true';
    if (prefersDark) {
      body.classList.add('dark-mode');
    }
    updateThemeIcon(prefersDark);
  } else {
    // If no preference is stored, match system preference
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (systemPrefersDark) {
      body.classList.add('dark-mode');
    }
    updateThemeIcon(systemPrefersDark);
  }

  // Toggle theme on button click
  themeToggleBtn.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('prefers-dark', isDark);
    updateThemeIcon(isDark);
  });

  // Update the year in the footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Stop observing once the element is visible
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  revealElements.forEach(el => revealObserver.observe(el));

  // Project overlay modal
  const projectOverlay = document.getElementById('project-overlay');
  const overlayTitle = document.getElementById('project-overlay-title');
  const overlayDesc = document.getElementById('project-overlay-desc');
  const overlayImage = document.getElementById('project-overlay-image');
  const overlayCloseBtn = projectOverlay?.querySelector('.project-overlay__close');
  const projectLinks = document.querySelectorAll('.project-link');

  const closeOverlay = () => {
    if (!projectOverlay) return;
    projectOverlay.classList.remove('open');
    projectOverlay.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
  };

  const openOverlay = details => {
    if (!projectOverlay || !overlayTitle || !overlayDesc || !overlayImage) return;

    overlayTitle.textContent = details.title;
    overlayDesc.textContent = details.description;
    overlayImage.src = details.imageSrc || '';
    overlayImage.alt = details.imageAlt || details.title || 'Project preview';

    projectOverlay.classList.add('open');
    projectOverlay.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
    overlayCloseBtn?.focus();
  };

  projectLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const card = link.closest('.project-card');

      if (!card) return;

      const title = card.querySelector('.project-title')?.textContent?.trim() || 'Project';
      const description = card.querySelector('.project-desc')?.textContent?.trim() || '';
      const image = card.querySelector('.project-image');
      const imageSrc = image?.getAttribute('src') || '';
      const imageAlt = image?.getAttribute('alt') || `${title} preview`;

      openOverlay({ title, description, imageSrc, imageAlt });
    });
  });

  overlayCloseBtn?.addEventListener('click', closeOverlay);

  projectOverlay?.addEventListener('click', event => {
    if (event.target === projectOverlay) {
      closeOverlay();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && projectOverlay?.classList.contains('open')) {
      closeOverlay();
    }
  });
});
