# PhD Clinic Backend

## Introduction

The PhD Clinic Backend facilitates CS PhD students from all over the country to obtain inputs and advice from expert mentors located in premier academic institutions and industry. This backend service manages the mentors and their details, enabling CRUD operations through a RESTful API.

## Features

- Create, Read, Update, and Delete (CRUD) operations for mentors.
- Secure and scalable backend architecture using Node.js and Express.
- MongoDB for data storage.

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)
- MongoDB (>= 4.x)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/phd-clinic-backend.git
    cd phd-clinic-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    MONGODB_URI=mongodb://localhost:27017/phd_clinic
    PORT=5000
    ```

## Running the Server

1. Start the MongoDB server. If you have MongoDB installed locally, you can start it using:

    ```bash
    mongod
    ```

2. Start the Node.js server:

    ```bash
    npm start
    ```

    or

    ```bash
    yarn start
    ```

3. The server should now be running on `http://localhost:5000`.

## API Endpoints

### Mentor Endpoints

- **Create a new mentor**

    ```http
    POST /api/mentors
    ```

    **Request Body:**

    ```json
    {
      "name": "John Doe",
      "description": "Expert in Artificial Intelligence",
      "website": "http://johndoe.com",
      "affiliation": "IIT Delhi",
      "meeting_link": "http://meet.johndoe.com"
    }
    ```

- **Get all mentors**

    ```http
    GET /api/mentors
    ```

- **Get a mentor by ID**

    ```http
    GET /api/mentors/:id
    ```

- **Update a mentor by ID**

    ```http
    PUT /api/mentors/:id
    ```

    **Request Body:**

    ```json
    {
      "name": "John Doe",
      "description": "Expert in Machine Learning",
      "website": "http://johndoe.com",
      "affiliation": "IIT Delhi",
      "meeting_link": "http://meet.johndoe.com"
    }
    ```

- **Delete a mentor by ID**

    ```http
    DELETE /api/mentors/:id
    ```

## Folder Structure

```bash
phd-clinic-backend/
├── controllers
│   └── mentorController.js
├── models
│   └── mentor.js
├── routes
│   └── mentorRoutes.js
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md