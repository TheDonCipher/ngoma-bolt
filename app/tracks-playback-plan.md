# Tracks Playback Plan

## Features

- **Audio Player Component:**
    - Core audio player UI with play/pause, next/previous track, progress bar, volume control, mute, etc.
    - Handles audio streaming and playback logic.
    - Playlist display and management integration.
    - Responsive design for different screen sizes.
- **Track Playback:**
    - Play full tracks for NFT holders (Fans and Artists).
    - Play preview snippets for non-NFT holders.
    - Seamless track transitions and queue management.
    - Display current track metadata (title, artist, album art).
- **Playlist Management:**
    - Create new playlists.
    - Add tracks to playlists from album pages, search results, etc.
    - View and manage playlists (reorder, remove tracks, delete playlists).
    - Save playlists for users.
- **Playback Queue:**
    - Display current playback queue.
    - Allow users to reorder or remove tracks from the queue.
    - "Play Next" and "Play Last" functionality.
- **Web3 Integration for Track Access:**
    - Verify NFT ownership to enable full track playback.
    - Handle cases where users do not own NFTs (play previews, prompt to purchase).
- **Background Playback:**
    - Enable background audio playback when the app is minimized or in the background (if possible in NextJS/browser environment).
- **Error Handling:**
    - Handle audio streaming errors gracefully (e.g., network issues, track not available).
    - Display user-friendly error messages.
- **Accessibility:**
    - Ensure audio player and playback controls are accessible.

## Components

- **AudioPlayer:**
    - Main audio player component.
    - UI controls (play/pause, progress bar, volume, etc.).
    - Integrates with audio context and playback logic.
- **TrackProgressBar:**
    - Component for displaying and controlling track progress.
    - Draggable progress bar to seek track position.
- **VolumeControl:**
    - Component for controlling audio volume.
    - Slider or volume knob UI.
- **PlaylistDrawer:**
    - Drawer or sidebar component to display the current playlist.
    - List of tracks in the playlist, current track highlighting.
    - Allows reordering and removing tracks from the playlist.
- **TrackQueue:**
    - Component to display the playback queue (upcoming tracks).
    - List of tracks in the queue.
- **PlaylistItem:**
    - Reusable component to display a single track in a playlist or queue.
    - Track title, artist, duration, album art (optional).
- **PlayButton:**
    - Reusable play/pause button component.
    - Used in AudioPlayer, AlbumCard, TrackList, etc.
- **TrackMetadataDisplay:**
    - Component to display track metadata (title, artist, album art).
    - Used in AudioPlayer and other relevant components.

## Data Models

- **Track (Prisma schema already defined):**
    - Extends existing Track model in Prisma schema.
    - May include additional frontend-specific playback state or data.
- **Playlist:**
    - playlistId (string, PK)
    - userId (FK to User)
    - playlistName (string)
    - tracks (relation to Track model, ordered)
    - ... other playlist metadata
- **PlaybackQueue:** (Client-side state, not necessarily a database model)
    - Array of track IDs or Track objects in the current playback order.
    - Current track index.
    - Playback settings (repeat, shuffle).

## API Endpoints

- **Track Playback Endpoints:**
    - `GET /tracks/{trackId}/preview`: Get preview audio URL for a track (no auth).
        - **Method:** GET
        - **Response:** Audio URL (preview snippet).
        - **Authentication:** Public access (no JWT required).
    - `GET /tracks/{trackId}/full`: Get full audio URL for a track (auth required, NFT check).
        - **Method:** GET
        - **Response:** Full audio URL (if NFT ownership verified).
        - **Authentication:** Fan/Artist role required (JWT protected). NFT ownership check required.
        - **Error Handling:** 401 Unauthorized if no JWT or invalid NFT ownership.
    - `GET /tracks/{trackId}`: Get track metadata (used for player display).
        - **Method:** GET
        - **Response:** JSON object with track metadata (title, artist, album art, duration).
        - **Caching:** Highly cacheable.

