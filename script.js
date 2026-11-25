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
      "Duplicate product lines are aggregated before stock is reserved and purchase-time prices are stored on order items.",
      "PostgreSQL row-level locks protect concurrent order placement and cancellation against overselling and double stock restoration.",
      "Database CHECK constraints enforce valid order states, positive quantities, and non-negative inventory and monetary values."
    ],
    data: "SQLAlchemy ORM with SQLite as the default local database and PostgreSQL configuration support. Alembic migrations are committed and are the schema-change source of truth.",
    quality: "Pytest API tests use isolated SQLite fixtures locally. GitHub Actions runs the suite against PostgreSQL 16, applies Alembic migrations, verifies the recorded revision, builds the Docker image, and runs PostgreSQL-only concurrent order and cancellation tests.",
    note: "Portfolio project; not independently security-audited. A Docker Compose + Caddy VPS deployment template is available in the repository, but no public live deployment is configured yet.",
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
    data: "PostgreSQL persistence through SQLAlchemy. Passwords use Argon2 via pwdlib. The repository includes a versioned Alembic migration workflow, including job salary integrity constraints.",
    quality: "Pytest covers registration security, JWT validation, job filters, employer ownership and application permissions. Tests call route-handler functions with isolated SQLite sessions. GitHub Actions runs the tests, builds the Docker image and verifies Alembic migrations against PostgreSQL 16; full PostgreSQL workflow integration tests remain future work.",
    note: "Employer access is granted through a trusted database-administrator process outside the application. An in-app approval queue and production hardening are future work. No public live deployment is listed.",
    url: "https://github.com/kirubanandhan016/job-portal-api"
  },
  peoplepulse: {
    title: "PeoplePulse EMS",
    subtitle: "Employee management · FastAPI + React",
    overview: "A full-stack employee management system with Admin, HR Manager and Employee roles, covering core employee operations.",
    architecture: "React frontend → FastAPI routers and role-based dependencies → service and SQLAlchemy model layers → PostgreSQL. Alembic manages schema changes.",
    features: [
      "Role-based access for administrators, HR managers and employees.",
      "Employee directory, department management and employee assignment.",
      "Daily attendance check-in/check-out and attendance history.",
      "Leave application, cancellation, approval and rejection workflows.",
      "Salary records and server-side net salary calculation."
    ],
    data: "PostgreSQL persistence with SQLAlchemy 2.0 models and versioned Alembic migrations.",
    quality: "The repository includes backend pytest integration tests. Its CI workflow runs the backend test suite and builds the React frontend. Review the workflow checks for the latest result.",
    note: "Portfolio project. Production deployment still requires environment-specific secrets, TLS termination, operational monitoring, backups and a security review.",
    url: "https://github.com/kirubanandhan016/employee-management-system"
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
    data: "SQLAlchemy ORM with SQLite as the default local database and PostgreSQL configuration support. Versioned Alembic migrations are applied by the Docker entrypoint.",
    quality: "Pytest covers authentication, authorization, validation, task workflows, SQLite foreign-key enforcement and user/task cascade behavior. GitHub Actions also verifies PostgreSQL migrations, application startup and Docker image build.",
    note: "Pagination/filtering, refresh-token rotation, rate limiting and deployment hardening remain future improvements. No public live deployment is listed.",
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
    const featuredNames = ["inventoryx-fastapi", "employee-management-system", "job-portal-api", "taskflow-api"];
    const descriptions = {
      "inventoryx-fastapi": "Inventory and order management API",
      "employee-management-system": "Full-stack employee management system",
      "job-portal-api": "Role-based recruitment backend",
      "taskflow-api": "JWT-protected task API"
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
