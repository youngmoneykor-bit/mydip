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

  (async function renderGithubActivity(){
  const el = document.getElementById("ghActivity");
  if (!el) return;

  // index.html(루트) vs /projects/*, /blog/* 경로 차이 자동 처리
  const inSubPage = location.pathname.includes("/projects/") || location.pathname.includes("/blog/");
  const jsonPath = inSubPage ? "../assets/data/github.json" : "./assets/data/github.json";

  try {
    const r = await fetch(jsonPath, { cache: "no-store" });
    const events = await r.json();

    el.innerHTML = events.slice(0, 8).map(e => {
      const repo = e.repo?.name ?? "";
      const type = e.type ?? "Event";
      const when = e.created_at ? new Date(e.created_at).toLocaleString() : "";
      return `<li class="post-item">
        <div><strong>${type}</strong> · ${repo}</div>
        <div class="meta">${when}</div>
      </li>`;
    }).join("");
  } catch (err) {
    el.innerHTML = `<li class="post-item">활동을 불러오지 못했습니다.</li>`;
  }
})();

});
