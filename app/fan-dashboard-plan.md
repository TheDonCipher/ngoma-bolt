# Fan Dashboard Plan

## Features

- **Followed Artists:**
    - View list of followed artists
    - Unfollow artists
- **Achievement Badges:**
    - View earned badges
    - Track progress towards badges
    - View badge descriptions
- **NFT Collection (Optional):**
    - View NFTs owned by the fan (music, albums, merchandise, event tickets)
    - Basic NFT management (view details, transfer - if applicable)
- **Dashboard Overview:**
    - Display key stats for the fan (e.g., total artists followed, badges earned, NFTs owned)
    - Activity feed of followed artists (new releases, events, news)
- **Profile Management:**
    - Edit fan profile details (username, profile picture)
    - View public fan profile
- **Settings:**
    - Manage account settings (e.g., notification preferences)

## Components

- **DashboardLayout:**
    - Overall dashboard layout, similar to other dashboards.
- **Followed Artists Section:**
    - FollowedArtistList component: Displays a list of followed artists.
    - ArtistCard component (FanDashboard version): Compact artist card for followed artists.
- **Achievement Badges Section:**
    - EarnedBadgeList component: Displays a list of earned badges.
    - BadgeProgress component (FanDashboard version): Visual progress towards badge completion.
    - BadgeDescription component:  Modal or inline component to show badge details.
- **NFT Collection Section (Optional):**
    - NFTCollectionGrid component: Grid view of NFTs owned by the fan.
    - NFTCard component (FanDashboard version): Compact NFT card for fan collection.
- **Dashboard Overview Section:**
    - FanStatsCard components: Display key fan statistics.
    - ActivityFeed component: Displays activity feed of followed artists.
- **Profile Management Section:**
    - FanProfileEditForm component: Form for editing fan profile information.
    - FanPublicProfilePreview component: Preview of the public fan profile.
- **Settings Section:**
    - FanSettingsForm component: Form for managing fan account settings.

## Data Models

- **FollowedArtist:** (Likely a relationship, not a separate model)
    - userId (FK to User)
    - artistId (FK to Artist)
- **EarnedBadge:** (Extends UserBadge)
    - userBadgeId (string, PK, FK to UserBadge)
    - badgeId (string, FK to Badge)
    - earnedDate (datetime)
- **FanDashboardStats:** (Potentially non-database, calculated metrics)
    - followedArtistsCount (number)
    - badgesEarnedCount (number)
    - nftsOwnedCount (number) (if NFT Collection is implemented)
    - ... other fan specific metrics
- **FanProfile:** (Extends common User profile)
    - ... (potentially fan-specific profile fields in the future)

## API Endpoints

- **Followed Artists Endpoints:**
    - `GET /fan/followed-artists`: Get list of followed artists
        - **Method:** GET
        - **Response:** JSON array of Artist objects, representing followed artists, paginated.
        - **Authentication:** Fan role required (JWT protected).
    - `POST /fan/follow-artist/{artistId}`: Follow an artist
        - **Method:** POST
        - **Request:** `artistId` path parameter.
        - **Response:** 200 OK, success message.
        - **Authentication:** Fan role required (JWT protected).
    - `DELETE /fan/follow-artist/{artistId}`: Unfollow an artist
        - **Method:** DELETE
        - **Request:** `artistId` path parameter.
        - **Response:** 204 No Content, success message.
        - **Authentication:** Fan role required (JWT protected).

- **Achievement Badges Endpoints:**
    - `GET /fan/badges`: Get list of earned badges and progress
        - **Method:** GET
        - **Response:** JSON array of UserBadge objects with badge details and progress.
        - **Authentication:** Fan role required (JWT protected).
    - `GET /fan/badges/{badgeId}`: Get details of a specific badge
        - **Method:** GET
        - **Request:** `badgeId` path parameter.
        - **Response:** JSON object with detailed Badge information (description, criteria, etc.).
        - **Authentication:** Fan role required (JWT protected).

- **NFT Collection Endpoints (Optional):**
    - `GET /fan/nfts`: Get list of NFTs owned by fan (if implemented)
        - **Method:** GET
        - **Response:** JSON array of NFT objects owned by the fan, paginated.
        - **Authentication:** Fan role required (JWT protected).
    - `GET /fan/nfts/{nftId}`: Get details of a specific NFT (if implemented)
        - **Method:** GET
        - **Request:** `nftId` path parameter.
        - **Response:** JSON object with detailed NFT information.
        - **Authentication:** Fan role required (JWT protected).

