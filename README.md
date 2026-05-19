# 🎓 Presentia — Smart Attendance Tracking

**Presentia** is a modern, client-side web application for tracking and managing student attendance. Built with vanilla JavaScript and IndexedDB, it provides role-based dashboards for **Students**, **Faculty**, and **Administrators** — all running entirely in the browser with zero server dependencies.

![Version](https://img.shields.io/badge/version-1.0.0-indigo)
![License](https://img.shields.io/badge/license-MIT-emerald)

---

## ✨ Features

### 🎓 Student Dashboard
- **Overall Attendance KPIs** — percentage, total classes, attended, subjects at risk
- **Subject Performance Table** — per-subject breakdown with visual progress bars and color-coded health badges (Safe / At Risk / Critical)
- **Activity Feed** — last 30 attendance logs with date, subject, and status
- **Proactive Alerts** — banner notification when overall attendance drops below 75%

### 👨‍🏫 Faculty Panel
- **Attendance Sheet** — select subject, batch, and date to render an interactive student checklist
- **Bulk Actions** — Mark All Present / Absent with one click
- **Automated Triggers** — shortage alerts update automatically on submission
- **Roster & Analytics** — sortable student table with attendance percentages and health badges

### 🛡️ Admin Console
- **System KPIs** — total students, faculty, subjects, and active shortage alerts
- **Shortage Monitoring Hub** — centralized feed of all critical alerts across the institution
- **CRUD Operations** — add and remove students and faculty via validated modal forms

---

## 🚀 Getting Started

No build tools, no servers, no dependencies. Open the app directly in your browser:

```bash
open presentia/index.html
```

Or simply double-click `index.html` in your file explorer.

> **Note:** IndexedDB seeds ~2,640 realistic attendance records on first launch. Subsequent loads are instant.

---

## 🔐 Demo Credentials

| Role     | Email                          | Password |
|----------|--------------------------------|----------|
| Student  | mayur.sonawane@student.edu     | pass123  |
| Faculty  | ramesh.kumar@faculty.edu       | pass123  |
| Admin    | admin@attend.edu               | pass123  |

Click the role tabs on the login screen to auto-fill credentials.

---

## 🏗️ Project Structure

```
presentia/
├── index.html    # App shell — login, sidebar, dashboards, modals
├── styles.css    # Design system — Indigo/Slate theme, glassmorphism, responsive
├── db.js         # IndexedDB layer — schema, seed data, CRUD helpers
└── app.js        # View controllers — auth, dashboards, state management
```

### Data Layer (`db.js`)
- 5 IndexedDB object stores: `students`, `faculty`, `admins`, `subjects`, `attendance`
- Auto-seeds 20 students, 24 faculty, 6 subjects, 1 admin, and ~2,640 attendance records
- Promise-based wrappers for all database operations

### Seed Data
- **20 Students** across Sections A & B
- **24 Faculty** with assigned subjects
- **6 Subjects**: Mathematics, Physics, Computer Science, English Literature, Chemistry, Electronics
- **~2,640 Attendance Records** spanning 30 days with ~75% average attendance rate

---

## 🎨 Design System

- **Theme:** Deep Indigo / Slate with glassmorphism accents
- **Typography:** Inter (Google Fonts)
- **Icons:** Font Awesome 6
- **Responsive:** Mobile-first with collapsible sidebar
- **Animations:** Fade-up, slide, scale transitions

---

## 🛠️ Technical Stack

| Technology | Purpose |
|------------|---------|
| HTML5       | Semantic markup, single-page app shell |
| CSS3        | Custom properties, grid/flexbox, animations, responsive design |
| Vanilla JS  | DOM manipulation, event delegation, async/await, ES6+ |
| IndexedDB   | Client-side persistent storage with promise wrappers |

---

## 📸 Screenshots

<details>
<summary>Login Screen</summary>

Role-based tab switching with glassmorphism card and animated background orbs.
</details>

<details>
<summary>Student Dashboard</summary>

KPI metric cards, subject performance table with progress bars, activity feed, and shortage alert banner.
</details>

<details>
<summary>Faculty Attendance Sheet</summary>

Dropdown selectors for subject/batch/date, interactive Present/Absent toggles, bulk actions, and submission.
</details>

<details>
<summary>Admin Console</summary>

System overview KPIs, shortage monitoring hub, and CRUD modal forms for managing students and faculty.
</details>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ for modern education</p>
