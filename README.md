# NestJS React Microservice Template

This is a template project that combines a microservice architecture using NestJS with a frontend in React. It leverages
Docker to containerize services and PostgreSQL as the database. This template is designed to be scalable, easy to
maintain, and adaptable to various applications.

## Features

- **Microservices architecture** powered by NestJS
- **React frontend** for the client-side interface
- **PostgreSQL** as the database
- **Dockerized environment** for consistent development and deployment
- **Scalable and modular** architecture ready for integration of more microservices
- **Environment-specific configuration** using `.env` files

## Prerequisites

Make sure you have the following tools installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en/download/) (for local development)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Installation

Follow these steps to set up and run the project:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/kusodu-micro.git
cd kusodu-micro
```

### 2. Set up the environment variables

Create a `.env` file in the root directory for your PostgreSQL and pgAdmin configuration:

```bash
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
```

Additionally, create `.env` files for each microservice in their respective directories:

#### Gateway Microservice (`/gateway/.env`)

```bash
PORT=
```

#### Auth Microservice (`/auth/.env`)

```bash
PORT=
```

### 3. Build and run the containers

To spin up the containers, run the following command:

```bash
docker-compose up --build
```

This will set up and run all the services, including PostgreSQL, pgAdmin, and the microservices.

### 4. Access the services

- **React App**: Open your browser and navigate to `http://localhost:<React_App_Port>` (usually specified in your React
  app config).
- **pgAdmin**: Access pgAdmin at `http://localhost:5050` and log in using the email and password you specified in the
  `.env` file.
- **API Gateway**: Interact with the API through the gateway at `http://localhost:<Gateway_Port>`.
- **Auth Service**: Access the authentication microservice at `http://localhost:<Auth_Port>`.

## Architecture Overview

The project is structured as follows:

- **/gateway**: The main entry point for the API, handling routing and communication between microservices.
- **/auth**: The authentication microservice responsible for user management and authentication logic.
- **/frontend**: The React application that interacts with the backend services.

## Running in Development Mode

To start the services in development mode, you can use:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

This allows for hot reloading and faster feedback during development.

## Technologies Used

- **NestJS** for building the backend microservices
- **React** for the frontend application
- **PostgreSQL** as the database
- **pgAdmin** for database management
- **Docker** to containerize and manage the services
- **RabbitMQ** (optional, planned for future use as a message broker)

## Future Plans

- Add RabbitMQ integration for message-based communication between microservices.
- Implement additional microservices, such as user management and notifications.
- Enhance the React app with more features and improved UI/UX.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License.
