# Submission Management Backend Server (Slidely Task 2 - BackEnd)

This Express server provides APIs for managing submissions including creation, retrieval, deletion, editing, and searching based on email. Submissions are stored in a JSON file (`db.json`).

## Table of Contents

- [Features](#features)
- [Endpoints](#endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

## Features

- **Submit a Form:**
  - POST `/submit` - Adds a new submission to the database.
  
- **Retrieve Submissions:**
  - GET `/read_all` - Retrieves all submissions from the database.
  
- **Delete a Submission:**
  - DELETE `/delete/:index` - Deletes a submission by index.
  
- **Edit a Submission:**
  - PUT `/edit/:index` - Updates a submission by index.
  
- **Search Submissions by Email:**
  - GET `/search?email=:email` - Retrieves submissions matching the provided email.

## Endpoints

- `/ping` - GET request that always returns `true`.
- `/submit` - POST request to submit a new form entry.
- `/read_all` - GET request to retrieve all form submissions.
- `/delete/:index` - DELETE request to delete a submission by index.
- `/edit/:index` - PUT request to edit a submission by index.
- `/search?email=:email` - GET request to search submissions by email.

## Getting Started

### Prerequisites

To run this server, you need:

- Node.js and npm installed on your machine.
- Knowledge of TypeScript (optional but recommended).

### Installation

1. **Clone the repository:**

   ```bash
   git clone [(https://github.com/Vishwa-03/Slidely-task-2-backend)]
   cd backend-repository
### Usage
 - npm start
