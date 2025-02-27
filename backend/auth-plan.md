# Backend Auth Plan

## Modules

- **AuthModule:**
  - Core module responsible for authentication and authorization.
  - Handles JWT token generation, validation, and refresh.
  - Provides guards for route protection.
- **UsersModule:**
  - Handles user-related operations specifically for authentication.
  - Manages user profiles, credentials, and account data.
- **RolesModule (Optional, if RBAC is implemented):**
  - Handles role-based access control.
  - Manages role assignment, verification, and permission mapping.
- **SecurityModule (Potentially):**
  - Could contain utility functions and configurations related to security.
  - JWT secrets and configuration.
  - Password hashing and validation utilities.

## Services

- **AuthService:**
  - `login(credentials)`: Handles user login and authentication.
  - `verifyToken(token)`: Validates JWT tokens.
  - `refreshToken(refreshToken)`: Generates new access tokens.
  - `resetPassword(token, newPassword)`: Handles password reset using token (optional).
- **UserService (Auth related methods):**
  - `getUserByEmail(email)`: Retrieves user by email for login.
  - `createUser(userData)`: Creates a new user account (if self-registration is enabled).
  - `updatePassword(userId, password)`: Updates user password securely.
- **RolesService (Optional, if RBAC is implemented):**
  - `getRoles()`: Gets all available roles.
  - `getRole(roleId)`: Gets details about a specific role.
  - `getUserRoles(userId)`: Retrieves roles for a given user.
  - `createRole(roleData)`: Creates a new role (admin function).
  - `updateRole(roleId, roleData)`: Updates a role (admin function).
  - `deleteRole(roleId)`: Deletes a role (admin function).

## Controllers

- **AuthController:**
  - `POST /auth/register`: Register a new user (if self-registration is enabled).
  - `POST /auth/login`: Authenticate user and generate tokens.
  - `POST /auth/refresh`: Refresh access token.
  - `POST /auth/logout`: Invalidate current token (if server-side invalidation is implemented).
  - `POST /auth/forgot-password`: Initiate password reset flow.
  - `POST /auth/reset-password`: Complete password reset using token.
- **UsersController (Auth related endpoints):**
  - `GET /users/me`: Get current authenticated user's profile.
  - `PATCH /users/me`: Update current user's profile.
  - `PUT /users/me/password`: Update current user's password.
- **RolesController (Optional, if RBAC is implemented):**
  - `GET /roles`: Get all roles (admin only).
  - `POST /roles`: Create a new role (admin only).
  - `GET /roles/:id`: Get role details (admin only).
  - `PUT /roles/:id`: Update a role (admin only).
  - `DELETE /roles/:id`: Delete a role (admin only).
  - `GET /users/:id/roles`: Get roles for a specific user (admin only).
  - `PUT /users/:id/roles`: Update roles for a specific user (admin only).

## Guards & Decorators

- **JwtAuthGuard:**
  - Protects routes that require authentication.
  - Validates JWT access tokens.
  - Extracts user information from token.
- **RolesGuard:**
  - Works in conjunction with a `@Roles()` decorator.
  - Verifies that authenticated user has required role(s) to access a route.
- **RefreshTokenGuard:**
  - Specialized guard for the token refresh endpoint.
  - Validates refresh tokens.
- **Custom Decorators:**
  - `@Public()`: Marks a route as publicly accessible (no authentication required).
  - `@Roles(...roles)`: Specifies which roles can access a route.
  - `@CurrentUser()`: Extracts current user from request object for use in controllers.

## JWT Token Strategy

- **Access Token:**
  - Short-lived (15-60 minutes).
  - Contains user ID, email, and roles.
  - Used for API authentication.
- **Refresh Token (Optional):**
  - Long-lived (1-7 days).
  - Used only to obtain new access tokens.
  - Securely stored and transmitted.
  - Can be revoked to force re-authentication.

## Security Considerations

- **Password Hashing:**
  - Use bcrypt with appropriate salt rounds (10-12 recommended).
  - Never store plain text passwords.
- **Rate Limiting:**
  - Implement rate limiting for sensitive endpoints (login, register, password reset).
  - Prevent brute force attacks.
- **Token Security:**
  - Store JWT secret securely (environment variables, secrets manager).
  - Consider token rotation for production.
  - Implement token blacklisting for critical security situations.
- **Input Validation:**
  - Validate all inputs with class-validator.
  - Implement strict email and password policies.
- **CORS Configuration:**
  - Configure CORS to allow only trusted origins.
  - Use appropriate credentials settings.

## Authentication Flow

### Registration Flow

1. Client sends registration data (email, password, etc.).
2. Server validates input data.
3. Server checks if email already exists.
4. If email is unique, password is hashed securely.
5. New user record is created in the database.
6. Authentication tokens are generated and returned.
7. Client stores tokens securely.

### Login Flow

1. Client sends login credentials (email, password).
2. Server locates user by email.
3. Server verifies password hash.
4. If authentication succeeds, tokens are generated.
5. Tokens are returned to the client.
6. Client stores tokens for future requests.

### Access Protected Resources Flow

1. Client includes access token in Authorization header.
2. Server validates token signature and expiration.
3. If token is valid, user information is extracted.
4. Request is passed to the controller with user data.
5. Any role-based authorization is performed.
6. If authorized, the requested resource is returned.

### Token Refresh Flow

1. Client detects expiring/expired access token.
2. Client sends refresh token to refresh endpoint.
3. Server validates refresh token.
4. If valid, new access token (and optionally new refresh token) is generated.
5. New tokens are returned to client.
6. Client updates stored tokens.

## Implementation Notes

- Use Passport.js strategy patterns for authentication.
- Implement token refresh mechanism to improve user experience.
- Consider implementing two-factor authentication for additional security.
- Log authentication events for security auditing.
- Provide clear error messages without exposing sensitive information.

## Testing Strategy

- Unit test authentication service methods.
- Test JWT validation and generation.
- Test guards with mock requests.
- Integration test the complete authentication flow.
- Test edge cases like expired tokens, invalid credentials.
- Test rate limiting functionality.

This comprehensive authentication plan will provide secure, robust authentication and authorization for the Ngoma platform, implementing industry best practices while maintaining flexibility for future enhancements.
