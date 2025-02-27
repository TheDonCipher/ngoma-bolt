# Tracks Playback Functionality Diagram

```mermaid
graph LR
    subgraph Tracks Playback
        User --> AudioPlayerUI[Audio Player UI]
        AudioPlayerUI --> AudioPlayerComponent[Audio Player Component]
        AudioPlayerUI --> PlaylistDrawerUI[Playlist Drawer UI]
        AudioPlayerUI --> TrackMetadataDisplayUI[Track Metadata Display UI]

        AudioPlayerComponent --> AudioStreamingService[Audio Streaming Service]
        AudioStreamingService --> TrackAudioFiles[(Track Audio Files Storage)]
        note right of AudioPlayerComponent: Core audio playback\nlogic, UI controls,\nintegrates with\nAudioStreamingService
        note right of AudioStreamingService: Handles audio streaming,\nmanages track audio\nfiles, CDN (optional)

        PlaylistDrawerUI --> PlaylistManagementService
        PlaylistManagementService --> PlaylistDB[(Playlist Database)]
        note right of PlaylistDrawerUI: UI for displaying\nand managing\nplaylists & queue
        User --> PlaylistDrawerUI
        note right of PlaylistManagementService: Handles playlist\nmanagement logic\n(create, add, remove,\nreorder),\nstores in PlaylistDB
        User --> TrackProgressBarUI[Track Progress Bar UI]
        TrackProgressBarUI --> AudioPlayerComponent
        User --> VolumeControlUI[Volume Control UI]
        VolumeControlUI --> AudioPlayerComponent
        note right of TrackProgressBarUI: UI for displaying\n& controlling\nplayback progress
        note right of VolumeControlUI: UI for controlling\naudio volume
    end