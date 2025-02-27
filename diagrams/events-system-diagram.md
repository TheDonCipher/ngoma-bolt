# Events System Diagram

```mermaid
graph LR
    subgraph Events System
        ArtistUser[Artist User] --> EventCreateFormUI[Event Create Form UI]
        ArtistUser --> EventListUI[Event List UI]
        ArtistUser --> EventEditFormUI[Event Edit Form UI]

        AdminUser[Admin User] --> AdminEventManagementUI[Admin Event Management UI]
        AdminEventManagementUI --> EventListUIAdmin[Event List UI (Admin)]

        EventCreateFormUI --> EventManagementService
        EventEditFormUI --> EventManagementService
        EventListUI --> EventService
        EventListUIAdmin --> EventService
        EventManagementService --> EventDB[(Event Database)]
        note right of EventManagementService: Handles event creation, update,\nretrieval for artists & admins,\nstores events in EventDB
        note right of EventDB: Stores event metadata,\nvenue details, ticket info

        FanUser --> ExploreEventsSectionUI[Explore Events Section UI]
        FanUser --> EventDetailsPageUI[Event Details Page UI]
        ExploreEventsSectionUI --> EventListUIExplore[Event List UI (Explore)]
        EventDetailsPageUI --> EventHeaderUI[Event Header UI]
        EventDetailsPageUI --> EventDetailsInfoUI[Event Details Info UI]
        EventListUIExplore --> EventService
        EventDetailsPageUI --> EventService
        note left of EventListUIExplore: Fetches events\nfor explore page
        note left of EventDetailsPageUI: Fetches detailed\nevent info

        EventDetailsPageUI --> TicketNFTService[Ticket NFT Service]
        note left of TicketNFTService: Handles ticket NFT\ngeneration,\nverification,\npurchase flow
        TicketNFTService --> TicketNFTContract[(Ticket NFT Smart Contract)]
        note right of TicketNFTContract: Ticket NFT smart\ncontract on blockchain
        FanUser --> PurchaseTicketButtonUI[Purchase Ticket Button UI]
        PurchaseTicketButtonUI --> TicketNFTService
    end