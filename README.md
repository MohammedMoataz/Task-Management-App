# Task Management App

This repository contains two main directories: `server` and `client`. The `server` directory is a Nest.js project that handles the server-side logic, while the `client` directory is a Next.js project that handles the client-side logic.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)

## Environment Variables

### Server

Create a `.env` file in the `server` directory and add the following environment variables:
   ```bash
   # NODE APP ENVIRONMENT VARIABLES
   NODE_ENV=development
   PORT=your-server-port
   
   # DATABASE CONNECTION ENVIRONMENT VARIABLES
   APP_NAME=task
   DB_HOST=localhost
   DB_NAME=task-management
   DB_USER=mohammedmoataz
   DB_PASSWORD=vbaP2JwBpqAHDKUe
   
   # SECURITY
   ACCESS_TOKEN_SECRET=your-access-token-secret
   REFRESH_TOKEN_SECRET=your-refresh-token-secret
   SALT_ROUNDS=your-salt-rounds
   ```

## Running the Server

1. Navigate to the `server` directory:
   ```bash
   cd server

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install

3. Start the server:
   ```bash
   npm run start:dev
   # or
   yarn start:dev

The server should now be running on http://localhost:[SERVER_PORT].

## Running the Client

1. Navigate to the client directory:
   ```bash
   cd client

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install

3. Start the client:
   ```bash
   npm run dev
   # or
   yarn dev

The client should now be running on http://localhost:3000.

## Additional Scripts

### Server
   - Build: npm run build or yarn build
   - Start: npm run start or yarn start
   - Test: npm run test or yarn test

### Client
   - Build: npm run build or yarn build
   - Start: npm run start or yarn start
   - Lint: npm run lint or yarn lint

### Contributing
If you would like to contribute to this project, please follow the standard GitHub workflow:

 1. Fork the repository.
 2. Create a new branch (git checkout -b feature/your-feature-name).
 3. Make your changes.
 4. Commit your changes (git commit -m 'Add some feature').
 5. Push to the branch (git push origin feature/your-feature-name).
 6. Open a pull request.
