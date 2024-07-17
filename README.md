# Express.js Microservices Template

## Overview

This template provides a structured foundation for building microservices in our system architecture. It enforces a modular and scalable approach, offering a clear organization for core functionalities and feature-specific components.

## Template Structure

### Root Directory

- **core/:** Contains essential modules and configurations shared across features.

- **features/:** Organized by individual features, each having its own directory structure.

  - **exampleFeature/:** An example feature.

    - **data/:** Manages data-related components.

      - **types/:** Defines types for data models.
        - **exampleType.type.ts**
      - **models/:** Defines data models.
        - **exampleModel.model.ts**

    - **logic/:** Houses business logic for the feature.

      - **handlers/:** Handles HTTP requests.
        - **exampleHandler.handler.ts**
      - **middlewares/:** Contains middleware functions.
        - **exampleMiddleware.middleware.ts**
      - **utils/:** Includes utility functions.
        - **exampleUtil.util.ts**

    - **exampleFeature.routes.ts:** Defines routes specific to the feature.

- **index.ts:** The entry point for the microservice.

- **router.ts:** Manages routing logic for the microservice.

- **env.ts:** Centralized environment configuration.

- **database.ts:** Handles database connections.

- **.env:** Configuration file for environment variables.

- **package.json and package-lock.json:** Manage dependencies and package details.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 20.6.0 or higher)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Create a new repository using this template.
2. Clone the repository to your local machine.
3. Install dependencies by running `npm install` in the root directory.
4. Create a `.env` file in the root directory and add the following environment variables:

   - `PORT`: The port number for the microservice.
   - `LOGS_PATH`: The path for the log files.
   - `NODE_ENV`: The environment for the microservice (e.g. `development`, `production`).
   - `MONGO_URI`: The URI for the MongoDB database.

5. Run `npm run serve` to start the microservice in development mode.

### Usage

- Run `npm run build` to build the microservice for production.
- Run `npm run start` to start the microservice in production mode.

## Notes

- This template uses `--env-file` to load environment variables from `.env` files, which is a Node.js feature that is added in version 20.6.0. If you are using an older version of Node.js, you will need to upgrade to the latest stable version or manually load environment variables from `.env` files.

## License

This project is licensed under the [MIT](LICENSE) License.
