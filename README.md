# 📚 OurNeeds — Student Activity & Quiz Tracking Platform

> A modern Laravel + React app for managing quizzes, events, users, and roles.

---

## 🏷️ Stack & Status

![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Inertia](https://img.shields.io/badge/Inertia.js-Enabled-9553E9?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38BDF8?style=for-the-badge&logo=tailwind-css)
![Node](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js)
![PHP](https://img.shields.io/badge/PHP-8.3-777BB4?style=for-the-badge&logo=php)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge)

---

## 🎬 UI Preview

A quick look at the OurNeeds interface:

<p align="center">
  <img src="docs/preview.gif" width="900" alt="OurNeeds UI Preview">
</p>

---

## 🚀 Overview

**OurNeeds** is a role-based platform built with **Laravel 12**, **Inertia.js**, and **React** to help schools and organizations manage:

- ✅ Quiz tracking  
- ✅ Event reservations  
- ✅ Google Forms integration  
- ✅ Student & teacher dashboards  
- ✅ Admin controls for roles & permissions  

Each role (student, teacher, admin) gets a **tailored dashboard** with only what they need.

---

## ✨ Core Features

### 🎯 Smart Quiz Tracking  
Keep quizzes organized with clear tracking for responses, completion status, and availability.

### 📅 Event Reservations  
Students can view upcoming events, reserve seats, and keep track of important dates.

### 🔄 Google Forms Sync  
Import and update quizzes and events directly from Google Forms links.

### 🔐 Role-Based Access  
Built on **Spatie Roles & Permissions**, with three main roles:

- 🧑‍🎓 **Student**  
- 🧑‍🏫 **Teacher**  
- 🛡️ **Admin**  

Each role sees different navigation, actions, and tools.

### 📊 Real-Time Insights  
Admins can see analytics on:

- Quiz participation  
- Event attendance  
- Overall engagement

### 🌈 Beautiful UI  
- Custom gradient icons  
- Minimal, clean cards  
- Floating sidebar with role-based options  

---

## 🛠️ Tech Stack

| Layer     | Technology                       |
|----------|-----------------------------------|
| Backend  | Laravel 12                        |
| Frontend | React + Inertia.js + Vite         |
| Styling  | TailwindCSS                       |
| Auth     | Laravel Breeze                    |
| RBAC     | Spatie Roles & Permissions        |
| Database | MySQL (Laragon or native)         |

---

## 📦 Installation

Follow the steps below.  
Commands are shown as if you’re running them in a terminal.

### 1️⃣ Clone the repository

- **What you do:** Download the project and `cd` into it.

```bash
git clone https://github.com/yourusername/ourneeds.git
cd ourneeds
```

### 2️⃣ Install PHP dependencies

-What you do: Install frontend + build tooling.

```bash
    composer install
```

3️⃣ Install Node dependencies

-What you do: Install frontend + build tooling.
```bash
    npm install
```

4️⃣ Create and configure your `.env`

-What you do: Copy the example config and adjust it.
```bash
    cp .env.example .env
```

Update these fields inside `.env`:
-`APP_URL`
-`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
-Mail settings (optional for now)

5️⃣ Generate the application key

-What you do: Let Laravel generate a unique app key.
```bash
    php artisan key:generate
```

6️⃣ Run migrations & seeders

-What you do: Create the database tables and seed roles/users.
```bash
    php artisan migrate --seed
```
This will create:
-Default roles: `student`, `teacher`, `admin`
-Default permissions
-Default admin users: Kenny, Vinny, Rex, Saw Keh
-All seeded users share the password: `Password`

7️⃣ Start the dev servers

-What you do: Run Vite + Laravel side by side.
```bash
    npm run dev
    php artisan serve
```
Open the app in your browser:
`http://localhost:8000`

🗂️ Project Structure (High Level)
```bash
    app/
      Http/
        Controllers/
        Middleware/
      Models/
    resources/
      js/
        Pages/
        Components/
        Layouts/
      views/
    routes/
      web.php
    database/
      migrations/
      seeders/
```
🔒 Roles & Permissions

Roles are powered by Spatie Roles & Permissions:
```bash
    student
    teacher
    admin
```
Typical permissions include:
```bash
    view quizzes
    manage quizzes
    view events
    manage events
    manage users
    assign roles
```
Permissions and roles are seeded and exposed to the frontend through Inertia props.

🤝 Contributing

Pull requests are welcome 💜  
`Fork the repo  
  Create a feature branch  
  Commit and push  
  Open a PR and describe your changes`
