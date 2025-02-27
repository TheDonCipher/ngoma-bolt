# Ngoma Setup Guide

This document provides instructions for setting up the Ngoma project environment, including configuration and database setup.

## Technology Stack Overview

Before beginning the setup, familiarize yourself with the core technologies used in the Ngoma platform:

- **Frontend**: Next.js 13+ with React 18+, Tailwind CSS
- **Backend**: NestJS 9+, Node.js 16+
- **Database**: PostgreSQL 13+
- **ORM**: Prisma 4+
- **Authentication**: JWT with NestJS Passport
- **Web3**: ethers.js or web3.js for Ethereum blockchain integration

## Prerequisites

Ensure you have the following installed on your development machine:

- **Node.js** (v16.x or later)
- **npm** (v8.x or later) or **yarn** (v1.22.x or later)
- **PostgreSQL** (v13 or later)
- **Git** (v2.30 or later)

## Project Setup and Initial Configuration

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd ngoma-bolt
   ```

   _(Replace `<repository_url>` with the actual repository URL)_

2. **Install dependencies:**

   ```bash
   npm install
   cd backend
   npm install
   cd ..
   ```

   This will install all necessary Node.js packages for both the frontend and backend.

   **Note**: If you encounter any dependency conflicts, try using `npm install --legacy-peer-deps` to resolve them.

3. **Configure environment variables:**

   - Create a `.env.development` file in the root directory by copying `.env.example`:
     ```bash
     cp .env.example .env.development
     ```
   - Update the variables in `.env.development` with your local development settings. This may include database connection strings, API keys, and other environment-specific configurations. Refer to `.env.example` and documentation for details on required variables.

   **Required Environment Variables:**

   ```
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/ngoma-db?schema=public"

   # JWT Authentication
   JWT_SECRET="your-jwt-secret-key"
   JWT_EXPIRATION="1d"

   # Web3 Configuration
   WEB3_PROVIDER_URL="https://mainnet.infura.io/v3/your-infura-project-id"
   NFT_CONTRACT_ADDRESS="0x..."

   # App Configuration
   FRONTEND_URL="http://localhost:3000"
   BACKEND_URL="http://localhost:4000"
   ```

## Database Setup

1. **Create PostgreSQL Database:**

   - Access your PostgreSQL command line:
     ```bash
     psql -U postgres
     ```
   - Create a new database:
     ```sql
     CREATE DATABASE "ngoma-db";
     ```
   - Exit PostgreSQL command line:
     ```
     \q
     ```

2. **Install Prisma CLI:**

   ```bash
   cd backend
   npm install prisma --save-dev
   npm install @prisma/client
   cd ..
   ```

   These commands install the Prisma CLI and Prisma Client as development dependencies in the backend.

3. **Configure Prisma Client:**

   - Ensure the `DATABASE_URL` environment variable is correctly configured in your `.env.development` file to point to your PostgreSQL database.
   - Example: `DATABASE_URL="postgresql://username:password@localhost:5432/ngoma-db?schema=public"`

   **Note**: Replace `username` and `password` with your PostgreSQL credentials.

4. **Run Prisma Migrations:**

   ```bash
   cd backend
   npx prisma migrate dev --name init
   cd ..
   ```

   This command will:

   - Create a new migration directory in `backend/prisma/migrations`.
   - Generate SQL migration files based on your `schema.prisma`.
   - Apply the migrations to your PostgreSQL database, creating the database schema.

5. **Generate Prisma Client:**

   ```bash
   cd backend
   npx prisma generate
   cd ..
   ```

   This command generates the Prisma Client based on your `schema.prisma` and makes it available for use in your backend application to interact with the database.

6. **Seed Database (Optional):**
   If seed data is available, you can populate the database with initial data using:
   ```bash
   cd backend
   npx prisma db seed
   cd ..
   ```
   This will execute the seed script defined in your `package.json` to insert initial data like admin users, test content, etc.

## Starting the Development Servers

1. **Start Backend Development Server:**

   ```bash
   cd backend
   npm run start:dev
   ```

   This will start the NestJS backend server with hot-reload enabled.

2. **Start Frontend Development Server (in a new terminal):**

   ```bash
   npm run dev
   ```

   This will start the Next.js frontend development server.

3. **Verify Setup:**
   - Navigate to `http://localhost:3000` in your browser to access the frontend
   - The backend API should be available at `http://localhost:4000`
   - Verify database connection by checking API responses

## Troubleshooting Common Setup Issues

1. **Database Connection Issues:**

   - Verify PostgreSQL is running with `pg_isready`
   - Check your database credentials in the connection string
   - Ensure the database exists and is accessible

2. **Dependency Issues:**

   - Try removing `node_modules` and reinstalling with `npm ci`
   - Check for Node.js version compatibility issues

3. **Prisma Migration Errors:**
   - If migrations fail, check the Prisma schema for errors
   - Reset database with `npx prisma migrate reset` (caution: this will delete all data)

## Next Steps

Once the setup is complete, you can proceed to the [Backend Implementation Guide](backend_guide.md) to implement the server-side logic.

## Reference Diagrams

- [Database Schema Overview](../diagrams/database-schema.md) - Visual representation of the database structure
- [Project Architecture](../NGOMA_IMPLEMENTATION_GUIDE.md#project-architecture) - Overall project architecture
