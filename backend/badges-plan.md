# Backend Badges Plan

## Modules

- **BadgesModule:**
    - Core module for badge management.
    - Includes services, controllers, and repositories for badge-related operations.
- **UsersModule:**
    - May be involved for associating badges with users (Fan entity).
    - Could include UserService for accessing user data.
- **EventsModule, AlbumsModule, TracksModule, MerchandiseModule (Potentially):**
    - May be involved if badges are awarded based on actions related to events, albums, tracks, or merchandise (e.g., "Listened to 10 albums" badge).
    - Would interact with respective services to check for badge awarding conditions.
- **NotificationModule:** (Potentially)
    - For sending notifications to users when they earn badges.
    - Would use NotificationService to send badge earned notifications.

## Services

- **BadgeService:**
    - `GetBadgeList()`: Get a list of all badges (admin function, with filtering/pagination).
    - `GetBadgeById(badgeId)`: Get badge details by ID.
    - `CreateBadge(badgeData)`: Create a new badge (admin function).
    - `UpdateBadge(badgeId, badgeData)`: Update badge details (admin function).
    - `DeleteBadge(badgeId)`: Delete a badge (admin function).
    - `AwardBadgeToUser(userId, badgeId)`: Award a badge to a user.
    - `GetUserBadges(userId)`: Get a list of badges earned by a user.
    - `GetBadgeAwardProgress(userId, badgeId)`: Get progress towards earning a specific badge (if badge criteria involves progress tracking).
    - `CheckBadgeCriteria(user, action)`: (Potentially) - Checks if a user meets the criteria for earning a badge based on an action they performed (e.g. track listened to, album purchased).
- **UserBadgeService:**
    - `GetUserBadgeList(userId)`: Get a list of user's badges.
    - `GetUserBadgeById(userBadgeId)`: Get details of a specific user badge.
    - `GrantBadge(userId, badgeId)`: Grants a badge to a user (admin or system function).
    - `RevokeBadge(userBadgeId)`: Revokes a badge from a user (admin or system function).
    - `CheckIfUserHasBadge(userId, badgeId)`: Checks if a user has earned a specific badge.

## Controllers

- **BadgeController:**
    - `GET /admin/badges`: `GetBadgeList` - Get list of all badges (admin only).
    - `GET /admin/badges/{badgeId}`: `GetBadgeById` - Get badge details (admin only).
    - `POST /admin/badges`: `CreateBadge` - Create a new badge (admin only).
    - `PUT /admin/badges/{badgeId}`: `UpdateBadge` - Update badge details (admin only).
    - `DELETE /admin/badges/{badgeId}`: `DeleteBadge` - Delete a badge (admin only).
    - `POST /badges/{badgeId}/award/{userId}`: `AwardBadgeToUser` - Award badge to user (admin or system function).

- **FanBadgeController:**
    - `GET /fan/badges`: `GetUserBadges` - Get list of badges earned by the logged-in fan (fan dashboard).
    - `GET /fan/badges/{badgeId}/progress`: `GetBadgeAwardProgress` - Get progress for a specific badge (fan dashboard).
    - `GET /users/{userId}/badges`: `GetUserBadgesAdmin` - Get list of badges earned by a user (admin function - for user management).

## Data Models

- **Badge (Prisma schema already defined):**
    - Extends existing Badge model in Prisma schema.
    - Define badge criteria (rules for awarding badges) here or in "Logic" section.
- **UserBadge (Prisma schema already defined):**
    - Extends existing UserBadge model in Prisma schema.
    - Stores relationship between users and badges they've earned.
    - Includes fields for award date, badge progress (if applicable).
- **BadgeAwardCriteria:** (Potentially, if badge awarding logic is complex and data-driven)
    - criteriaId (string, PK)
    - badgeId (FK to Badge)
    - criteriaType (enum: 'listenCount' | 'albumPurchaseCount' | 'eventAttendance' | 'custom')
    - criteriaValue (JSON or string to define criteria details)
    - ... other criteria metadata

## API Endpoints

- **Badge Management Endpoints (Admin only - under `/admin` prefix and BadgeController):**
    - `GET /admin/badges`: Get list of all badges.
        - **Method:** GET
        - **Response:** JSON array of Badge objects, paginated.
        - **Authentication:** Admin role required.
    - `GET /admin/badges/{badgeId}`: Get badge by ID.
        - **Method:** GET
        - **Request:** `badgeId` path parameter.
        - **Response:** JSON object of Badge details.
        - **Authentication:** Admin role required.
    - `POST /admin/badges`: Create new badge.
        - **Method:** POST
        - **Request:** JSON body with Badge creation data.
        - **Response:** 201 Created, Badge object.
        - **Authentication:** Admin role required.
    - `PUT /admin/badges/{badgeId}`: Update badge.
        - **Method:** PUT
        - **Request:** `badgeId` path parameter, JSON body with Badge update data.
        - **Response:** 200 OK, Updated Badge object.
        - **Authentication:** Admin role required.
    - `DELETE /admin/badges/{badgeId}`: Delete badge.
        - **Method:** DELETE
        - **Request:** `badgeId` path parameter.
        - **Response:** 204 No Content.
        - **Authentication:** Admin role required.
    - `POST /admin/badges/{badgeId}/award/{userId}`: Award badge to user (admin function).
        - **Method:** POST
        - **Request:** `badgeId` and `userId` path parameters.
        - **Response:** 200 OK, UserBadge object.
        - **Authentication:** Admin role required.

