(() => {
  const PROJECTS = [
    {
      id: "apocalypse",
      name: "Apocalypse Tracker",
      tagline: "3D live world globe",
      url: "https://apocalypse-tracker.com",
      embed: true,
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

  function selectProject(project, { focus } = {}) {
    PROJECTS.forEach((p, i) => {
      const btn = tabs.children[i];
      const on = p.id === project.id;
      btn.setAttribute("aria-selected", String(on));
      btn.tabIndex = on ? 0 : -1;
      if (on && focus) btn.focus();
    });

    title.textContent = project.name;
    desc.textContent = project.description;
    tech.textContent = project.tech;
    openBtn.href = project.url;
    openBtn.textContent = project.embedUrl && project.embedUrl !== project.url
      ? "Open full screen"
      : "Open full screen";
    fallbackOpen.href = project.url;

    if (project.embed) {
      fallback.hidden = true;
      frame.hidden = false;
      frame.title = `${project.name} live demo`;
      const src = project.embedUrl || project.url;
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
    tabs.appendChild(btn);
  });

  const media = window.matchMedia("(min-width: 960px)");
  const setOrientation = () => {
    tabs.setAttribute("aria-orientation", media.matches ? "vertical" : "horizontal");
  };
  setOrientation();
  media.addEventListener("change", setOrientation);

  selectProject(PROJECTS[0]);
})();
