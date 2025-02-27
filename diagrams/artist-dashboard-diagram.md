# Artist Dashboard Functionality Diagram

This document visualizes the structure and functionality of the Artist Dashboard in the Ngoma platform.

## Dashboard Overview

```mermaid
flowchart TD
    ArtistDashboard[Artist Dashboard] --> Overview[Overview/Analytics]
    ArtistDashboard --> TrackMgmt[Track Management]
    ArtistDashboard --> AlbumMgmt[Album Management]
    ArtistDashboard --> EventMgmt[Event Management]
    ArtistDashboard --> MerchMgmt[Merchandise Management]
    ArtistDashboard --> NFTMgmt[NFT Management]
    ArtistDashboard --> ProfileMgmt[Profile Management]

    %% Overview/Analytics section
    Overview --> ListenerStats[Listener Statistics]
    Overview --> RevenueMetrics[Revenue Metrics]
    Overview --> EngagementData[Fan Engagement Data]
    Overview --> PerformanceTracker[Content Performance]

    %% Track Management section
    TrackMgmt --> UploadTrack[Upload New Track]
    TrackMgmt --> ManageTracks[Manage Existing Tracks]
    TrackMgmt --> TrackAnalytics[Track Performance]

    %% Album Management section
    AlbumMgmt --> CreateAlbum[Create New Album]
    AlbumMgmt --> ManageAlbums[Manage Existing Albums]
    AlbumMgmt --> AlbumAnalytics[Album Performance]

    %% Event Management section
    EventMgmt --> CreateEvent[Create New Event]
    EventMgmt --> ManageEvents[Manage Existing Events]
    EventMgmt --> EventAnalytics[Event Performance]

    %% Merchandise Management section
    MerchMgmt --> CreateMerch[Create New Merchandise]
    MerchMgmt --> ManageMerch[Manage Existing Merchandise]
    MerchMgmt --> MerchAnalytics[Merchandise Sales]

    %% NFT Management section
    NFTMgmt --> CreateNFT[Create New NFT]
    NFTMgmt --> ManageNFTs[Manage Existing NFTs]
    NFTMgmt --> NFTAnalytics[NFT Sales & Royalties]
    NFTMgmt --> WalletConnection[Wallet Management]

    %% Profile Management section
    ProfileMgmt --> EditProfile[Edit Artist Profile]
    ProfileMgmt --> BrandingSettings[Branding Settings]
    ProfileMgmt --> SocialLinks[Social Media Links]
```

## Component Architecture

```mermaid
flowchart TD
    subgraph "Artist Dashboard Components"
        ArtistDashboardLayout[ArtistDashboardLayout]
        ArtistSidebar[ArtistSidebar]
        ArtistHeader[ArtistHeader]

        %% Content components
        OverviewComponent[OverviewComponent]
        TrackManagement[TrackManagement]
        AlbumManagement[AlbumManagement]
        EventManagement[EventManagement]
        MerchandiseManagement[MerchandiseManagement]
        NFTManagement[NFTManagement]
        ProfileManagement[ProfileManagement]

        %% Shared components
        UploadForm[UploadForm]
        MetricsDisplay[MetricsDisplay]
        DataTable[DataTable]
        ChartComponent[ChartComponent]

        %% Web3 components
        WalletConnector[WalletConnector]
        NFTMinter[NFTMinter]
        ContractInteraction[ContractInteraction]
    end

    ArtistDashboardLayout --> ArtistSidebar
    ArtistDashboardLayout --> ArtistHeader
    ArtistDashboardLayout --> ContentComponents

    subgraph ContentComponents
        OverviewComponent
        TrackManagement
        AlbumManagement
        EventManagement
        MerchandiseManagement
        NFTManagement
        ProfileManagement
    end

    TrackManagement --> UploadForm
    TrackManagement --> DataTable
    TrackManagement --> MetricsDisplay

    AlbumManagement --> UploadForm
    AlbumManagement --> DataTable
    AlbumManagement --> MetricsDisplay

    EventManagement --> UploadForm
    EventManagement --> DataTable
    EventManagement --> MetricsDisplay

    MerchandiseManagement --> UploadForm
    MerchandiseManagement --> DataTable
    MerchandiseManagement --> MetricsDisplay

    NFTManagement --> WalletConnector
    NFTManagement --> NFTMinter
    NFTManagement --> ContractInteraction
    NFTManagement --> DataTable
    NFTManagement --> MetricsDisplay

    OverviewComponent --> ChartComponent
    OverviewComponent --> MetricsDisplay
```

## Track Upload Flow

