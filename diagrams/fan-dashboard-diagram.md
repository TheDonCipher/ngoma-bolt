# Fan Dashboard Functionality Diagram

```mermaid
graph LR
    subgraph Fan Dashboard
        FanUser[Fan User]

        subgraph Followed Artists
            FollowedArtistsUI[Followed Artists UI] --> FanDataService
            FanDataService --> ArtistDB[(Artist Database)]
            note right of FollowedArtistsUI: Fetches followed\nartists from\nFanDataService
        end

        subgraph Achievement Badges
            AchievementBadgesUI[Achievement Badges UI] --> FanDataService
            FanDataService --> BadgeDB[(Badge Database)]
            note right of AchievementBadgesUI: Fetches earned\nbadges from\nFanDataService
        end

        subgraph NFT Collection (Optional)
            NFTCollectionUI[NFT Collection UI] --> FanDataService
            FanDataService --> NFTData[(NFT Data Source)]
            note right of NFTCollectionUI: Fetches NFT\ncollection from\nFanDataService
        end

        subgraph Dashboard Overview
            DashboardOverviewUI[Dashboard Overview UI] --> AnalyticsService
            AnalyticsService --> FanStats[(Fan Stats Data)]
            note right of AnalyticsService: Fetches fan\nstats data
            ActivityFeedUI[Activity Feed UI] --> FanDataService
            note right of ActivityFeedUI: Fetches activity\nfeed from\nFanDataService
        end

        subgraph Profile Management
            FanProfileEditFormUI[Fan Profile Edit Form UI] --> FanProfileService
            FanProfileService --> FanProfileDB[(Fan Profile Data)]
            note right of FanProfileEditFormUI: UI for editing\nfan profile
            note right of FanProfileService: Handles profile\nupdates and retrieval
            note right of FanProfileDB: Stores fan\nprofile data
        end

        subgraph Settings
            FanSettingsFormUI[Fan Settings Form UI] --> FanSettingsService
            FanSettingsService --> FanSettingsDB[(Fan Settings Data)]
            note right of FanSettingsFormUI: UI for managing\nfan settings
            note right of FanSettingsService: Handles settings\nupdates and retrieval
            note right of FanSettingsDB: Stores fan\nsettings data
        end

        FanUser --> FollowedArtists
        FanUser --> AchievementBadges
        FanUser --> NFTCollection
        FanUser --> DashboardOverview
        FanUser --> ProfileManagement
        FanUser --> Settings
    end