# Authentication Flow Diagram

This document visualizes the authentication flow for the Ngoma platform, covering user registration, login, token management, and protected resource access.

## Registration Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant AuthAPI
    participant Database

    User->>Frontend: Fill registration form
    Frontend->>Frontend: Validate form input
    Frontend->>AuthAPI: POST /auth/register
    AuthAPI->>AuthAPI: Validate request data
    AuthAPI->>Database: Check if email exists
    Database-->>AuthAPI: User exists? (yes/no)

    alt Email already exists
        AuthAPI-->>Frontend: 409 Conflict
        Frontend-->>User: Email already registered
    else Email available
        AuthAPI->>AuthAPI: Hash password
        AuthAPI->>Database: Create user record
        Database-->>AuthAPI: User created
        AuthAPI->>AuthAPI: Generate JWT token
        AuthAPI-->>Frontend: 201 Created (user data + token)
        Frontend->>Frontend: Store token in localStorage
        Frontend->>Frontend: Update auth context
        Frontend-->>User: Registration successful
    end
```

## Login Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant AuthAPI
    participant Database

    User->>Frontend: Fill login form
    Frontend->>Frontend: Validate form input
    Frontend->>AuthAPI: POST /auth/login
    AuthAPI->>Database: Find user by email

    alt User not found
        Database-->>AuthAPI: User not found
        AuthAPI-->>Frontend: 401 Unauthorized
        Frontend-->>User: Invalid credentials
    else User found
        Database-->>AuthAPI: Return user data
        AuthAPI->>AuthAPI: Verify password

        alt Invalid password
            AuthAPI-->>Frontend: 401 Unauthorized
            Frontend-->>User: Invalid credentials
        else Valid password
            AuthAPI->>AuthAPI: Generate JWT token
            AuthAPI-->>Frontend: 200 OK (user data + token)
            Frontend->>Frontend: Store token in localStorage
            Frontend->>Frontend: Update auth context
            Frontend-->>User: Login successful
            Frontend->>Frontend: Redirect to requested page
        end
    end
```

## Token Verification & Protected Resource Access

```mermaid
sequenceDiagram
    participant Frontend
    participant API
    participant JWTMiddleware
    participant ResourceController

    Frontend->>API: Request with Authorization header
    API->>JWTMiddleware: Pass request
    JWTMiddleware->>JWTMiddleware: Extract token from header

    alt No token or malformed
        JWTMiddleware-->>Frontend: 401 Unauthorized
    else Token present
        JWTMiddleware->>JWTMiddleware: Verify token signature

        alt Invalid signature
            JWTMiddleware-->>Frontend: 401 Unauthorized
        else Valid signature
            JWTMiddleware->>JWTMiddleware: Check token expiration

            alt Token expired
                JWTMiddleware-->>Frontend: 401 Unauthorized
            else Token valid
                JWTMiddleware->>JWTMiddleware: Decode token payload
                JWTMiddleware->>ResourceController: Pass request with user data
                ResourceController->>ResourceController: Check user permissions

                alt Insufficient permissions
                    ResourceController-->>Frontend: 403 Forbidden
                else Authorized
                    ResourceController->>ResourceController: Process request
                    ResourceController-->>Frontend: 200 OK (requested resource)
                end
            end
        end
    end
```

## Token Refresh Flow

```mermaid
sequenceDiagram
    participant Frontend
    participant AuthAPI

    Frontend->>Frontend: Detect token expiring soon
    Frontend->>AuthAPI: POST /auth/refresh

    alt Invalid or expired refresh token
        AuthAPI-->>Frontend: 401 Unauthorized
        Frontend->>Frontend: Clear auth data
        Frontend->>Frontend: Redirect to login
    else Valid refresh token
        AuthAPI->>AuthAPI: Generate new access token
        AuthAPI-->>Frontend: 200 OK (new tokens)
        Frontend->>Frontend: Update stored tokens
    end
```

## Logout Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant AuthAPI

    User->>Frontend: Click logout
    Frontend->>AuthAPI: POST /auth/logout
    AuthAPI-->>Frontend: 200 OK
    Frontend->>Frontend: Remove token from localStorage
    Frontend->>Frontend: Clear auth context
    Frontend->>Frontend: Redirect to home/login
    Frontend-->>User: Logged out successfully
```

## Role-Based Access Control

```mermaid
flowchart TD
    A[User Request] --> B{Has Valid JWT?}
    B -->|No| C[Return 401 Unauthorized]
    B -->|Yes| D{Check User Role}

    D -->|Admin| E[Full Access]
    D -->|Artist| F[Artist Dashboard Access]
    D -->|Fan| G[Limited Access]

    E --> H{Endpoint Permission}
    F --> H
    G --> H

    H -->|Authorized| I[Process Request]
    H -->|Unauthorized| J[Return 403 Forbidden]
```

## Security Considerations

### Token Management

- Access tokens are short-lived (expires in 15-60 minutes)
- Tokens are stored in memory or secure storage, not in cookies
- HTTPS is enforced for all API requests

### Password Security

- Passwords are hashed using bcrypt with appropriate salt rounds
- Password strength requirements are enforced on registration
- Rate limiting is applied to authentication endpoints

### Session Management

- JWT is stateless, but server can still invalidate tokens if needed
- User sessions can be terminated from admin panel
- Session activity is logged for security monitoring

This authentication system combines modern JWT-based authentication with role-based access control to provide secure, scalable user authentication for the Ngoma platform.
