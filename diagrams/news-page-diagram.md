# News Page Functionality Diagram

```mermaid
graph LR
    subgraph News Page
        User --> NewsFeedUI[News Feed UI]
        NewsFeedUI --> NewsService
        NewsService --> NewsDB[(News Articles Database)]
        note right of NewsFeedUI: Fetches news articles\nfrom NewsService,\nmanages feed display\n(pagination, sorting)
        NewsFeedUI --> NewsCardUI[News Card UI]
        NewsCardUI --> NewsArticleDetailsUI[News Article Details UI]

        User --> NewsFilterUI[News Filter UI]
        NewsFilterUI --> NewsService
        note left of NewsFilterUI: Sends filter\nparameters to\nNewsService

        NewsFeedUI --> TrendingArtistsSectionUI[Trending Artists Section UI]
        TrendingArtistsSectionUI --> ArtistService
        ArtistService --> ArtistDB[(Artist Database)]
        note right of TrendingArtistsSectionUI: Fetches trending\nartists from\nArtistService

        NewsFeedUI --> UpcomingEventsSectionUI[Upcoming Events Section UI]
        UpcomingEventsSectionUI --> EventService
        EventService --> EventDB[(Event Database)]
        note right of UpcomingEventsSectionUI: Fetches upcoming\nevents from\nEventService
    end
