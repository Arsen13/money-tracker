# 💰 Money Tracker

**Money Tracker** is a web application for personal finance management that helps you track your expenses, income, and overall balance. Stay in control of your finances with ease.

## 🚀 Features

- 📊 Track income and expenses
- 📁 Categorize your transactions
- 📈 Visualize financial data
- 🧾 View transaction history
- 🔐 User authentication

## 🛠️ Technologies

- **Frontend:** Next.js, TypeScript, Tailwind, Zustand
- **Backend:** Node.js, Nest.js
- **Database:** PostgreSQL + Prisma

## Available Scripts
### In the backend directory
This project provides the following npm scripts for backend development:

### `npm install`
Installs all project dependencies listed in package.json.
After installation, it automatically runs prisma generate to generate the Prisma client.

### `npm run build`
Compiles the TypeScript source code into the dist directory using the NestJS CLI.

### `npm run start`
Starts the application in production mode using the NestJS CLI.

Server will available on [http://localhost:4200](http://localhost:4200)

### `npm run start:dev`
Starts the application in development mode with automatic reload on file changes (--watch).

Server will available on [http://localhost:4200](http://localhost:4200)

### In the frontend directory
This project provides the following npm scripts for frontend development:

### `npm install`
Installs all project dependencies listed in package.json.

### `npm run dev`
Runs the Next.js development server on [http://localhost:3000](http://localhost:3000).
The app will automatically reload if you make edits.

### `npm run build`
Builds the application for production.
It optimizes and generates the production-ready .next build folder.

### `npm run start`
Starts the production server to serve the built application.
Make sure you run npm run build first.

### `npm run lint`
Runs ESLint to analyze and report problems in your project files.
