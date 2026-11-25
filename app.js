(() => {
  const PROJECTS = [
    {
      id: "apocalypse",
      name: "Apocalypse Tracker",
      tagline: "3D live world globe",
      url: "https://apocalypse-tracker.com",
      embed: true,
      embedParam: true,
      description: "A 3D globe of live conflicts, disasters, flights, satellites, and space weather from public feeds. Toggle layers, zoom the globe, and open the live sky view.",
      tech: "Next.js · 3D web globe · PWA · public data feeds"
    },
    {
      id: "morphtide",
      name: "Morph Tide",
      tagline: "3D evolution game",
      url: "https://evo-back-to-eden.vercel.app",
      embed: true,
      description: "A 3D browser game about growing a body from the ancient sea to the first shore, with evolve, build, and ocean play.",
      tech: "3D web game · PWA · Vercel"
    },
    {
      id: "crochet-site",
      name: "Go Crazy Crochet",
      tagline: "Yarn shop & app landing",
      url: "https://gocrazycrochet.com",
      embed: false,
      screenshot: "assets/demos/gocrazycrochet.jpg",
      description: "The public site for a beginner crochet app and yarn shop. Follow a pattern one step at a time, with stitch help, counters, and private PDF import. The beginner version is free.",
      tech: "Static front-end · Vercel"
    },
    {
      id: "crochet-app",
      name: "Go Crazy Crochet app",
      tagline: "Installable crochet PWA",
      url: "https://crochet-app-chrisgfree-5870.vercel.app",
      embed: true,
      description: "A private family crochet app for following patterns. Projects and imported PDFs stay on this device.",
      tech: "Progressive Web App · Vercel"
    },
    {
      id: "claimstaker",
      name: "ClaimStaker",
      tagline: "Mining claim map",
      url: "https://claim-staker.com",
      embedUrl: "https://claimstaker.vercel.app",
      embed: true,
      embedParam: true,
      description: "Explore historic mines (USGS), active claims (BLM), equipment rentals, rail and water access, and on-device mineral photo ID from free public data. The interactive map is embedded from the live app.",
      tech: "Interactive map · PWA · USGS & BLM public data · Vercel"
    },
    {
      id: "serviceeval",
      name: "ServiceEval",
      tagline: "Homeowner quote evaluator",
      url: "https://serviceeval.com",
      embed: false,
      screenshot: "assets/demos/serviceeval.jpg",
      description: "Find local home service professionals by trade and ZIP code, with an instant quote calculator and free quote requests while the directory launches.",
      tech: "Web app · PWA · Vercel"
    },
    {
      id: "reelfree",
      name: "ReelFree",
      tagline: "Free movie and TV guide",
      url: "https://reelfree.net",
      embed: false,
      screenshot: "assets/demos/reelfree.jpg",
      description: "A free movie and TV guide that gathers legal, free-to-stream titles (Tubi, Pluto, Plex, YouTube and public-domain archives) into one clean site with genre browsing, posters and in-site playback where allowed.",
      tech: "Web app · PWA"
    }
  ];

  const tabs = document.getElementById("demo-tabs");
  const frame = document.getElementById("demo-frame");
  const fallback = document.getElementById("demo-fallback");
  const shot = document.getElementById("demo-shot");
  const title = document.getElementById("demo-title");
  const desc = document.getElementById("demo-desc");
  const tech = document.getElementById("demo-tech");
  const openBtn = document.getElementById("demo-open");
  const fallbackOpen = document.getElementById("demo-fallback-open");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    siteNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  const EXT_ICON = '<svg class="ext-icon" width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.25 3.5a.75.75 0 0 0 0 1.5h3.69L5.22 9.72a.75.75 0 1 0 1.06 1.06l4.72-4.72v3.69a.75.75 0 0 0 1.5 0V4.25A.75.75 0 0 0 11.75 3H6.25z"/><path fill="currentColor" d="M3.75 5.5A.25.25 0 0 0 3.5 5.75v6.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V10a.75.75 0 0 1 1.5 0v2.25A1.75 1.75 0 0 1 10.25 14h-6.5A1.75 1.75 0 0 1 2 12.25v-6.5C2 4.784 2.784 4 3.75 4H6a.75.75 0 0 1 0 1.5H3.75z"/></svg>';

  function setOpenLink(anchor, project) {
    if (!anchor) return;
    anchor.href = project.url;
    anchor.innerHTML = EXT_ICON + "<span>Open full app</span>";
    anchor.setAttribute("aria-label", "Open full app: " + project.name + " (opens in a new tab)");
  }

  function tabButtons() {
    return tabs.querySelectorAll(".demo-tab");
  }

  function withEmbedQuery(url) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set("embed", "1");
      return parsed.toString();
    } catch {
      if (/(?:^|[?&])embed=/.test(url)) return url;
      return url + (url.includes("?") ? "&" : "?") + "embed=1";
    }
  }

  function selectProject(project, { focus } = {}) {
    const buttons = tabButtons();
    PROJECTS.forEach((p, i) => {
      const btn = buttons[i];
      const on = p.id === project.id;
      btn.setAttribute("aria-selected", String(on));
      btn.tabIndex = on ? 0 : -1;
      if (on && focus) btn.focus();
    });

    title.textContent = project.name;
    desc.textContent = project.description;
    tech.textContent = project.tech;
    setOpenLink(openBtn, project);
    setOpenLink(fallbackOpen, project);

    if (project.embed) {
      fallback.hidden = true;
      frame.hidden = false;
      frame.title = `${project.name} live demo`;
      const base = project.embedUrl || project.url;
      const src = project.embedParam ? withEmbedQuery(base) : base;
      if (frame.getAttribute("src") !== src) frame.src = src;
    } else {
      frame.hidden = true;
      frame.removeAttribute("src");
      fallback.hidden = false;
      shot.src = project.screenshot;
      shot.alt = `Snapshot of the live ${project.name} homepage`;
    }
  }

  PROJECTS.forEach((project, index) => {
    const item = document.createElement("div");
    item.className = "demo-item";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "demo-tab";
    btn.id = `tab-${project.id}`;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", index === 0 ? "true" : "false");
    btn.setAttribute("aria-controls", "demo-frame-wrap");
    btn.tabIndex = index === 0 ? 0 : -1;
    btn.innerHTML = `<strong>${project.name}</strong><span>${project.tagline}</span>`;
    btn.addEventListener("click", () => selectProject(project));
    btn.addEventListener("keydown", (event) => {
      const next =
        event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 :
        event.key === "ArrowUp" || event.key === "ArrowLeft" ? -1 :
        event.key === "Home" ? -index :
        event.key === "End" ? PROJECTS.length - 1 - index :
        0;
      if (!next && event.key !== "Home" && event.key !== "End") return;
      event.preventDefault();
      const i = (index + next + PROJECTS.length) % PROJECTS.length;
      selectProject(PROJECTS[i], { focus: true });
    });

    const open = document.createElement("a");
    open.className = "btn btn-outline btn-open-full";
    open.target = "_blank";
    open.rel = "noopener noreferrer";
    setOpenLink(open, project);

    item.appendChild(btn);
    item.appendChild(open);
    tabs.appendChild(item);
  });

  const media = window.matchMedia("(min-width: 960px)");
  const setOrientation = () => {
    tabs.setAttribute("aria-orientation", media.matches ? "vertical" : "horizontal");
  };
  setOrientation();
  media.addEventListener("change", setOrientation);

  selectProject(PROJECTS[0]);
})();
