# Settings & Profile Diagram

```mermaid
graph LR
    subgraph Settings & Profile
        User --> ProfileSettingsUI[Profile Settings UI]
        User --> AccountSettingsUI[Account Settings UI]
        User --> NotificationSettingsUI[Notification Settings UI]
        User --> WalletSettingsUI[Wallet Settings UI]

        ProfileSettingsUI --> ProfileService
        note right of ProfileSettingsUI: UI for managing\nuser profile info\n(username, bio, etc.)
        AccountSettingsUI --> SettingsService
        note right of AccountSettingsUI: UI for managing\naccount settings\n(email, password, etc.)
        NotificationSettingsUI --> SettingsService
        note right of NotificationSettingsUI: UI for managing\nnotification\npreferences
        WalletSettingsUI --> Web3IntegrationService
        note right of WalletSettingsUI: UI for\nwallet connection\nmanagement
        note right of Web3IntegrationService: Handles wallet\nconnection,\nWeb3 provider
        note right of ProfileService: Handles profile\nupdates & retrieval,\nstores in UserProfileDB
        note right of SettingsService: Handles account &\nnotification settings,\nstores in UserSettingsDB
        note right of Web3IntegrationService: Handles wallet\nconnection,\nWeb3 provider,\ninteracts with WalletConnection

        ProfileService --> UserProfileDB[(User Profile Database)]
        SettingsService --> UserSettingsDB[(User Settings Database)]
        Web3IntegrationService --> WalletConnection[(Wallet Connection)]
    end