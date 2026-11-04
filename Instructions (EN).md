🚲

## M1 web-dev exam - EN

## Project Overview

The Bikez.ai store uses an application to manage its customers and track their bicycle purchases.

The store now wants to expand its online business. Before launching an e-commerce store, its software needs to evolve gradually to handle larger lists and support bicycle catalog management.

You will work on an existing codebase consisting of a REST API and a web application.

## Guidelines

- The exam must be completed individually.

- Using AI to write code is allowed. You remain responsible for the code you submit and must be able to explain it.

- Adding new dependencies is prohibited.

- Use only the tools and concepts covered in class.

- Follow the project's structure and conventions. Existing features must continue to work.

## How to submit your project

You must create a public Git repository and push your work to it before the end of the session.

Then email the link to your Git repository to gerald.gallet@ext.junia.com before leaving. [URL 🔗](mailto:gerald.gallet@ext.junia.com)

## Getting Started

Exam repository: https://github.com/Iberos/m1-web-exam [URL 🔗](https://github.com/Iberos/m1-web-exam)

Instructions for installation, database initialization, and starting the application will be provided in the repository's README.

## Technologies Used

## Backend

| Technology | Role |
| --- | --- |
| TypeScript | Language used to develop the API |
| NestJS | Application organization into modules and HTTP route handling |
| TypeORM | Database access and mapping between entities and tables |
| SQLite and better-sqlite3 | Local database and the driver used to access it |
| class-validator | Validation of data received in DTOs |
| class-transformer | Transformation of incoming objects into DTO instances |
| Faker | Generation of sample data |
| Vitest and Supertest | Automated tests and HTTP route tests |

The backend is organized into modules, with controllers, services, repositories, DTOs, domain models, and persistence entities. The customers module provides a working example. The bikes module contains


the bicycle entity and classes to complete.

## Frontend

| Technology | Role |
| --- | --- |
| TypeScript | Language used to develop the interface |
| React | Component building and interface state management |
| Vite | Development server and application build tooling |
| TanStack Router Navigation and URL-to-page mapping |   |
| Ant Design and its icons UI components: buttons, forms, modal dialogs, etc. |   |
| Axios | HTTP calls to the API |
| Day.js | Date handling, particularly in forms |

A bicycle represents a catalog model, rather than a unique physical item. A sale links a customer to a bicycle model and records details including the quantity, date, and unit price paid.

## Existing Features

## REST API

*The API is available locally at: http://localhost:3000 [URL 🔗](http://localhost:3000/)*

| Method | Route | Description |
| --- | --- | --- |
| GET | /customers | Unpaginated customer list |
| POST | /customers | Create a customer |
| GET | /customers/:id | Get customer details |
| PATCH | /customers/:id | Partially update a customer |
| DELETE | /customers/:id | Delete a customer and their sales |
| GET | /customers/:id/bikes | List the customer's sales, including the associated bicycles |
| POST | /customers/:id/bikes | Record a sale for the customer |

Creating a sale requires bikeId and quantity . The date and unit price are determined by the server.

## Web Application

The frontend is available by default at: http://localhost:5173 [URL 🔗](http://localhost:5173/)

If this port is already in use, use the address displayed by Vite in the terminal at startup.

| Page | Features |
| --- | --- |
| / | Home page and navigation |
| /customers | Customer list, creation in a modal dialog, and deletion with confirmation |
| /customers/:customerId | View and edit personal information, contact details, and address; display purchases |

There is currently no interface for managing the bicycle catalog.

## Exercise 1 — Customer Pagination

The customer list is becoming too large to load in full. Update GET /customers to support two query parameters:

GET /customers?page=2&limit=10


- page specifies the page number, starting at 1. Its default value is 1.

- limit specifies the maximum number of customers per page. Its default value is 10.

- Both parameters must be strictly positive integers.

- limit must not exceed 50.

- An invalid value must result in a 400 response.

The response must follow the structure below, illustrated here with an empty list:

```
{
"totalCount": XXX,
"customers": []
}
```

A page beyond the last page returns an empty list while retaining the pagination information.

Also update the customer page to use this response and allow navigation between pages.

## Exercise 2 — Bicycle Catalog Management

Complete the NestJS bikes module to support viewing, creating, updating, and deleting bicycle models.

## Expected API

The list uses the same pagination parameters, rules, and metadata as Exercise 1. The property containing the results is named bikes .

Use the fields and constraints defined in the provided entity. Incoming data must be validated, and requests for nonexistent resources must result in a 404 response.

To preserve sales history, deleting a bicycle already associated with a sale must be rejected with a 409 response.

## Expected Interface

Update the frontend to support:

- Browsing the catalog with navigation between pages.

- Viewing bicycle details.

- Adding and updating a bicycle.

- Deleting a bicycle with confirmation.


These features must be accessible from the application's navigation and use the new API routes. The presentation must remain consistent with the existing screens.
