const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("primaryNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  });
});

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".skill-card,.project-card,.current-project,.timeline-item,.education-card,.github-panel,.about-copy,.about-aside")
    .forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      nav?.querySelectorAll("a[href^='#']").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  document.querySelectorAll("main section[id]").forEach((section) => navObserver.observe(section));
}

// Project detail content is based on the corresponding public repository README files.
const projectDetails = {
  inventoryx: {
    title: "InventoryX API",
    subtitle: "Inventory and order management · FastAPI",
    overview: "A REST API that models inventory operations from product setup through stock movement and order fulfilment. This is the most layered backend project in the portfolio.",
    architecture: "HTTP routers → service layer → repositories → SQLAlchemy models → relational database. Pydantic schemas define request and response data; Alembic tracks schema changes.",
    features: [
      "User registration, login and authenticated current-user endpoint.",
      "Salted PBKDF2-HMAC-SHA256 password hashing and signed JWT bearer access tokens.",
      "Product and category CRUD, stock adjustment and inventory transaction history.",
      "Authenticated order placement, retrieval and cancellation.",
      "Order-row locking during cancellation to avoid restoring the same stock twice on databases that support row-level locks."
    ],
    data: "SQLAlchemy ORM with SQLite as the default local database and PostgreSQL configuration support. Alembic migrations are committed and are the schema-change source of truth.",
    quality: "Pytest API tests use isolated in-memory SQLite fixtures. GitHub Actions runs the test suite and applies migrations to a PostgreSQL 16 service. The current suite covers sequential cancellation; concurrent PostgreSQL API integration testing remains a useful next step.",
    note: "Portfolio and learning project; not independently security-audited for production. No public live deployment is listed.",
    url: "https://github.com/kirubanandhan016/inventoryx-fastapi"
  },
  jobportal: {
    title: "Job Portal API",
    subtitle: "Recruitment management · FastAPI + PostgreSQL",
    overview: "A recruitment backend for job seekers, employer-managed job listings and application workflows, accompanied by a small static HTML/CSS/JavaScript interface.",
    architecture: "FastAPI routers for authentication, users, jobs and applications connect to SQLAlchemy models and Pydantic schemas. Dependencies enforce authenticated access, roles and resource ownership.",
    features: [
      "Public registration creates job-seeker accounts; login issues bearer JWTs.",
      "Employer-only job creation, editing and deletion.",
      "Search by title, location, employment type and minimum salary.",
      "Job application submission and withdrawal, plus employer review and status updates.",
      "Ownership checks prevent one employer or applicant from managing another user's resources."
    ],
    data: "PostgreSQL persistence through SQLAlchemy. Passwords use Argon2 via pwdlib. The current schema is created from SQLAlchemy metadata at startup; Alembic migrations are not yet implemented.",
    quality: "Pytest covers registration security, JWT validation, job filters, employer ownership and application permissions. Tests call route-handler functions with isolated SQLite sessions; GitHub Actions also performs a PostgreSQL 16 connectivity/schema smoke check, not a full PostgreSQL workflow test.",
    note: "Employer access is granted through a trusted database-administrator process outside the application. An in-app approval queue and production hardening are future work. No public live deployment is listed.",
    url: "https://github.com/kirubanandhan016/job-portal-api"
  },
  taskflow: {
    title: "TaskFlow API",
    subtitle: "Task management service · FastAPI",
    overview: "A focused task-management REST API demonstrating authenticated CRUD operations and user-level resource isolation.",
    architecture: "FastAPI routers handle authentication and task routes. Shared dependencies resolve the current user and database session; CRUD functions work with SQLAlchemy models and Pydantic schemas.",
    features: [
      "User registration, login and JWT bearer authentication.",
      "Create, list, retrieve, update and delete task records.",
      "Ownership checks scope task access to the authenticated user.",
      "Pydantic request validation and structured HTTP errors.",
      "Interactive Swagger UI and generated OpenAPI documentation."
    ],
    data: "SQLAlchemy ORM with SQLite as the default local database and PostgreSQL configuration support.",
    quality: "Pytest covers authentication, authorization, validation and task workflows. GitHub Actions runs tests with isolated SQLite data and performs a PostgreSQL connectivity/schema smoke check.",
    note: "Alembic migrations, pagination/filtering, refresh-token rotation, rate limiting and deployment hardening are listed as future improvements. No public live deployment is listed.",
    url: "https://github.com/kirubanandhan016/taskflow-api"
  }
};

