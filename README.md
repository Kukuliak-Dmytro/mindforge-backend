<div align="center">

<img src="MindForge\src\app\favicon-64.ico" width="25%" style="position: relative; top: 0; right: 0;" alt="MindForge Logo"/>
# MINDFORGE MONOREPO

<em>Empowering Connections for Seamless Learning Experiences</em>

<!-- BADGES: TECHNOLOGIES -->
<img src="https://img.shields.io/badge/Next.js-000000.svg?style=flat&logo=Next.js&logoColor=white" alt="Next.js">
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=Prisma&logoColor=white" alt="Prisma">
<img src="https://img.shields.io/badge/Supabase-3FCF8E.svg?style=flat&logo=Supabase&logoColor=white" alt="Supabase">
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4.svg?style=flat&logo=Tailwind-CSS&logoColor=white" alt="Tailwind CSS">
<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
<img src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white" alt="Markdown">
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
<img src="https://img.shields.io/badge/Zod-3E67B1.svg?style=flat&logo=Zod&logoColor=white" alt="Zod">
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white" alt="Autoprefixer">

<!-- BADGES: LANGUAGES/COUNTS -->
<img src="https://img.shields.io/github/languages/top/Kukuliak-Dmytro/MindForge?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/Kukuliak-Dmytro/MindForge?style=flat&color=0080ff" alt="repo-language-count">
<img src="https://img.shields.io/github/languages/top/Kukuliak-Dmytro/mindforge-backend?style=flat&color=0080ff" alt="repo-top-language-backend">
<img src="https://img.shields.io/github/languages/count/Kukuliak-Dmytro/mindforge-backend?style=flat&color=0080ff" alt="repo-language-count-backend">

</div>

---

## 📄 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Testing](#-testing)
- [Roadmap](#-roadmap)
- [Acknowledgments](#-acknowledgments)

---

## ✨ Overview

MindForge is a modern, scalable web platform designed to connect students with qualified tutors, streamlining collaboration, resource sharing, and personalized education. This monorepo contains both the frontend (Next.js, React, Tailwind CSS, Supabase) and backend (Express, TypeScript, Prisma, Supabase) projects.

**Why MindForge?**

- **Seamless Collaboration:** Connects employers, tutors, and students for efficient learning and project management.
- **Modern Tech Stack:** Built with Next.js, TypeScript, Docker, Prisma, and Supabase for robust, scalable, and maintainable development.
- **Role-Based Access:** Secure authentication and role management for students, tutors, and admins.
- **Real-Time Communication:** Integrated chat and messaging features for direct interaction.
- **Comprehensive Order Management:** Streamlined creation, updating, and management of tutoring sessions and orders.
- **Extensive Documentation:** Guides and API docs for easy onboarding and integration.

---

## 📌 Features

|      | Component       | Details                              |
| :--- | :-------------- | :----------------------------------- |
| ⚙️  | **Architecture**  | <ul><li>Monorepo with frontend (Next.js) and backend (Express.js)</li><li>TypeScript for type safety</li><li>Modular, scalable structure</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>ESLint, Prettier, and static typing</li><li>Schema validation with Zod</li></ul> |
| 📄 | **Documentation** | <ul><li>Comprehensive guides and API docs</li><li>Dockerfiles for containerization</li></ul> |
| 🔌 | **Integrations**  | <ul><li>Supabase for authentication and database</li><li>Prisma ORM</li><li>Radix UI, Axios, JWT</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Reusable components and hooks</li><li>Service layer for business logic</li></ul> |
| 🧪 | **Testing**       | <ul><li>Unit and integration tests (Jest, React Testing Library, etc.)</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Optimized queries and code splitting</li><li>Efficient Docker deployment</li></ul> |
| 🛡️ | **Security**      | <ul><li>JWT authentication</li><li>Role-based access control</li><li>Environment variable management</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Frontend: Next.js, React, Tailwind CSS, Radix UI</li><li>Backend: Express, Prisma, Supabase</li></ul> |
| 🚀 | **Scalability**   | <ul><li>Containerized with Docker</li><li>Stateless API design</li></ul> |

---

## 📁 Project Structure

```sh
└── (repo-root)/
    ├── MindForge/           # Frontend (Next.js, React, Tailwind CSS)
    ├── mindforge-backend/   # Backend (Express, TypeScript, Prisma)
    └── README.md            # This file
```

### MindForge (Frontend)
- Next.js, React, Tailwind CSS, Supabase
- Role-based dashboards for students and tutors
- Real-time chat, order management, profile editing

### mindforge-backend (Backend)
- Express.js, TypeScript, Prisma, Supabase
- RESTful API for user, tutor, student, order, and chat management
- JWT authentication, schema validation, and business logic

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)
- **Docker** (optional, for containerized setup)

### ⚙️ Installation

#### 1. Clone the repository
```sh
git clone  https://github.com/Student-Papers/paper-2024-2025-Kukuliak-Dmytro.git
```

#### 2. Install dependencies

**Frontend:**
```sh
cd MindForge
npm install
```

**Backend:**
```sh
cd ../mindforge-backend
npm install
```

#### 3. Environment setup
- Copy and configure `.env` files for both frontend and backend as needed (see respective subproject READMEs for details).

#### 4. Database setup (backend)
- Run Prisma migrations and seed the database if required.

#### 5. Build Docker images (optional)
```sh
# From repo root
cd MindForge && docker build -t mindforge-frontend .
cd ../mindforge-backend && docker build -t mindforge-backend .
```

---

## 💻 Usage

### Start Frontend
```sh
cd MindForge
npm start
```

### Start Backend
```sh
cd mindforge-backend
npm start
```

### Docker (optional)
```sh
docker run -it mindforge-frontend
docker run -it mindforge-backend
```

---

## 🧪 Testing

- **Frontend:**
  - `cd MindForge && npm test`
- **Backend:**
  - `cd mindforge-backend && npm test`

---

## 📈 Roadmap

- [X] Initial monorepo setup
- [X] Frontend and backend integration
- [ ] Add more automated tests
- [ ] Implement payment integration
- [ ] Mobile app support

---

## ✨ Acknowledgments

- Credit to all contributors, inspiration, and references from the open-source community.

---
