import { Track } from '@/lib/types/track';
import { create } from 'zustand';

export type RepeatMode = 'off' | 'one' | 'all';

export interface PlayerStore {
  currentTrack: Track | null;
  playlist: Track[];
  isPlaying: boolean;
  volume: number;
  progress: number;
  isShuffled: boolean;
  repeatMode: RepeatMode;

  // Actions
  setCurrentTrack: (track: Track | null) => void;
  setPlaylist: (tracks: Track[]) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  addToPlaylist: (track: Track) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentTrack: null,
  playlist: [],
  isPlaying: false,
  volume: 0.8,
  progress: 0,
  isShuffled: false,
  repeatMode: 'off',

  setCurrentTrack: (track) => set({ currentTrack: track }),
  setPlaylist: (tracks) => set({ playlist: tracks }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),

  toggleShuffle: () => set((state) => ({ isShuffled: !state.isShuffled })),
  toggleRepeat: () => {
    const current = get().repeatMode;
    const modes: RepeatMode[] = ['off', 'one', 'all'];
    const nextIndex = (modes.indexOf(current) + 1) % modes.length;
    set({ repeatMode: modes[nextIndex] });
  },

  nextTrack: () => {
    const { currentTrack, playlist, repeatMode, isShuffled } = get();
    if (!currentTrack || playlist.length === 0) return;

    if (repeatMode === 'one') {
      // Just restart the current track
      set({ progress: 0 });
      return;
    }

    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    let nextIndex = 0;

    if (isShuffled) {
      // Get random index that's not the current one
      if (playlist.length > 1) {
        do {
          nextIndex = Math.floor(Math.random() * playlist.length);
        } while (nextIndex === currentIndex);
      }
    } else {
      // Go to next track or back to first
      nextIndex = currentIndex + 1;
      if (nextIndex >= playlist.length) {
        if (repeatMode === 'all') {
          nextIndex = 0;
        } else {
          // End of playlist and not repeating
          return;
        }
      }
    }

    set({ currentTrack: playlist[nextIndex], progress: 0 });
  },

  previousTrack: () => {
    const { currentTrack, playlist, isShuffled } = get();
    if (!currentTrack || playlist.length === 0) return;

    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    let prevIndex = 0;

    if (isShuffled) {
      // Get random index that's not the current one
      if (playlist.length > 1) {
        do {
          prevIndex = Math.floor(Math.random() * playlist.length);
        } while (prevIndex === currentIndex);
      }
    } else {
      // Go to previous track or to last if at beginning
      prevIndex = currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = playlist.length - 1;
      }
    }

    set({ currentTrack: playlist[prevIndex], progress: 0 });
  },

  addToPlaylist: (track) => {
    set((state) => {
      // Don't add duplicates
      if (state.playlist.some((t) => t.id === track.id)) {
        return state;
      }
      return { playlist: [...state.playlist, track] };
    });
  },
}));
