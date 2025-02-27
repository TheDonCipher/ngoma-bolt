# Explore Feature Functionality Diagram

```mermaid
graph LR
    subgraph Explore Page
        User --> ExploreUI[Explore UI]

        subgraph Trending Songs Section
            TrendingSongsSectionUI[Trending Songs Section UI] --> ExploreUI
            TrendingSongsSectionUI --> ExploreService
            ExploreService --> TrackDB[(Track Database)]
            note right of TrendingSongsSectionUI: Fetches trending\nsongs from\nExploreService
        end

        subgraph Featured Artists Section
            FeaturedArtistsSectionUI[Featured Artists Section UI] --> ExploreUI
            FeaturedArtistsSectionUI --> ExploreService
            ExploreService --> ArtistDB[(Artist Database)]
            note right of FeaturedArtistsSectionUI: Fetches featured\nartists from\nExploreService
        end

        subgraph Genre Showcase Section
            GenreShowcaseSectionUI[Genre Showcase Section UI] --> ExploreUI
            GenreShowcaseSectionUI --> ExploreService
            ExploreService --> AlbumDB[(Album Database)]
            GenreShowcaseSectionUI --> GenreFilterUI[Genre Filter UI]
        end
        note right of GenreShowcaseSectionUI: Fetches albums by\ngenre from\nExploreService,\nuses GenreFilterUI

        subgraph Live Events Section
            LiveEventsSectionUI[Live Events Section UI] --> ExploreUI
            LiveEventsSectionUI --> EventService
            ExploreService --> EventDB[(Event Database)]
            note right of LiveEventsSectionUI: Fetches live events\nfrom EventService
        end

        subgraph Recently Added Albums Section
            RecentlyAddedAlbumsSectionUI[Recently Added Albums Section UI] --> ExploreUI
            RecentlyAddedAlbumsSectionUI --> ExploreService
            ExploreService --> AlbumDB
        end
        note right of RecentlyAddedAlbumsSectionUI: Fetches recently\nadded albums from\nExploreService
        note left of ExploreService: Aggregates data from\nTrackDB, ArtistDB,\nAlbumDB, EventDB

        ExploreUI --> SearchFiltersUI[Search Filters UI]
    end