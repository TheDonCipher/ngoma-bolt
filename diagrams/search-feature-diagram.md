# Search Feature Functionality Diagram

```mermaid
graph LR
    subgraph Search Feature
        User --> SearchBarUI[Search Bar UI]
        SearchBarUI --> SearchService[Search Service]
        note left of SearchBarUI: User enters\nsearch query,\ntriggers suggestions
        User --> SearchFiltersUI[Search Filters UI]
        SearchFiltersUI --> SearchService
        note left of SearchSuggestionListUI: Displays search\nsuggestions from\nSearchService

        SearchService --> TrackSearch[(Track Search Index)]
        SearchService --> AlbumSearch[(Album Search Index)]
        SearchService --> ArtistSearch[(Artist Search Index)]
        SearchService --> EventSearch[(Event Search Index)]
        SearchService --> MerchandiseSearch[(Merchandise Search Index)]
        SearchService --> NewsSearch[(News Search Index)]
        note left of SearchService: Aggregates search\nresults from\nvarious indexes,\nimplements ranking/\nrelevance logic
        note right of TrackSearch: Index for fast\ntrack searching
        note right of AlbumSearch: Index for fast\nalbum searching
        note right of ArtistSearch: Index for fast\nartist searching
        note right of EventSearch: Index for fast\nevent searching
        note right of MerchandiseSearch: Index for fast\nmerchandise searching
        note right of NewsSearch: Index for fast\nnews searching

        SearchService --> SearchResultsUI[Search Results UI]
        SearchResultsUI --> TrackCategoryResultsUI[Track Category Results UI]
        SearchResultsUI --> AlbumCategoryResultsUI[Album Category Results UI]
        SearchResultsUI --> ArtistCategoryResultsUI[Artist Category Results UI]
        SearchResultsUI --> EventCategoryResultsUI[Event Category Results UI]
        SearchResultsUI --> MerchandiseCategoryResultsUI[Merchandise Category Results UI]
        SearchResultsUI --> NewsCategoryResultsUI[News Category Results UI]
        note left of SearchFiltersUI: Sends search\nfilters to\nSearchService
        note right of SearchResultsUI: Displays search\nresults,\ncategorized by type
        note right of TrackCategoryResultsUI: Displays track\ncategory results
        note right of AlbumCategoryResultsUI: Displays album\ncategory results
        note right of ArtistCategoryResultsUI: Displays artist\ncategory results
        note right of EventCategoryResultsUI: Displays event\ncategory results
        note right of MerchandiseCategoryResultsUI: Displays merchandise\ncategory results
        note right of NewsCategoryResultsUI: Displays news\ncategory results

        SearchBarUI --> SearchSuggestionListUI[Search Suggestion List UI]
        SearchService --> SearchSuggestionListUI
    end