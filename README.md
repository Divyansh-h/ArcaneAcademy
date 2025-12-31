# Arcane Academy 🎓✨

**Arcane Academy** is a modern, AI-powered grading and learning management platform designed to streamline the assessment process for educational institutions. This repository contains the **Frontend** application, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Role-Based Portals**:
  - **Admin Portal**: Manage users (students/teachers), classes, and oversee system settings.
  - **Teacher Portal**: Create classes, upload assignments, and grade student submissions with advanced PDF annotation tools.
  - **Student Portal**: View enrolled classes, submit assignments (PDF), and review graded feedback.

- **Smart PDF Grading**:
  - Built-in PDF viewer with annotation capabilities (Ticks, Crosses, Comments).
  - "Save & Grade" functionality that burns annotations directly onto the submission file.
  - Asynchronous processing for handling large grading tasks significantly.

- **Modern UI/UX**:
  - Responsive design using **Tailwind CSS**.
  - Interactive components powered by **Radix UI** and **Shadcn/UI**.
  - Smooth animations and intuitive navigation.

## 🛠️ Tech Stack

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **State Management**: React Hooks
- **PDF Handling**: `react-pdf`, `pdf-lib`
- **HTTP Client**: Axios

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Divyansh-h/ArcaneAcademy.git
   cd ArcaneAcademy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📝 Note

This repository hosts the frontend code. The backend services (Microservices architecture with Node.js, Express, RabbitMQ, and PostgreSQL) are managed separately or in a private repository effectively decoupled via API contracts.
