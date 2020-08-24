# Frontend Templates and Mock Customer Data
 
This repo contains a mock API server, which will serve customers and HTML templates to your frontend app.

## Installation

To install the API server and its dependencies, run this command:

```npm install```

## Start the Server

To run the server, run this command: 

```npm run start-server```

The output should display the URL of the running server (e.g. http//localhost:3000).

## Usage

Once the server is running, you can create, retrieve, update, and delete customers and HTML templates using the server's API endpoints. For example:

Retrieve templates : `GET /api/templates`

Retrieve a template by ID : `GET /api/templates/:id`

Save a new template: `POST /api/templates`

Update an existing template: `PUT /api/templates/:id` 

Retrieve customers : `GET /api/customers`

Retrieve a customer by ID : `GET /api/customers/:id`

Retrieve a customer by email : `GET /api/customers?email=:email`

Filter users by partial email : `GET /api/customers?email_like=:partial_email`

See the json-server documentation for a full usage guide. 