const dialog = document.getElementById("projectDialog");
const dialogContent = document.getElementById("dialogContent");
const dialogClose = document.getElementById("dialogClose");

function renderProjectDetails(project) {
  if (!dialogContent || !project) return;
  const list = (items) => items.map((item) => "<li>" + item + "</li>").join("");
  dialogContent.innerHTML = `
    <div class="dialog-content">
      <p class="project-kicker">${project.subtitle}</p>
      <h2 id="dialogTitle">${project.title}</h2>
      <p>${project.overview}</p>
      <h3>Architecture</h3>
      <div class="dialog-code">${project.architecture}</div>
      <h3>Implemented functionality</h3>
      <ul>${list(project.features)}</ul>
      <h3>Database implementation</h3>
      <p>${project.data}</p>
      <h3>Testing and CI</h3>
      <p>${project.quality}</p>
      <p class="dialog-note">${project.note}</p>
      <p><a class="inline-link" href="${project.url}" target="_blank" rel="noopener noreferrer">Open source repository ↗</a></p>
    </div>`;
}

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectDetails[button.dataset.project];
    renderProjectDetails(project);
    if (dialog?.showModal) dialog.showModal();
  });
});

dialogClose?.addEventListener("click", () => dialog?.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

// Public GitHub REST API only: no personal access token or private credentials in the browser.
async function loadGitHubProfile() {
  const status = document.getElementById("githubStatus");
  try {
    const response = await fetch("https://api.github.com/users/kirubanandhan016", {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error("GitHub profile API unavailable");
    const profile = await response.json();
    const repoCount = document.getElementById("repoCount");
    const followerCount = document.getElementById("followerCount");
    const followingCount = document.getElementById("followingCount");
    if (repoCount) repoCount.textContent = String(profile.public_repos ?? "—");
    if (followerCount) followerCount.textContent = String(profile.followers ?? "—");
    if (followingCount) followingCount.textContent = String(profile.following ?? "—");
    if (status) status.textContent = "Live public profile counts loaded from GitHub.";
  } catch {
    if (status) status.textContent = "Live counts are temporarily unavailable. The verified profile and repository links remain available.";
  }

  try {
    const response = await fetch("https://api.github.com/users/kirubanandhan016/repos?per_page=100&sort=updated", {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error("GitHub repositories API unavailable");
    const repositories = await response.json();
    const featuredNames = ["inventoryx-fastapi", "job-portal-api", "taskflow-api", "ecommerce-sql-project"];
    const descriptions = {
      "inventoryx-fastapi": "Inventory and order management API",
      "job-portal-api": "Role-based recruitment backend",
      "taskflow-api": "JWT-protected task API",
      "ecommerce-sql-project": "Relational data modelling and analytics"
    };
    const container = document.getElementById("repoList");
    if (!container) return;
    const featured = featuredNames.map((name) => repositories.find((repo) => repo.name === name)).filter(Boolean);
    if (!featured.length) return;
    container.innerHTML = featured.map((repo) => {
      const language = repo.language || "Code";
      const dotClass = language.toLowerCase() === "sql" ? "sql-dot" : language.toLowerCase() === "python" ? "python-dot" : "";
      const description = descriptions[repo.name] || repo.description || "Public repository";
      return `<a href="${repo.html_url}" target="_blank" rel="noopener noreferrer"><span class="repo-language-dot ${dotClass}"></span><strong>${repo.name}</strong><small>${description}</small><b>↗</b></a>`;
    }).join("");
  } catch {
    // Keep the verified static repository links in the HTML as a useful fallback.
  }
}
loadGitHubProfile();

// Static GitHub Pages contact flow: validate fields and open a composed email.
// The website does not claim to send, store or process messages on a server.
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const subject = encodeURIComponent("Portfolio enquiry from " + name);
  const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);
  if (formStatus) formStatus.textContent = "Opening your email application with a prepared message. Review it and press Send there.";
  window.location.href = "mailto:kirubanandhan016@gmail.com?subject=" + subject + "&body=" + body;
});