```mermaid
sequenceDiagram
    participant Artist
    participant Frontend
    participant API
    participant Storage
    participant Database

    Artist->>Frontend: Fill track upload form
    Frontend->>Frontend: Validate form input
    Frontend->>API: Request upload URL
    API-->>Frontend: Return signed upload URL
    Frontend->>Storage: Upload audio file to signed URL
    Storage-->>Frontend: Upload successful

    Frontend->>API: POST /tracks with metadata
    API->>Database: Store track metadata
    Database-->>API: Track created
    API-->>Frontend: Return track details
    Frontend-->>Artist: Show upload success
```

## NFT Creation Flow

```mermaid
sequenceDiagram
    participant Artist
    participant Frontend
    participant API
    participant Storage
    participant Blockchain
    participant Database

    Artist->>Frontend: Select track/album for NFT
    Artist->>Frontend: Configure NFT properties
    Frontend->>Frontend: Validate NFT configuration
    Frontend->>API: Request NFT metadata creation
    API->>Storage: Store NFT metadata
    Storage-->>API: Return metadata URI
    API-->>Frontend: Return metadata URI

    Artist->>Frontend: Confirm NFT creation
    Frontend->>Frontend: Connect wallet
    Frontend->>Blockchain: Call mint function
    Blockchain-->>Frontend: Return transaction hash
    Frontend->>API: POST /nfts with transaction details
    API->>Database: Record NFT creation
    Database-->>API: NFT recorded
    API-->>Frontend: Success response
    Frontend-->>Artist: Show NFT creation success
```

## Event Management Flow

```mermaid
sequenceDiagram
    participant Artist
    participant Frontend
    participant API
    participant Storage
    participant Database

    Artist->>Frontend: Fill event creation form
    Frontend->>Frontend: Validate form input

    alt Has event image
        Frontend->>API: Request upload URL
        API-->>Frontend: Return signed upload URL
        Frontend->>Storage: Upload event image
        Storage-->>Frontend: Upload successful
    end

    Frontend->>API: POST /events with event data
    API->>Database: Store event data
    Database-->>API: Event created
    API-->>Frontend: Return event details
    Frontend-->>Artist: Show event creation success
```

## Analytics Data Flow

```mermaid
flowchart TD
    subgraph "Data Sources"
        Streams[Stream Data]
        Sales[Sales Data]
        WebAnalytics[Website Analytics]
        SocialMedia[Social Media Data]
        NFTTransactions[NFT Transactions]
    end

    subgraph "Processing Layer"
        DataAggregation[Data Aggregation]
        MetricsCalculation[Metrics Calculation]
        Trends[Trend Analysis]
    end

    subgraph "Presentation Layer"
        DashboardAPI[Dashboard API]
        ArtistDashboard[Artist Dashboard UI]
    end

    Streams --> DataAggregation
    Sales --> DataAggregation
    WebAnalytics --> DataAggregation
    SocialMedia --> DataAggregation
    NFTTransactions --> DataAggregation

    DataAggregation --> MetricsCalculation
    MetricsCalculation --> Trends
    Trends --> DashboardAPI
    DashboardAPI --> ArtistDashboard
```

## Calendar Integration

```mermaid
sequenceDiagram
    participant Artist
    participant Dashboard
    participant API
    participant CalendarProvider

    Artist->>Dashboard: Request calendar integration
    Dashboard->>CalendarProvider: OAuth authentication
    CalendarProvider-->>Dashboard: Return auth token
    Dashboard->>API: Store calendar connection

    Artist->>Dashboard: Create new event
    Dashboard->>API: POST /events
    API->>CalendarProvider: Create calendar event
    CalendarProvider-->>API: Calendar event created
    API-->>Dashboard: Success response
    Dashboard-->>Artist: Show event created
```

## Responsive Layout Strategy

```mermaid
flowchart TD
    DashboardLayout[Dashboard Layout] --> ResponsiveStrategy[Responsive Strategy]

    ResponsiveStrategy --> Desktop[Desktop View]
    ResponsiveStrategy --> Tablet[Tablet View]
    ResponsiveStrategy --> Mobile[Mobile View]

    Desktop --> FullSidebar[Full Sidebar Navigation]
    Desktop --> MultiColumn[Multi-Column Layout]
    Desktop --> ExpandedCharts[Expanded Charts]

    Tablet --> CollapsibleSidebar[Collapsible Sidebar]
    Tablet --> AdaptiveColumns[Adaptive Columns]
    Tablet --> ResponsiveCharts[Responsive Charts]

    Mobile --> NavigationDrawer[Navigation Drawer]
    Mobile --> SingleColumn[Single Column Layout]
    Mobile --> SimplifiedCharts[Simplified Charts]
```

This comprehensive diagram illustrates the structure and workflows of the Artist Dashboard, highlighting the component architecture, key user flows, and responsive design strategy for a seamless artist experience on the Ngoma platform.
