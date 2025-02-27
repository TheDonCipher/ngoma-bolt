# Database Schema Diagram

```mermaid
erDiagram
    User {
        string userId PK
        string username
        string email
        string role
    }
    note right of User: Indexes: email, username\nSecurely store password\n(hashing, salting)
    Artist {
        string artistId PK
        string userId FK
        string artistName
        string description
    }
    note right of Artist: Specializes User\nrole: artist
    Fan {
        string fanId PK
        string userId FK
    }
    note right of Fan: Specializes User\nrole: fan
    Admin {
        string adminId PK
        string userId FK
    }
    note right of Admin: Specializes User\nrole: admin
    Album {
        string albumId PK
        string artistId FK
        string title
        string releaseDate
        string genreId FK
    }
    note right of Album: Indexes: artistId, genreId, title\nIndex releaseDate for\nrecent albums queries
    Track {
        string trackId PK
        string albumId FK
        string artistId FK
        string title
        number duration
    }
    note right of Track: Indexes: albumId, artistId, title
    Genre {
        string genreId PK
        string genreName
        string description
    }
    Playlist {
        string playlistId PK
        string userId FK
        string playlistName
    }
    PlaylistTrack {
        string playlistTrackId PK
        string playlistId FK
        string trackId FK
        int trackOrder
    }
    note right of PlaylistTrack: Composite FK on\nplaylistId, trackId\nIndex: playlistId
    Event {
        string eventId PK
        string artistId FK
        string eventName
        datetime eventDate
        string venueId FK
    }
    note right of Event: Indexes: artistId, venueId, eventDate\nIndex eventDate for\nupcoming events
    Venue {
        string venueId PK
        string venueName
        string address
        number capacity
    }
    note right of Venue: Consider spatial index\nif location-based\nsearch needed
    Merchandise {
        string merchandiseId PK
        string artistId FK
        string productName
        string description
        number price
    }
    note right of Merchandise: Indexes: artistId,\nproductName
    Badge {
        string badgeId PK
        string badgeName
        string description
    }
    UserBadge {
        string userBadgeId PK
        string userId FK
        string badgeId FK
        datetime awardedDate
        string progress // Could be JSON for complex badges
    }
    note right of UserBadge: Composite FK on userId, badgeId\nIndex: userId
    NewsArticle {
        string newsArticleId PK
        string authorId FK // User or Admin
        string title
        string content
        datetime publicationDate
    }
    note right of NewsArticle: Indexes: publicationDate, authorId\nIndex categoryId, tagId for\nfiltering
    NewsCategory {
        string categoryId PK
        string categoryName
    }
    NewsTag {
        string tagId PK
        string tagName
    }
    FeaturedContent {
        string featuredContentId PK
        string contentId FK
        string contentType enum('news', 'event')
        int featuredOrder
    }
    note right of FeaturedContent: Polymorphic FK to\nNewsArticle or Event\ncontentType enum\ndifferentiates content
    SearchQuery {
        string searchQueryId PK
        string userId FK // Nullable for anonymous queries
        string queryText
        datetime timestamp
    }
    note right of SearchQuery: Index timestamp for\nrecent queries\nuserId is nullable\nfor anonymous searches

    User ||--o{ Artist : "1..n"
    User ||--o{ Fan : "1..n"
    User ||--o{ Admin : "1..n"
    Artist ||--o{ Album : "1..n"
    Artist ||--o{ Track : "1..n"
    Album ||--o{ Track : "1..n"
    Genre ||--o{ Album : "1..n"
    Genre }|--|| Album : "genreId"
    Artist ||--o{ Event : "1..n"
    Venue ||--o{ Event : "1..n"
    Venue }|--|| Event : "venueId"
    Artist ||--o{ Merchandise : "1..n"
    User ||--o{ Playlist : "1..n"
    Playlist ||--o{ PlaylistTrack : "1..n"
    Playlist }|--|| PlaylistTrack : "playlistId"
    Track ||--o{ PlaylistTrack : "1..n"
    Track }|--|| PlaylistTrack : "trackId"
    User ||--o{ UserBadge : "1..n"
    Badge ||--o{ UserBadge : "1..n"
    Badge }|--|| UserBadge : "badgeId"
    User }|--|| UserBadge : "userId"
    NewsArticle ||--o{ NewsCategory : "0..n"
    NewsCategory }|--|| NewsArticle : "categoryId"
    NewsArticle ||--o{ NewsTag : "0..n"
    NewsTag }|--|| NewsArticle : "tagId"
    User ||--o{ SearchQuery : "0..n"
    FeaturedContent ||--o{ NewsArticle : "0..1"
    FeaturedContent ||--o{ Event : "0..1"