- **Fan Badge Endpoints (Fan Dashboard - under `/fan` prefix and FanBadgeController):**
    - `GET /fan/badges`: Get list of earned badges for logged-in fan.
        - **Method:** GET
        - **Response:** JSON array of UserBadge objects for the fan.
        - **Authentication:** Fan role required (JWT protected).
    - `GET /fan/badges/{badgeId}/progress`: Get badge award progress for logged-in fan.
        - **Method:** GET
        - **Request:** `badgeId` path parameter.
        - **Response:** JSON object with badge progress details (if applicable).
        - **Authentication:** Fan role required (JWT protected).

- **User Badge Endpoints (Admin only - under `/admin` prefix and FanBadgeController):**
     - `GET /admin/users/{userId}/badges`: Get list of badges earned by a specific user (admin function).
        - **Method:** GET
        - **Request:** `userId` path parameter.
        - **Response:** JSON array of UserBadge objects for the specified user.
        - **Authentication:** Admin role required.

## Logic

## Code Readability and Coding Standards

- **Code Style Guide:** Follow NestJS and general backend code style conventions.
- **Module Organization:** Keep modules focused and well-separated (BadgesModule, UsersModule, etc.).
- **Service Layer Abstraction:** Implement clear service interfaces and separate business logic from controllers and data access layers.
- **Meaningful Names:** Use descriptive and consistent names for classes, methods, variables.
- **Code Comments:** Add comments to explain complex business logic, especially in BadgeLogicService and UserBadgeService.

## Documentation Quality

- **Component Documentation:** Document each component's purpose, props, and usage in comments or separate documentation files.
- **API Documentation:** Use Swagger or similar tools to document API endpoints, request/response formats, and authentication/authorization requirements.
- **Architecture Documentation:**  Maintain high-level documentation of the system architecture, module interactions, and data flow (like these diagrams and plans).
- **Code Comments:**  Include JSDoc or similar comments for functions and methods to explain their parameters, return values, and purpose.
- **README Files:**  Provide README files for each module or package explaining its functionality and usage.

## Testability

- **Unit Tests:** Write unit tests for services, utility functions, and components to ensure business logic correctness and isolate issues.
- **Integration Tests:** Implement integration tests to verify API endpoints and interactions between different modules or services.
- **End-to-End Tests (Optional):** Consider end-to-end tests for critical user flows to ensure the entire system works correctly.
- **Test Coverage:** Aim for reasonable test coverage to catch regressions and ensure code quality.
- **Mocking and Stubbing:** Use mocking and stubbing to isolate dependencies and test components in isolation.

## Scalability Considerations

- **Stateless Services:** Design services to be stateless to allow horizontal scaling.
- **Caching:** Implement caching mechanisms (e.g., Redis, Memcached) to reduce database load and improve response times for frequently accessed data (like platform metrics).
- **Load Balancing:** Use load balancers to distribute traffic across multiple instances of services for high availability and performance.
- **Database Optimization:** Optimize database queries, indexing, and connection pooling for efficient data access.
- **Asynchronous Operations:** Use asynchronous operations and message queues (e.g., Kafka, RabbitMQ) for long-running tasks and background processing.
- **CDN for Static Assets:** Use CDNs to serve static assets (images, CSS, JS) to reduce latency and improve page load times.

## Security Considerations

- **Authentication and Authorization:** Implement robust authentication (e.g., JWT) and authorization (RBAC/ABAC) mechanisms to secure API endpoints and protect sensitive data.
- **Input Validation:** Validate all user inputs on both the client and server sides to prevent injection attacks (e.g., XSS, SQL injection).
- ** защита от CSRF:** Implement CSRF protection to prevent cross-site request forgery attacks.
- ** защита от XSS:** Protect against cross-site scripting (XSS) vulnerabilities by sanitizing user inputs and using appropriate templating engines.
- ** защита от SQL Injection:** Use parameterized queries or ORM to prevent SQL injection attacks.
- **HTTPS:** Enforce HTTPS to encrypt communication between the client and server.
- **Regular Security Audits:** Conduct regular security audits and penetration testing to identify and address potential vulnerabilities.
- **Dependency Management:** Keep dependencies up-to-date and monitor for security vulnerabilities.
- **Rate Limiting and Throttling:** Implement rate limiting and throttling to protect against brute-force attacks and DoS attacks.
- **Secure Storage of Sensitive Data:**  Store sensitive data (e.g., API keys, passwords) securely using encryption and environment variables (and ideally a secrets management system).