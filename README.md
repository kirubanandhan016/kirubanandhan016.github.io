# Kirubanandhan V — Python Backend Developer Portfolio

Premium, responsive developer portfolio built with semantic HTML, CSS and vanilla JavaScript for GitHub Pages.

- **Live portfolio:** https://kirubanandhan016.github.io/
- **GitHub profile:** https://github.com/kirubanandhan016
- **LinkedIn:** https://www.linkedin.com/in/kirubanandhan-v-98bb83443/
- **Email:** kirubanandhan016@gmail.com
- **Résumé:** [resume.pdf](resume.pdf)

## Portfolio structure

- **Home:** backend-focused introduction, location, direct links and a developer terminal visual.
- **About:** project-led backend development summary.
- **Skills:** technologies grouped by actual project and workflow evidence; no proficiency percentages.
- **Projects:** LeadPilot (in development), plus InventoryX, Job Portal API and TaskFlow with repository links and implementation details.
- **GitHub:** public profile counts and featured repository metadata are fetched from the unauthenticated GitHub REST API when available. Static verified links remain as a fallback.
- **Experience:** Embedded Trainee experience.
- **Education:** B.E. Electronics and Communication Engineering, IFET College of Engineering, Anna University.
- **Contact:** validated contact form that opens a pre-filled email draft in the visitor's email application.

## Featured backend projects

| Project | Verified implementation focus |
|---|---|
| [InventoryX API](https://github.com/kirubanandhan016/inventoryx-fastapi) | FastAPI inventory and order workflows, JWT authentication, SQLAlchemy, Alembic, SQLite/PostgreSQL configuration, Pytest and CI |
| [Job Portal API](https://github.com/kirubanandhan016/job-portal-api) | Job-seeker and employer workflows, job search, applications, role/ownership checks, PostgreSQL, Argon2, JWT and Pytest |
| [TaskFlow API](https://github.com/kirubanandhan016/taskflow-api) | JWT-protected task CRUD, per-user resource isolation, SQLAlchemy, Pydantic, SQLite/PostgreSQL configuration and Pytest |

Supporting work includes [E-Commerce SQL Analytics](https://github.com/kirubanandhan016/ecommerce-sql-project), [Student Performance Analysis](https://github.com/kirubanandhan016/student-performance-analysis-sql) and [NeetCode Submissions](https://github.com/kirubanandhan016/neetcode-submissions).

**LeadPilot** is listed as the current project without a repository link or unverified feature claims.

## Design system

- **Background:** `#0B1120`
- **Secondary background:** `#111C30`
- **Cards:** `#162238`
- **Primary blue:** `#3B82F6`
- **Blue hover:** `#60A5FA`
- **Main text:** `#F8FAFC`
- **Secondary text:** `#94A3B8`
- **Borders:** `#263449`
- **Headings:** Space Grotesk
- **Body:** Inter
- **Code labels:** JetBrains Mono

## Technology and implementation

- Semantic HTML5, responsive CSS and vanilla JavaScript.
- Mobile navigation, active section tracking and reduced-motion support.
- Project detail dialogs with architecture, implementation and test-scope notes.
- Public GitHub REST API requests without personal access tokens or frontend secrets.
- Contact form uses native browser validation and a `mailto:` draft. It does not claim to deliver or store messages through a backend.
- No client-side framework or animation dependency is required.

## Run locally

From the repository root:

```bash
python -m http.server 8000
```

Open http://localhost:8000.

## GitHub Pages

The repository is configured for GitHub Pages at https://kirubanandhan016.github.io/. Keep `index.html`, `style.css`, `script.js`, `resume.pdf` and the `assets/` directory in the repository root.

## Accuracy notes

- Project feature descriptions are based on the public repository documentation.
- InventoryX tests use isolated SQLite fixtures; CI applies migrations to PostgreSQL 16. Full concurrent PostgreSQL API integration coverage remains future work.
- Job Portal tests use SQLite route-handler sessions; its PostgreSQL CI step is a schema/connectivity smoke check. Alembic migrations are not currently implemented.
- TaskFlow defaults to SQLite and supports PostgreSQL configuration. Several hardening features remain future work as documented in its README.
- No live demo is linked because no verified public deployment URL was found for the featured APIs.
- LeadPilot remains in development and is not linked to an unpublished repository.
- GitHub activity is linked to the live GitHub profile rather than represented with fabricated contribution counts.
- Resume PDF is linked from the repository root; keep its contents synchronized with the experience and education displayed here.
