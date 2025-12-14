(async function renderGithubActivity(){
  const el = document.getElementById("ghActivity");
  if (!el) return;

  const inSubPage = location.pathname.includes("/projects/") || location.pathname.includes("/blog/");
  const jsonPath = inSubPage ? "../assets/data/github.json" : "./assets/data/github.json";

  try {
    const r = await fetch(jsonPath, { cache: "no-store" });
    const events = await r.json();

    el.innerHTML = events.slice(0, 8).map(e => {
      const repo = e.repo?.name ?? "";
      const type = e.type ?? "Event";
      const when = e.created_at ? new Date(e.created_at).toLocaleString() : "";
      return `<li class="gh-activity-item">
        <div><strong>${type}</strong> · ${repo}</div>
        <div class="gh-activity-meta">${when}</div>
      </li>`;
    }).join("");
  } catch {
    el.innerHTML = `<li class="gh-activity-item">활동을 불러오지 못했습니다.</li>`;
  }
})();
