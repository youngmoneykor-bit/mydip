# Personal Portfolio Website

This repository contains a simple, responsive personal portfolio website that you can customize to showcase your projects, skills, and contact information. It was built using plain HTML, CSS, and JavaScript and can be hosted for free on GitHub Pages.

## Features

* **Responsive layout:** Works on desktops, tablets, and mobile devices.
* **Dark/light mode:** Users can toggle between light and dark themes. The preference is saved using `localStorage`.
* **Mobile navigation:** A hamburger menu appears on smaller screens for easy navigation.
* **Animated interactions:** Elements fade and slide into view as you scroll, powered by the Intersection Observer API (which lets code trigger animations when elements enter the viewport without hurting performance【668393367252197†L186-L238】), and the homepage uses ready‑made CSS animations from the Animate.css library【864181703388382†L160-L201】.
* **Sections for about, skills, projects, and contact:** The structure can easily be expanded with more content or pages.
* **Minimal external dependencies:** Only Google Fonts and Animate.css are used; you can remove or replace them if desired.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Open `index.html` in your browser to preview the site locally. Make any changes to `index.html`, `styles.css`, and `script.js` to personalize the content and design.

3. When you're ready to go live, commit your changes and push them to GitHub. Then enable GitHub Pages:

   * Navigate to your repository on GitHub.
   * Go to **Settings** → **Pages**.
   * Under **Build and deployment**, choose the branch (e.g., `main`) and the root folder as the source.
   * Click **Save**. GitHub will generate a live URL in the form `https://yourusername.github.io/your-repo-name/`.

These instructions follow GitHub's recommended workflow for hosting static sites. GitHub Pages is free for public repositories and is widely used for portfolios and resumes【254823942196073†L26-L40】. For further customization (e.g., adding pages or blog posts), you can integrate Jekyll themes and templates; see GitHub's documentation on [adding and customizing a theme](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll), which shows how to override the CSS by creating an `/assets/css/style.scss` file to import the default theme and add custom styles【222214068537254†L181-L205】.

## Customization Tips

- **Content:** Replace placeholder text (`Your Name`, `your.email@example.com`, etc.) with your own information. Add or remove sections as needed.
- **Projects:** Each project card contains a placeholder image and description. Update the `src` and text or add more cards.
- **Color scheme:** Modify the CSS variables in `styles.css` (`--color-primary`, `--color-secondary`, etc.) to align with your branding.
- **Dark mode:** The dark mode is toggled by adding the `dark-mode` class to the `<body>` element. The script handles toggling based on user interaction and persists the choice across sessions.
- **Jekyll integration:** If you want to convert this into a Jekyll site, create a `_config.yml` file and choose a theme. GitHub Docs explain how to add new pages and posts with YAML front matter and store content in `_posts` for a blog【15972743430993†L87-L109】.

## License

Feel free to use this template as a starting point for your own portfolio. Attribution is appreciated but not required.