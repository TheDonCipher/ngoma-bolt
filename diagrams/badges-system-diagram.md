# Badges System Diagram

```mermaid
graph LR
    subgraph Badges System
        User --> Action[User Action (e.g., Listen to Track, Purchase Album)]
        note top of Action: Triggers badge\nawarding process
        Action --> BadgeLogicService[Badge Logic Service]
        BadgeLogicService --> BadgeAwardCriteriaDB[(Badge Award Criteria Database)]
        BadgeLogicService --> UserBadgeService
        note right of BadgeLogicService: Core logic for\nbadge awarding,\nrule engine,\ncriteria checking
        note right of BadgeAwardCriteriaDB: Stores badge award\ncriteria and rules\nfor BadgeLogicService
        BadgeLogicService --> NotificationService[Notification Service]

        UserBadgeService --> UserBadgesDB[(User Badges Database)]
        UserBadgeService --> BadgeDefinitionsDB[(Badge Definitions Database)]
        note right of UserBadgeService: Manages user badges,\nprogress tracking,\ninteractions with\nUserBadgesDB & BadgeDefinitionsDB
        NotificationService --> User[User]
        note right of NotificationService: Sends badge earned\nnotifications to Users\n(in-app, email, etc.)
        note right of UserBadgesDB: Stores user-badge\nrelationships,\naward dates,\nprogress
        note right of BadgeDefinitionsDB: Stores badge\ndefinitions,\nnames, descriptions,\ntiers (optional)

        subgraph Admin Dashboard
            AdminUser[Admin User] --> BadgeManagementUI[Badge Management UI]
            BadgeManagementUI --> BadgeService[Badge Service]
            BadgeService --> BadgeDefinitionsDB
        end
        note right of BadgeManagementUI: Admin UI for\nmanaging badges
        note right of BadgeService: Provides admin API\nfor badge management,\ninteracts with BadgeDefinitionsDB

        subgraph Fan Dashboard
            FanUser[Fan User] --> FanBadgesUI[Fan Badges UI]
            FanBadgesUI --> UserBadgeService
            FanBadgesUI --> BadgeDescriptionUI[Badge Description UI]
        end
        note right of FanBadgesUI: UI to display\nearned badges\nto fans
        note right of BadgeDescriptionUI: UI to display\ndetailed badge\ndescriptions
    end