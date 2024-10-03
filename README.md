# Course Management App

Welcome to the Course Management App! This project is a full-stack web application built with **React** for the frontend, **NestJS** for the backend, and **MongoDB** for the database. It allows users to log in, manage courses, and efficiently handle large datasets with pagination and indexing.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)

## Features

- User authentication with JWT for secure login
- Ability to add new courses with details: title, description, teacher, and schedule
- Display of all courses in a list, with detailed views for each course
- Search functionality to filter courses by title or instructor
- Pagination to handle large datasets efficiently

## Technologies

- **Frontend:** React
- **Backend:** NestJS
- **Database:** MongoDB
- **Deployment:** Docker

## Getting Started

To run this project locally, follow these steps:

### Recommended Setup: Docker

I highly recommend using Docker for easier deployment and management of the application.

### Installing Docker

1. Install Docker by following the official guide: [Docker Installation Guide](https://docs.docker.com/get-docker/).
2. Verify the installation by running:

   ```bash
    docker --version
    ```

### Environment Variables

Before running the application, create the following .env files:

1. Frontend
    ```env
    REACT_APP_API_URL="http://localhost:3001"
    ```
2. backend

    ```env
    MONGO_DB_URI='mongodb://mongodb:27017/course_management'
    JWT_SECRET="yourSecretKey"
    FRONTEND_URL="http://localhost:3000"
    ```

### Running the Application with Docker

1. Clone the repository:

    ```bash
    git clone https://github.com/fahiid33/course-management-app.git
    cd course-management-app
    ```

3. Build and run the application using Docker Compose:
    ```bash
    docker-compose up --build
    ```
This will start the backend on http://localhost:3001 and the frontend on http://localhost:3000.

### Handling Large Datasets: Pagination & Indexing

The application efficiently manages large datasets (over 10,000 courses) using:

- Pagination: Data is divided into pages, allowing users to navigate through courses without slow loading times.
- How :
    1. in the backend :
    . by using skip() and limit() methods in mongodb to fetch courses based on the page with a limit (10 courses).
    2. in the frontend:
    . by tracking the state of currentPage to always render the limit (10 courses) by page.
- MongoDB Indexing: Indexes are applied to key fields to ensure quick retrieval of data, enhancing the search and filter functionality.

### How to Use the App

New users will be prompted to the login page. If they haven't registered yet, they can click the button on the login page to navigate to the registration page. After successful registration, users are redirected to the home page, where they can view, create, and search for courses by title or instructor. Pagination is implemented for search results when dealing with large datasets. Clicking on a course will display more details, including the instructor and schedule.



