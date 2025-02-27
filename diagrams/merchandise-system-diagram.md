# Merchandise System Diagram

```mermaid
graph LR
    subgraph Merchandise System
        ArtistUser[Artist User] --> MerchandiseCreateFormUI[Merchandise Create Form UI]
        ArtistUser --> MerchandiseListUI[Merchandise List UI]
        ArtistUser --> MerchandiseEditFormUI[Merchandise Edit Form UI]

        AdminUser[Admin User] --> AdminMerchandiseManagementUI[Admin Merchandise Management UI]
        AdminMerchandiseManagementUI --> MerchandiseListUIAdmin[Merchandise List UI (Admin)]

        MerchandiseCreateFormUI --> MerchandiseManagementService
        MerchandiseEditFormUI --> MerchandiseManagementService
        MerchandiseListUI --> MerchandiseService
        MerchandiseListUIAdmin --> MerchandiseService
        MerchandiseManagementService --> MerchandiseDB[(Merchandise Database)]
        note right of MerchandiseManagementService: Handles merchandise\ncreation, update,\nretrieval for artists & admins,\nstores in MerchandiseDB
        note right of MerchandiseDB: Stores merchandise\ndetails, pricing,\nstock levels
        FanUser --> MerchandiseListExploreUI[Merchandise List UI (Explore)]
        FanUser --> MerchandiseDetailsPageUI[Merchandise Details Page UI]
        MerchandiseListExploreUI --> MerchandiseService
        MerchandiseDetailsPageUI --> MerchandiseService
        note left of MerchandiseListExploreUI: Fetches merchandise\nfor explore page
        note left of MerchandiseDetailsPageUI: Fetches detailed\nmerchandise info
        MerchandiseListExploreUI --> MerchandiseCardUI[Merchandise Card UI]
        MerchandiseDetailsPageUI --> MerchandiseInfoUI[Merchandise Info UI]
        MerchandiseDetailsPageUI --> PurchaseMerchandiseButtonUI[Purchase Merchandise Button UI]
        PurchaseMerchandiseButtonUI --> PaymentGateway[Payment Gateway Service]
        PurchaseMerchandiseButtonUI --> MerchandiseNFTService[Merchandise NFT Service]
        MerchandiseNFTService --> MerchandiseNFTContract[(Merchandise NFT Smart Contract)]
    end
    note right of PurchaseMerchandiseButtonUI: Initiates purchase\nflow, calls\nPaymentGateway &\nMerchandiseNFTService
    note right of PaymentGateway: Handles payment\nprocessing
    note right of MerchandiseNFTService: Handles merchandise\nNFT minting after\npurchase
    note right of MerchandiseNFTContract: Merchandise NFT\nsmart contract
