# IAM PHP Demo

A full-stack Identity and Access Management (IAM) demonstration
application showcasing modern authentication and authorization using
**OAuth 2.1**, **OpenID Connect (OIDC)**, **Okta**, **React**,
**Symfony**, and **Slim**.

The application demonstrates a modern authentication architecture in
which a React single-page application authenticates users through Okta,
receives JWT tokens, and securely accesses protected PHP APIs. The user
interface dynamically adapts based on the authenticated user's
permissions, providing a practical example of role-based access control
(RBAC).

------------------------------------------------------------------------

# Features

## Authentication

-   OAuth 2.1 Authorization Code Flow with PKCE
-   OpenID Connect (OIDC)
-   Okta Identity Provider
-   Secure login and logout
-   JWT ID, Access, and Refresh Tokens
-   Automatic authentication state management

## Authorization

-   Role-Based Access Control (RBAC)
-   Permission-aware navigation
-   Protected routes
-   Resource-level authorization
-   UI automatically adapts to the authenticated user's permissions

## Resource Management

-   Widget CRUD operations
-   Doohickey CRUD operations
-   Permission-controlled actions
-   Search functionality
-   Responsive user interface

## Token Inspection

Inspect the claims contained within the authenticated user's:

-   ID Token
-   Access Token

This page provides a convenient way to understand the information
returned by OpenID Connect and how JWT claims are used throughout the
application.

------------------------------------------------------------------------

# System Architecture

``` text
                +--------------------+
                |     React SPA      |
                +---------+----------+
                          |
                          | OAuth 2.1 / OIDC
                          |
                          v
                +--------------------+
                |       Okta         |
                | Identity Provider  |
                +---------+----------+
                          |
                          | JWT Access Token
                          |
                          v
                +--------------------+
                |  Symfony IAM API   |
                +---------+----------+
                          |
                          | Protected Requests
                          |
                          v
                +--------------------+
                | Slim Resource API  |
                +---------+----------+
                          |
                          v
                      MariaDB
```

------------------------------------------------------------------------

# Technology Stack

## Frontend

-   React
-   TypeScript
-   Chakra UI
-   React Router
-   TanStack Query
-   Vite

## Authentication

-   Okta
-   OAuth 2.1
-   OpenID Connect
-   JWT

## Backend

### IAM Server

-   PHP
-   Symfony

### Resource Server

-   PHP
-   Slim Framework

## Database

-   MariaDB

## Infrastructure

-   Docker
-   Docker Compose

------------------------------------------------------------------------

# Getting Started

## Prerequisites

The project is fully containerized using Docker Compose.

If Docker is not already installed:

### Windows

Install Docker Desktop:

https://www.docker.com/products/docker-desktop/

### macOS

Install Docker Desktop:

https://www.docker.com/products/docker-desktop/

### Linux

Install Docker Engine:

https://docs.docker.com/engine/install/

After installation, verify Docker is available:

``` bash
docker --version
docker compose version
```

------------------------------------------------------------------------

## Clone the Repository

``` bash
git clone https://github.com/elbucho/iam-php-demo.git
cd iam-php-demo
```

------------------------------------------------------------------------

## Start the Application

From the root of the repository:

``` bash
docker compose up
```

Docker Compose will automatically start:

-   React frontend
-   Symfony IAM server
-   Slim resource server
-   MariaDB database
-   Redis caching server

When startup is complete, open your browser to:

``` text
http://localhost:3000
```

------------------------------------------------------------------------

## Stopping the Application

``` bash
docker compose down
```

------------------------------------------------------------------------

# Demo Accounts

  | Account          | Permissions         | Email                                |
  |------------------|---------------------|--------------------------------------|
  | Widget Viewer    | View widgets        | mjhinkson+widget_viewer@gmail.com    |
  | Widget Editor    | Full widget CRUD    | mjhinkson+widget_editor@gmail.com    |
  | Doohickey Viewer | View doohickeys     | mjhinkson+doohickey_viewer@gmail.com |
  | Doohickey Editor | Full doohickey CRUD | mjhinkson+doohickey_editor@gmail.com |

The password for every account is

```SecurePass1234!```

Each account demonstrates how the application's navigation, routes, and
available actions automatically adapt based on the authenticated user's
permissions.

------------------------------------------------------------------------

# Concepts Demonstrated

-   OAuth 2.1 Authorization Code Flow with PKCE
-   OpenID Connect (OIDC)
-   JWT Authentication
-   Role-Based Access Control (RBAC)
-   Permission-aware React UI
-   Secure PHP APIs
-   Separation of authentication and resource servers
-   Modern React architecture
-   Dockerized full-stack development

------------------------------------------------------------------------

# Future Enhancements

-   User administration
-   Permission management UI
-   Audit logging
-   Refresh token rotation
-   Token revocation
-   Multi-factor authentication
-   Automated integration testing
-   CI/CD pipeline
-   Kubernetes deployment

------------------------------------------------------------------------

# License

This project was created as a portfolio demonstration and learning
exercise. It is intended to showcase modern authentication,
authorization, and full-stack application architecture using React and
PHP technologies.
