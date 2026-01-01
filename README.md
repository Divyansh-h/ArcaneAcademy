# Arcane Academy

Arcane Academy is a grading and learning management platform I'm working on to help schools manage assessments. This repo holds the frontend part of the application, which I built using React, TypeScript, and Tailwind CSS.

## Features

- **Role-Based Portals**:
  - **Admin Portal**: For managing users and classes.
  - **Teacher Portal**: Allows teachers to create classes and grade assignments using PDF annotation tools.
  - **Student Portal**: Where students can view classes and submit their work.

- **PDF Grading**:
  - Includes a PDF viewer where you can add annotations like ticks and comments.
  - You can save graded PDFs with the annotations baked in.

- **UI/UX**:
  - The interface is responsive and built with Tailwind CSS.
  - Uses Radix UI and Shadcn/UI for components.

## Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS & Shadcn/UI
- React Hooks for state management
- `react-pdf` & `pdf-lib` for PDF handling
- Axios for API calls

## Installation

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

## Note

This repository only contains the frontend code. The backend services (built with Node.js, Express, etc.) are kept in a separate place/repository.