- **Playlist Management Endpoints:**
    - `POST /playlists`: Create a new playlist (auth required).
        - **Method:** POST
        - **Request:** JSON body with playlist name and optional description.
        - **Response:** 201 Created, newly created Playlist object.
        - **Authentication:** Fan/Artist role required (JWT protected).
    - `GET /playlists`: Get user's playlists (auth required).
        - **Method:** GET
        - **Response:** JSON array of Playlist objects for the user, paginated.
        - **Authentication:** Fan/Artist role required (JWT protected).
    - `GET /playlists/{playlistId}`: Get playlist details (auth required).
        - **Method:** GET
        - **Request:** `playlistId` path parameter.
        - **Response:** JSON object with Playlist details, including tracks.
        - **Authentication:** Fan/Artist role required (JWT protected), playlist ownership check.
    - `PUT /playlists/{playlistId}`: Update playlist details (auth required).
        - **Method:** PUT
        - **Request:** `playlistId` path parameter, JSON body with playlist details to update (name, description).
        - **Response:** 200 OK, updated Playlist object.
        - **Authentication:** Fan/Artist role required (JWT protected), playlist ownership check.
    - `DELETE /playlists/{playlistId}`: Delete playlist (auth required).
        - **Method:** DELETE
        - **Request:** `playlistId` path parameter.
        - **Response:** 204 No Content.
        - **Authentication:** Fan/Artist role required (JWT protected), playlist ownership check.
    - `POST /playlists/{playlistId}/tracks`: Add track to playlist (auth required).
        - **Method:** POST
        - **Request:** `playlistId` and `trackId` path parameters.
        - **Response:** 201 Created, updated PlaylistTrack object.
        - **Authentication:** Fan/Artist role required (JWT protected), playlist ownership check.
    - `DELETE /playlists/{playlistId}/tracks/{trackId}`: Remove track from playlist (auth required).
        - **Method:** DELETE
        - **Request:** `playlistId` and `trackId` path parameters.
        - **Response:** 204 No Content.
        - **Authentication:** Fan/Artist role required (JWT protected), playlist ownership check.
    - `PUT /playlists/{playlistId}/tracks/reorder`: Reorder tracks in playlist (auth required).
        - **Method:** PUT
        - **Request:** `playlistId` path parameter, JSON body with track IDs in new order.
        - **Response:** 200 OK, updated Playlist object with reordered tracks.
        - **Authentication:** Fan/Artist role required (JWT protected), playlist ownership check.

## Code Readability and Coding Standards

- **Component Structure:** Organize components in `components/player` and `components/playlists` directories.
- **Meaningful Names:** Use descriptive and consistent names for components, props, functions, and variables related to track playback and playlists.
- **Code Comments:** Add comments to explain complex audio playback logic, state management using Zustand or similar, and playlist functionalities.
- **Performance Optimization:** Write efficient code for audio streaming, playback, and UI updates to ensure smooth and responsive user experience.
- **Code Formatting:** Use code formatters (e.g., Prettier) to maintain consistent code formatting.

## Documentation Quality

- **Component Documentation:** Document each Tracks Playback component (e.g., `AudioPlayer`, `TrackProgressBar`, `PlaylistDrawer`) with clear descriptions of their purpose, props, and usage.
- **API Documentation:** Document Track Playback and Playlist Management API endpoints (under `/tracks` and `/playlists` prefixes) using Swagger, detailing request/response schemas, authentication, and error codes.
- **Feature-level Documentation:** Maintain documentation for the Tracks Playback feature, outlining its components, data flow, audio streaming logic, playlist management, and API endpoints (like this plan).

## Testability

- **Unit Tests for Components:** Write unit tests for Tracks Playback components (e.g., `AudioPlayer`, `TrackProgressBar`, `VolumeControl`, `PlaylistDrawer`) to ensure UI rendering and playback control logic are correct.
- **Integration Tests for Services:** Test `AudioStreamingService` and `PlaylistManagementService` functions by mocking audio API calls, database interactions, and verifying playback and playlist management logic.
- **Audio Playback Integration Tests:** Implement integration tests to verify the audio playback functionality, including track loading, play/pause, volume control, progress updates, and track transitions.
- **End-to-End Tests (Optional):** Consider E2E tests for key user flows related to track playback and playlist management, such as playing tracks from albums, creating and managing playlists, and using playback controls.

## Scalability Considerations

- **Scalable Audio Streaming:** Utilize a scalable audio streaming service or CDN to handle a large number of concurrent users streaming audio tracks.
- **Efficient Audio File Storage:** Store track audio files in scalable cloud storage (e.g., AWS S3, Google Cloud Storage) for efficient delivery and redundancy.
- **Caching Track Metadata:** Implement caching mechanisms (e.g., Redis, Memcached) to cache frequently accessed track metadata and album art to reduce database load.
- **Optimize Playlist Queries:** Optimize database queries for playlist retrieval and track listing to ensure fast loading of user playlists, especially for users with large playlists.
- **Connection Pooling:** Use database connection pooling to efficiently manage database connections for playlist data access.

## Security Considerations

- **Secure Audio Streaming:** Implement secure audio streaming protocols (e.g., HTTPS, HLS) to protect audio content during transmission and prevent unauthorized access.
- **Access Control for Full Tracks:** Enforce strict access control to ensure only NFT holders (fans and artists) can access full track audio URLs, while non-NFT holders are limited to preview snippets.
- **API Authentication:** Secure Playlist Management API endpoints (under `/playlists` prefix) with JWT authentication to ensure only authorized users can manage their playlists.
- **ป้องกัน DoS Attacks:** Implement rate limiting and throttling on audio streaming and playlist API endpoints to protect against abuse and DoS attacks.
- **Data Privacy:** Ensure user playlist data is private and only accessible to the authorized user and admin users with appropriate permissions.
- **Secure Track URLs:** Protect track audio URLs from unauthorized access and prevent direct access to full track URLs without proper authentication and NFT ownership verification.