# Kirubanandhan V — Python Backend Developer Portfolio

Personal portfolio for entry-level **Python Backend Developer**, **Junior Python Developer**, and **FastAPI Developer** opportunities.

- **Live portfolio:** https://kirubanandhan016.github.io/
- **GitHub profile:** https://github.com/kirubanandhan016
- **LinkedIn:** https://www.linkedin.com/in/kirubanandhan-v-98bb83443/
- **Contact:** kirubanandhan016@gmail.com

## Featured backend projects

| Project | Verified focus | Repository |
|---|---|---|
| InventoryX API | Product/category CRUD, inventory adjustments/history, order placement and cancellation, JWT, SQLAlchemy, Alembic, Pytest and CI | [inventoryx-fastapi](https://github.com/kirubanandhan016/inventoryx-fastapi) |
| Job Portal API | Job search/filtering, employer/job-seeker roles, JWT, applications, resource ownership, PostgreSQL and Pytest | [job-portal-api](https://github.com/kirubanandhan016/job-portal-api) |
| TaskFlow API | Task CRUD, JWT authentication, user-scoped access, SQLAlchemy, Pydantic and Pytest | [taskflow-api](https://github.com/kirubanandhan016/taskflow-api) |
| Student Management API | Student retrieval, department/marks filtering and summary endpoints; in-memory sample data, not persistent storage | [Student-Management-API](https://github.com/kirubanandhan016/Student-Management-API) |

**Current work — LeadPilot:** LeadPilot is in development. The portfolio intentionally does not link a repository or claim completed features until the implementation is ready to present.

## Technology

- **Programming:** Python, SQL, C, C++, OOP, exception handling
- **Backend & API:** FastAPI, REST APIs, CRUD, Pydantic, HTTP methods and status codes
- **Database:** PostgreSQL, SQLite, SQLAlchemy 2.0, Alembic, database transactions
- **Authentication & security:** JWT, password hashing, role-based access control, authorization and data validation
- **Testing & tools:** Pytest, API testing, Git, GitHub, Linux, VS Code and GitHub Actions

## Design system

- **Headings:** Manrope
- **Body:** Inter
- **Technical labels:** JetBrains Mono
- **Background:** `#090B12`
- **Cards:** `#171C28`
- **Primary accent:** `#B7FF36`
- **Secondary accent:** `#22D3EE`
- **Borders:** `#303642`

The portfolio uses responsive HTML, CSS and vanilla JavaScript. It is designed for GitHub Pages and requires no build step.

## Contact\n\nThe portfolio uses direct email, GitHub and LinkedIn links. It does not currently advertise a custom contact-form backend.\n\n## Repository structure

```text
index.html
style.css
script.js
assets/
  kiruba-portrait.webp
  profile.jpg
resume.pdf
README.md
```

## Run locally

Serve the repository root with a local static web server, for example:

```bash
python -m http.server 8000
```

Then open http://localhost:8000. The hosted contact form requires a web server and an activated FormSubmit endpoint; opening the HTML file directly is not a valid contact-form test.

## GitHub Pages deployment

1. Open the repository **Settings → Pages**.
2. Set the source to **Deploy from a branch**.
3. Select the `main` branch and `/ (root)` folder, then save.
4. Keep `index.html`, `style.css`, `script.js`, `resume.pdf`, and the `assets/` directory in the repository root.
5. Visit https://kirubanandhan016.github.io/ after GitHub Pages finishes publishing.

## Accuracy notes

- Project descriptions are based on the README files in the linked repositories and distinguish implemented features from future work.\n- The architecture graphic is a conceptual reference flow, not a claim of a deployed production system.
- Student Management API uses in-memory sample data; it is not described as a database-backed application.
- Job Portal API does not claim Alembic migrations; its README says schema migrations remain future work.
- LeadPilot is marked as in development without an invented public repository URL or feature list.
- No live-demo, production-deployment, test-count, performance, or fake proficiency claims are advertised.
- Keep `resume.pdf` and the education/experience details synchronized with the latest resume.