- **Dashboard Overview Endpoints:**
    - `GET /fan/dashboard/stats`: Get fan dashboard statistics
        - **Method:** GET
        - **Response:** JSON object containing fan dashboard statistics (followed artists count, badges earned, etc.).
        - **Authentication:** Fan role required (JWT protected).
    - `GET /fan/dashboard/activity-feed`: Get activity feed for followed artists
        - **Method:** GET
        - **Response:** JSON array of activity feed items (new releases, events, news from followed artists).
        - **Authentication:** Fan role required (JWT protected).

- **Profile Management Endpoints:**
    - `GET /fan/profile`: Get fan profile details
        - **Method:** GET
        - **Response:** JSON object with fan profile details.
        - **Authentication:** Fan role required (JWT protected).
    - `PUT /fan/profile`: Update fan profile details
        - **Method:** PUT
        - **Request:** JSON request body with fan profile data to update.
        - **Response:** 200 OK, updated FanProfile object.
        - **Authentication:** Fan role required (JWT protected).

- **Settings Endpoints:**
    - `PUT /fan/settings`: Update fan settings
        - **Method:** PUT
        - **Request:** JSON request body with fan settings data to update (e.g., notification preferences).
        - **Response:** 200 OK, updated FanSettings object.
        - **Authentication:** Fan role required (JWT protected).
    - `GET /fan/settings`: Get fan settings
        - **Method:** GET
        - **Response:** JSON object with fan settings details.
        - **Authentication:** Fan role required (JWT protected).

## Code Readability and Coding Standards

- **Code Style Guide:** Follow the project's code style guide for consistency and readability.
- **Component Structure:** Organize components in dedicated directories (e.g., `components/fan-dashboard`).
- **Meaningful Names:** Use descriptive and consistent names for components, props, functions, and variables.
- **Code Comments:** Add comments to explain component logic and dashboard-specific functionalities.
- **Keep components focused:** Adhere to the Single Responsibility Principle, ensuring components are small and focused.
- **Code Formatting:** Use code formatters (e.g., Prettier) for consistent code formatting.

## Documentation Quality

- **Component Documentation:** Document each Fan Dashboard component, detailing its purpose, props, and usage within the dashboard.
- **API Documentation:** Document Fan Dashboard API endpoints (under `/fan` prefix) using Swagger, including request/response schemas and authentication requirements.
- **Dashboard Feature Guide:** Maintain high-level documentation for the Fan Dashboard, outlining its features, component architecture, and data flow (like this plan).

## Testability

- **Unit Tests for Components:** Write unit tests for Fan Dashboard components (e.g., `FollowedArtistsUI`, `AchievementBadgesUI`, `FanStatsCard`) to ensure UI rendering and component logic are correct.
- **Integration Tests for FanDataService:** Test `FanDataService` functions (fetching followed artists, badges, NFT collection, activity feed) by mocking backend API calls and verifying data handling.
- **End-to-End Tests (Optional):** Consider E2E tests for key fan dashboard workflows, such as viewing followed artists, checking badges, and navigating dashboard sections.

## Scalability Considerations

- **Caching Dashboard Data:** Implement caching in `FanDataService` to cache dashboard data (followed artists, badges, stats) to reduce backend load and improve dashboard loading times for fans.
- **Efficient Data Fetching:** Optimize data fetching logic in `FanDataService` to retrieve fan dashboard data efficiently, considering potential large lists of followed artists or NFTs.
- **Asynchronous Operations:** Use asynchronous operations for non-critical dashboard updates or data fetching to maintain UI responsiveness.

## Security Considerations

- **Authentication and Authorization:** Implement JWT authentication to secure Fan Dashboard API endpoints and ensure only logged-in fans can access their dashboard data.
- **Data Privacy:** Ensure fan-specific data (followed artists, badges, NFT collection, profile, settings) is only accessible to the logged-in fan and authorized admin users.
- **Secure API Keys:** Securely manage any API keys or credentials used by Fan Dashboard services, using environment variables and secure configuration practices.
- **ป้องกัน XSS и CSRF:** Protect against XSS and CSRF vulnerabilities in Fan Dashboard UI components and API endpoints to ensure a secure user experience.