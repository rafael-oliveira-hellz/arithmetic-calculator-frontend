# Arithmetic Calculator

This is a web application for performing arithmetic calculations. It consists of a front-end built with Next.js and a back-end implemented in Java.

## Requirements

Ensure your environment meets the following requirements before starting:

- Node.js: v20 or higher
- npm: v8.x or higher (or Yarn v1.x)
- Next.js: v15
- Java: JDK 21
  Back-end server: Java application must be running to handle local API requests

## Installation

Clone the Repository
git clone https://github.com/rafael-oliveira-hellz/arithmetic-calculator-frontend

cd arithmetic-calculator-frontend

### Install Dependencies

Using npm:

```bash
npm install
```

or

using Yarn:

```bash
yarn install
```

## Environment Configuration

Create a .env file in the root directory of the project.

Add the following environment variables:

```bash
NEXT_PUBLIC_API_URL=http://localhost:${PORT}
```

`${PORT} is where your backend is running`

## Start the Front-end Server

To start the front-end development server, run:

```bash
npm run dev
```

or

```bash
yarn dev
```

The application will be accessible at http://localhost:3000.

## Start the Back-end Server

Ensure the Java back-end server is running:

- Navigate to your Java project directory.
- Build and run the Java application

## Build the application (if not already built)

```bash
mvn clean package
```

## Run the application

```bash
java -jar target/your-backend.jar
```

The back-end server will be accessible at http://localhost:${PORT}.

## Running Tests

If you have tests configured, you can run them using:

```bash
npm test
```

or

```bash
yarn test
```

## Technologies Used

### Front-end

- Next.js v15
- Tailwind CSS
- Chakra UI
- React.js

### Back-end:

- Java 21
- Spring Boot
- AWS Lambda
- AWS RDS PostgreSQL
- AWS API Gateway
