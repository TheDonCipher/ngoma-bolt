# Ngoma Frontend Implementation Guide

This document provides detailed instructions for implementing the frontend components of the Ngoma platform.

## Frontend Architecture Overview

The Ngoma frontend is built using Next.js and follows a component-based architecture with clear separation of concerns. The frontend communicates with the backend via RESTful API endpoints.

**Key References:**

- [Authentication Flow Diagram](../diagrams/auth-flow-diagram.md) - Details client-side auth flow
- [Admin Dashboard Diagram](../diagrams/admin-dashboard-diagram.md) - Admin UI structure
- [Artist Dashboard Diagram](../diagrams/artist-dashboard-diagram.md) - Artist UI structure
- [Albums Feature Diagram](../diagrams/albums-feature-diagram.md) - Album component relationships

## Project Structure

Organize your Next.js project with the following structure:

```
src/
├── components/      # Reusable UI components
│   ├── common/      # Common UI elements
│   ├── layouts/     # Page layouts
│   ├── auth/        # Authentication components
│   ├── music/       # Music-related components
│   ├── admin/       # Admin dashboard components
│   ├── artist/      # Artist dashboard components
│   └── nft/         # NFT-related components
├── pages/           # Next.js pages
│   ├── admin/       # Admin routes
│   ├── artist/      # Artist routes
│   ├── auth/        # Auth routes (login, register)
│   └── api/         # API routes
├── hooks/           # Custom React hooks
├── contexts/        # React context providers
├── services/        # API service modules
├── utils/           # Utility functions
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

**Technical Note:** This structure follows Next.js best practices while providing clear organization for features. The separation of concerns makes it easier to maintain and extend the application.

## Layout and Navigation

1. **Implement Core Layout Components:**

   Create a main layout component that wraps all pages:

   ```tsx
   // src/components/layouts/MainLayout.jsx
   import Head from 'next/head';
   import Navbar from '../nav/Navbar';
   import Footer from './Footer';
   import MusicPlayer from '../music/MusicPlayer';
   import { useAuth } from '../../hooks/useAuth';

   export default function MainLayout({ children, title = 'Ngoma Music' }) {
     const { user } = useAuth();

     return (
       <>
         <Head>
           <title>{title} | Ngoma</title>
           <meta name="description" content="Ngoma music platform" />
           <link rel="icon" href="/favicon.ico" />
         </Head>

         <div className="flex flex-col min-h-screen">
           <Navbar />

           <main className="flex-grow">{children}</main>

           <Footer />

           {/* Persistent music player for logged-in users */}
           {user && <MusicPlayer />}
         </div>
       </>
     );
   }
   ```

   **Layout Note:** This layout includes a persistent music player that appears only for logged-in users, as well as a consistent navigation bar and footer.

2. **Responsive Design:**

   Use Tailwind CSS utility classes for responsive design:

   ```tsx
   // src/components/nav/Navbar.jsx
   import { useState } from 'react';
   import Link from 'next/link';
   import { useAuth } from '../../hooks/useAuth';
   import { MenuIcon, XIcon } from '@heroicons/react/outline';
   import { WalletConnectButton } from '../web3/WalletConnectButton';

   export default function Navbar() {
     const { user, logout } = useAuth();
     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

     // Render different navigation items based on user role
     const renderNavItems = () => {
       if (!user) {
         return (
           <Link
             href="/auth/login"
             className="px-3 py-2 rounded-md font-medium hover:bg-gray-800"
           >
             Login
           </Link>
         );
       }

       const navItems = [
         <Link
           key="profile"
           href="/profile"
           className="px-3 py-2 rounded-md font-medium hover:bg-gray-800"
         >
           Profile
         </Link>,
         <button
           key="logout"
           onClick={logout}
           className="px-3 py-2 rounded-md font-medium hover:bg-gray-800"
         >
           Logout
         </button>,
       ];

       // Add role-specific navigation items
       if (user.roles.includes('admin')) {
         navItems.unshift(
           <Link
             key="admin"
             href="/admin"
             className="px-3 py-2 rounded-md font-medium hover:bg-gray-800 text-blue-400"
           >
             Admin Dashboard
           </Link>
         );
       }

       if (user.roles.includes('artist')) {
         navItems.unshift(
           <Link
             key="artist"
             href="/artist"
             className="px-3 py-2 rounded-md font-medium hover:bg-gray-800 text-green-400"
           >
             Artist Dashboard
           </Link>
         );
       }

       return navItems;
     };

     return (
       <nav className="bg-gray-900 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between h-16">
             {/* Logo */}
             <div className="flex-shrink-0">
               <Link href="/">
                 <span className="text-xl font-bold">NGOMA</span>
               </Link>
             </div>

             {/* Desktop Navigation */}
             <div className="hidden md:block">
               <div className="ml-10 flex items-center space-x-4">
                 <Link
                   href="/explore"
                   className="px-3 py-2 rounded-md font-medium hover:bg-gray-800"
                 >
                   Explore
                 </Link>
                 {renderNavItems()}
                 {/* Wallet Connect Button - always visible but inactive for non-logged in users */}
                 <WalletConnectButton />
               </div>
             </div>

             {/* Mobile Menu Button */}
             <div className="-mr-2 flex md:hidden">
               <button
                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-800 focus:text-white"
               >
                 <span className="sr-only">Open main menu</span>
                 {mobileMenuOpen ? (
                   <XIcon className="block h-6 w-6" aria-hidden="true" />
                 ) : (
                   <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                 )}
               </button>
             </div>
           </div>
         </div>

         {/* Mobile Navigation */}
         {mobileMenuOpen && (
           <div className="md:hidden">
             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
               <Link
                 href="/explore"
                 className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800"
               >
                 Explore
               </Link>
               {/* Render mobile navigation items here */}
               {/* Similar to desktop but with block display */}
               <WalletConnectButton mobile={true} />
             </div>
           </div>
         )}
       </nav>
     );
   }
   ```

   **Responsive Design Note:** The navbar implements a responsive design with a mobile menu that appears on smaller screens. It also dynamically renders different navigation items based on the user's role.

3. **Routing Setup:**

   Configure Next.js routing for different user roles following the diagram structures:

   ```tsx
   // src/components/auth/ProtectedRoute.jsx
   import { useRouter } from 'next/router';
   import { useEffect } from 'react';
   import { useAuth } from '../../hooks/useAuth';

   export default function ProtectedRoute({ children, requiredRoles = [] }) {
     const { user, loading } = useAuth();
     const router = useRouter();

     useEffect(() => {
       // Wait for auth to initialize
       if (loading) return;

       // Redirect to login if not authenticated
       if (!user) {
         router.push({
           pathname: '/auth/login',
           query: { returnUrl: router.asPath },
         });
         return;
       }

       // Check for required roles if any
       if (requiredRoles.length > 0) {
         const hasRequiredRole = requiredRoles.some((role) =>
           user.roles.includes(role)
         );

         if (!hasRequiredRole) {
           router.push('/access-denied');
         }
       }
     }, [user, loading, requiredRoles, router]);

     // Show loading while checking auth
     if (loading || !user) {
       return <div>Loading...</div>;
     }

     // If roles are required but user doesn't have them, don't render content
     if (requiredRoles.length > 0) {
       const hasRequiredRole = requiredRoles.some((role) =>
         user.roles.includes(role)
       );

       if (!hasRequiredRole) {
         return null;
       }
     }

     return <>{children}</>;
   }
   ```

   **Route Implementation Example:**

   ```tsx
   // src/pages/admin/index.jsx
   import ProtectedRoute from '../../components/auth/ProtectedRoute';
   import AdminDashboard from '../../components/admin/AdminDashboard';
   import MainLayout from '../../components/layouts/MainLayout';

   export default function AdminPage() {
     return (
       <ProtectedRoute requiredRoles={['admin']}>
         <MainLayout title="Admin Dashboard">
           <AdminDashboard />
         </MainLayout>
       </ProtectedRoute>
     );
   }
   ```

   **Artist Page Example:**

   ```tsx
   // src/pages/artist/index.jsx
   import ProtectedRoute from '../../components/auth/ProtectedRoute';
   import ArtistDashboard from '../../components/artist/ArtistDashboard';
   import MainLayout from '../../components/layouts/MainLayout';

   export default function ArtistPage() {
     return (
       <ProtectedRoute requiredRoles={['artist']}>
         <MainLayout title="Artist Dashboard">
           <ArtistDashboard />
         </MainLayout>
       </ProtectedRoute>
     );
   }
   ```

## Authentication Implementation

Implement the frontend auth flow as specified in the [Authentication Flow Diagram](../diagrams/auth-flow-diagram.md):

1. **Auth Context Provider:**

   ```tsx
   // src/contexts/AuthContext.jsx
   import { createContext, useReducer, useEffect } from 'react';
   import { authService } from '../services/authService';

   export const AuthContext = createContext();

   const initialState = {
     user: null,
     loading: true,
     error: null,
   };

   function authReducer(state, action) {
     switch (action.type) {
       case 'AUTH_PENDING':
         return { ...state, loading: true, error: null };
       case 'AUTH_SUCCESS':
         return { ...state, user: action.payload, loading: false };
       case 'AUTH_FAILURE':
         return { ...state, error: action.payload, loading: false };
       case 'LOGOUT':
         return { ...state, user: null };
       default:
         return state;
     }
   }

   export function AuthProvider({ children }) {
     const [state, dispatch] = useReducer(authReducer, initialState);

     // Check for existing auth on mount
     useEffect(() => {
       const initAuth = async () => {
         try {
           // Try to get user from token in localStorage/cookie
           const user = await authService.getCurrentUser();
           dispatch({ type: 'AUTH_SUCCESS', payload: user });
         } catch (error) {
           dispatch({ type: 'AUTH_FAILURE', payload: error.message });
           console.error('Auth initialization failed:', error);
         }
       };

       initAuth();
     }, []);

     // Login function
     const login = async (credentials) => {
       dispatch({ type: 'AUTH_PENDING' });
       try {
         const user = await authService.login(credentials);
         dispatch({ type: 'AUTH_SUCCESS', payload: user });
         return user;
       } catch (error) {
         dispatch({ type: 'AUTH_FAILURE', payload: error.message });
         throw error;
       }
     };

     // Logout function
     const logout = async () => {
       await authService.logout();
       dispatch({ type: 'LOGOUT' });
     };

     // Register function
     const register = async (userData) => {
       dispatch({ type: 'AUTH_PENDING' });
       try {
         const user = await authService.register(userData);
         dispatch({ type: 'AUTH_SUCCESS', payload: user });
         return user;
       } catch (error) {
         dispatch({ type: 'AUTH_FAILURE', payload: error.message });
         throw error;
       }
     };

     return (
       <AuthContext.Provider
         value={{
           ...state,
           login,
           logout,
           register,
         }}
       >
         {children}
       </AuthContext.Provider>
     );
   }
   ```

2. **Auth Service Implementation:**

   ```tsx
   // src/services/authService.js
   import { apiClient } from './apiClient';

   const ACCESS_TOKEN_KEY = 'ngoma_access_token';

   export const authService = {
     // Login user and store token
     async login(credentials) {
       const response = await apiClient.post('/auth/login', credentials);
       const { access_token, user } = response.data;

       // Store token
       localStorage.setItem(ACCESS_TOKEN_KEY, access_token);

       // Configure API client with auth header
       apiClient.defaults.headers.common['Authorization'] =
         `Bearer ${access_token}`;

       return user;
     },

     // Logout user and remove token
     async logout() {
       try {
         // Call logout endpoint (optional)
         await apiClient.post('/auth/logout');
       } catch (error) {
         console.error('Logout API error:', error);
       } finally {
         // Remove token regardless of API call success
         localStorage.removeItem(ACCESS_TOKEN_KEY);
         delete apiClient.defaults.headers.common['Authorization'];
       }
     },

     // Register new user
     async register(userData) {
       const response = await apiClient.post('/auth/register', userData);
       const { access_token, user } = response.data;

       // Store token
       localStorage.setItem(ACCESS_TOKEN_KEY, access_token);

       // Configure API client with auth header
       apiClient.defaults.headers.common['Authorization'] =
         `Bearer ${access_token}`;

       return user;
     },

     // Get current authenticated user
     async getCurrentUser() {
       // Check if token exists
       const token = localStorage.getItem(ACCESS_TOKEN_KEY);
       if (!token) {
         return null;
       }

       // Set auth header
       apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

       try {
         // Get user profile
         const response = await apiClient.get('/users/me');
         return response.data;
       } catch (error) {
         // Handle expired or invalid token
         localStorage.removeItem(ACCESS_TOKEN_KEY);
         delete apiClient.defaults.headers.common['Authorization'];
         throw error;
       }
     },

     // Get stored token
     getToken() {
       return localStorage.getItem(ACCESS_TOKEN_KEY);
     },
   };
   ```

3. **Auth Hook:**

   ```tsx
   // src/hooks/useAuth.js
   import { useContext } from 'react';
   import { AuthContext } from '../contexts/AuthContext';

   export function useAuth() {
     const context = useContext(AuthContext);

     if (!context) {
       throw new Error('useAuth must be used within an AuthProvider');
     }

     return context;
   }
   ```

4. **Auth Forms:**

   ```tsx
   // src/components/auth/LoginForm.jsx
   import { useState } from 'react';
   import { useRouter } from 'next/router';
   import { useAuth } from '../../hooks/useAuth';

   export default function LoginForm() {
     const [credentials, setCredentials] = useState({
       email: '',
       password: '',
     });
     const [error, setError] = useState('');
     const [isLoading, setIsLoading] = useState(false);
     const { login } = useAuth();
     const router = useRouter();
     const returnUrl = router.query.returnUrl || '/';

     const handleChange = (e) => {
       const { name, value } = e.target;
       setCredentials((prev) => ({
         ...prev,
         [name]: value,
       }));
     };

     const handleSubmit = async (e) => {
       e.preventDefault();
       setError('');
       setIsLoading(true);

       try {
         await login(credentials);
         router.push(returnUrl);
       } catch (error) {
         setError(
           error.message || 'Login failed. Please check your credentials.'
         );
       } finally {
         setIsLoading(false);
       }
     };

     return (
       <div className="max-w-md w-full space-y-8">
         <div>
           <h2 className="mt-6 text-center text-3xl font-extrabold">
             Sign in to your account
           </h2>
         </div>

         {error && (
           <div className="rounded-md bg-red-50 p-4">
             <div className="text-sm text-red-700">{error}</div>
           </div>
         )}

         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
           <div className="rounded-md shadow-sm -space-y-px">
             <div>
               <label htmlFor="email" className="sr-only">
                 Email address
               </label>
               <input
                 id="email"
                 name="email"
                 type="email"
                 autoComplete="email"
                 required
                 value={credentials.email}
                 onChange={handleChange}
                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                 placeholder="Email address"
               />
             </div>
             <div>
               <label htmlFor="password" className="sr-only">
                 Password
               </label>
               <input
                 id="password"
                 name="password"
                 type="password"
                 autoComplete="current-password"
                 required
                 value={credentials.password}
                 onChange={handleChange}
                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                 placeholder="Password"
               />
             </div>
           </div>

           <div>
             <button
               type="submit"
               disabled={isLoading}
               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
             >
               {isLoading ? 'Signing in...' : 'Sign in'}
             </button>
           </div>
         </form>
       </div>
     );
   }
   ```

## Music Player Implementation

As shown in the [Albums Feature Diagram](../diagrams/albums-feature-diagram.md), the music player is a core component of the platform:

1. **Music Player Context:**

   ```tsx
   // src/contexts/MusicPlayerContext.jsx
   import { createContext, useReducer, useRef } from 'react';

   export const MusicPlayerContext = createContext();

   const initialState = {
     currentTrack: null,
     playlist: [],
     isPlaying: false,
     volume: 0.7,
     currentTime: 0,
     duration: 0,
   };

   function playerReducer(state, action) {
     switch (action.type) {
       case 'SET_TRACK':
         return { ...state, currentTrack: action.payload, currentTime: 0 };
       case 'SET_PLAYLIST':
         return { ...state, playlist: action.payload };
       case 'PLAY':
         return { ...state, isPlaying: true };
       case 'PAUSE':
         return { ...state, isPlaying: false };
       case 'SET_VOLUME':
         return { ...state, volume: action.payload };
       case 'UPDATE_TIME':
         return { ...state, currentTime: action.payload };
       case 'SET_DURATION':
         return { ...state, duration: action.payload };
       default:
         return state;
     }
   }

   export function MusicPlayerProvider({ children }) {
     const [state, dispatch] = useReducer(playerReducer, initialState);
     const audioRef = useRef(null);

     // Play a track
     const playTrack = (track) => {
       dispatch({ type: 'SET_TRACK', payload: track });
       dispatch({ type: 'PLAY' });
     };

     // Play a specific playlist
     const playPlaylist = (tracks, initialTrackIndex = 0) => {
       dispatch({ type: 'SET_PLAYLIST', payload: tracks });
       if (tracks.length > 0) {
         dispatch({ type: 'SET_TRACK', payload: tracks[initialTrackIndex] });
         dispatch({ type: 'PLAY' });
       }
     };

     // Toggle play/pause
     const togglePlay = () => {
       if (state.isPlaying) {
         dispatch({ type: 'PAUSE' });
         audioRef.current?.pause();
       } else {
         dispatch({ type: 'PLAY' });
         audioRef.current?.play();
       }
     };

     // Skip to next track
     const nextTrack = () => {
       const currentIndex = state.playlist.findIndex(
         (track) => track.id === state.currentTrack?.id
       );

       if (currentIndex >= 0 && currentIndex < state.playlist.length - 1) {
         dispatch({
           type: 'SET_TRACK',
           payload: state.playlist[currentIndex + 1],
         });
         dispatch({ type: 'PLAY' });
       }
     };

     // Skip to previous track
     const prevTrack = () => {
       const currentIndex = state.playlist.findIndex(
         (track) => track.id === state.currentTrack?.id
       );

       if (currentIndex > 0) {
         dispatch({
           type: 'SET_TRACK',
           payload: state.playlist[currentIndex - 1],
         });
         dispatch({ type: 'PLAY' });
       }
     };

     // Set volume
     const setVolume = (volume) => {
       dispatch({ type: 'SET_VOLUME', payload: volume });
       if (audioRef.current) {
         audioRef.current.volume = volume;
       }
     };

     // Seek to position
     const seek = (time) => {
       if (audioRef.current) {
         audioRef.current.currentTime = time;
       }
     };

     return (
       <MusicPlayerContext.Provider
         value={{
           ...state,
           audioRef,
           playTrack,
           playPlaylist,
           togglePlay,
           nextTrack,
           prevTrack,
           setVolume,
           seek,
           updateCurrentTime: (time) =>
             dispatch({ type: 'UPDATE_TIME', payload: time }),
           setDuration: (duration) =>
             dispatch({ type: 'SET_DURATION', payload: duration }),
         }}
       >
         {children}
       </MusicPlayerContext.Provider>
     );
   }
   ```

2. **Music Player Component:**

   ```tsx
   // src/components/music/MusicPlayer.jsx
   import { useEffect, useCallback } from 'react';
   import { useMusicPlayer } from '../../hooks/useMusicPlayer';
   import { formatTime } from '../../utils/formatTime';
   import {
     PlayIcon,
     PauseIcon,
     SkipPreviousIcon,
     SkipNextIcon,
     VolumeUpIcon,
     VolumeOffIcon,
   } from '@heroicons/react/solid';

   export default function MusicPlayer() {
     const {
       audioRef,
       currentTrack,
       isPlaying,
       volume,
       currentTime,
       duration,
       togglePlay,
       nextTrack,
       prevTrack,
       setVolume,
       seek,
       updateCurrentTime,
       setDuration,
     } = useMusicPlayer();

     // Handle audio events
     useEffect(() => {
       const audio = audioRef.current;

       if (!audio) return;

       const handleTimeUpdate = () => {
         updateCurrentTime(audio.currentTime);
       };

       const handleLoadedMetadata = () => {
         setDuration(audio.duration);
       };

       const handleEnded = () => {
         nextTrack();
       };

       // Add event listeners
       audio.addEventListener('timeupdate', handleTimeUpdate);
       audio.addEventListener('loadedmetadata', handleLoadedMetadata);
       audio.addEventListener('ended', handleEnded);

       // Set volume
       audio.volume = volume;

       // Play/pause based on state
       if (isPlaying) {
         audio.play().catch((error) => {
           console.error('Error playing audio:', error);
         });
       } else {
         audio.pause();
       }

       // Cleanup
       return () => {
         audio.removeEventListener('timeupdate', handleTimeUpdate);
         audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
         audio.removeEventListener('ended', handleEnded);
       };
     }, [
       isPlaying,
       volume,
       nextTrack,
       updateCurrentTime,
       setDuration,
       audioRef,
     ]);

     // Update audio src when track changes
     useEffect(() => {
       const audio = audioRef.current;

       if (!audio || !currentTrack) return;

       audio.src = currentTrack.audioUrl;
       audio.load();

       if (isPlaying) {
         audio.play().catch((error) => {
           console.error('Error playing audio:', error);
         });
       }
     }, [currentTrack, isPlaying, audioRef]);

     // Handle slider change
     const handleSeek = useCallback(
       (e) => {
         seek(parseFloat(e.target.value));
       },
       [seek]
     );

     // Handle volume change
     const handleVolumeChange = useCallback(
       (e) => {
         setVolume(parseFloat(e.target.value));
       },
       [setVolume]
     );

     if (!currentTrack) {
       return null;
     }

     return (
       <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4">
         <audio ref={audioRef} />

         <div className="flex items-center max-w-7xl mx-auto">
           {/* Album art and track info */}
           <div className="flex-shrink-0 mr-4">
             <img
               src={currentTrack.coverArt || '/default-cover.png'}
               alt={currentTrack.title}
               className="h-12 w-12 rounded-md shadow-sm"
             />
           </div>

           <div className="flex-1 mr-6">
             <div className="text-sm font-medium">{currentTrack.title}</div>
             <div className="text-xs text-gray-400">
               {currentTrack.artist?.name}
             </div>
           </div>

           {/* Playback controls */}
           <div className="flex flex-col flex-1 items-center">
             <div className="flex items-center space-x-4">
               <button
                 className="text-gray-400 hover:text-white focus:outline-none"
                 onClick={prevTrack}
               >
                 <SkipPreviousIcon className="h-6 w-6" />
               </button>

               <button
                 className="bg-white text-gray-900 rounded-full p-1 hover:bg-gray-200 focus:outline-none"
                 onClick={togglePlay}
               >
                 {isPlaying ? (
                   <PauseIcon className="h-8 w-8" />
                 ) : (
                   <PlayIcon className="h-8 w-8" />
                 )}
               </button>

               <button
                 className="text-gray-400 hover:text-white focus:outline-none"
                 onClick={nextTrack}
               >
                 <SkipNextIcon className="h-6 w-6" />
               </button>
             </div>

             {/* Progress bar */}
             <div className="flex items-center w-full mt-2">
               <span className="text-xs mr-2">{formatTime(currentTime)}</span>

               <input
                 type="range"
                 min="0"
                 max={duration || 1}
                 value={currentTime}
                 onChange={handleSeek}
                 className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
               />

               <span className="text-xs ml-2">{formatTime(duration)}</span>
             </div>
           </div>

           {/* Volume control */}
           <div className="flex items-center ml-6 space-x-2">
             <button
               className="text-gray-400 hover:text-white focus:outline-none"
               onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
             >
               {volume === 0 ? (
                 <VolumeOffIcon className="h-5 w-5" />
               ) : (
                 <VolumeUpIcon className="h-5 w-5" />
               )}
             </button>

             <input
               type="range"
               min="0"
               max="1"
               step="0.01"
               value={volume}
               onChange={handleVolumeChange}
               className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
             />
           </div>
         </div>
       </div>
     );
   }
   ```

3. **Music Player Hook:**

   ```tsx
   // src/hooks/useMusicPlayer.js
   import { useContext } from 'react';
   import { MusicPlayerContext } from '../contexts/MusicPlayerContext';

   export function useMusicPlayer() {
     const context = useContext(MusicPlayerContext);

     if (!context) {
       throw new Error(
         'useMusicPlayer must be used within a MusicPlayerProvider'
       );
     }

     return context;
   }
   ```

## Web3 Integration Components

Following the [Artist Dashboard Diagram](../diagrams/artist-dashboard-diagram.md) for NFT functionality:

1. **Web3 Context Provider:**

   ```tsx
   // src/contexts/Web3Context.jsx
   import { createContext, useState, useEffect, useCallback } from 'react';
   import { ethers } from 'ethers';
   import { nftService } from '../services/nftService';

   export const Web3Context = createContext();

   export function Web3Provider({ children }) {
     const [account, setAccount] = useState(null);
     const [provider, setProvider] = useState(null);
     const [network, setNetwork] = useState(null);
     const [signer, setSigner] = useState(null);
     const [error, setError] = useState(null);
     const [connecting, setConnecting] = useState(false);
     const [nftContract, setNftContract] = useState(null);

     // Initialize ethers provider from window.ethereum
     useEffect(() => {
       const initProvider = async () => {
         if (window.ethereum) {
           try {
             // Create ethers provider from Metamask
             const provider = new ethers.providers.Web3Provider(
               window.ethereum
             );
             setProvider(provider);

             // Listen for account changes
             window.ethereum.on('accountsChanged', (accounts) => {
               if (accounts.length > 0) {
                 setAccount(accounts[0]);
               } else {
                 setAccount(null);
               }
             });

             // Listen for network changes
             window.ethereum.on('chainChanged', () => {
               // Refresh the page on network change
               window.location.reload();
             });

             // Get network info
             const network = await provider.getNetwork();
             setNetwork(network);

             // Initialize NFT contract
             initContract(provider);
           } catch (error) {
             setError('Error initializing Web3 provider');
             console.error('Web3 provider initialization error:', error);
           }
         } else {
           setError('No Ethereum wallet detected. Please install Metamask.');
         }
       };

       initProvider();

       // Cleanup listeners on unmount
       return () => {
         if (window.ethereum) {
           window.ethereum.removeAllListeners('accountsChanged');
           window.ethereum.removeAllListeners('chainChanged');
         }
       };
     }, []);

     // Initialize NFT contract
     const initContract = useCallback((provider) => {
       try {
         // Get NFT contract configuration (address, ABI) from service
         const contractConfig = nftService.getContractConfig();

         // Create contract instance
         const contract = new ethers.Contract(
           contractConfig.address,
           contractConfig.abi,
           provider
         );

         setNftContract(contract);
       } catch (error) {
         setError('Error initializing NFT contract');
         console.error('NFT contract initialization error:', error);
       }
     }, []);

     // Connect wallet
     const connectWallet = useCallback(async () => {
       if (!provider) {
         setError('No Web3 provider available');
         return;
       }

       setConnecting(true);
       setError(null);

       try {
         // Request account access
         const accounts = await window.ethereum.request({
           method: 'eth_requestAccounts',
         });

         if (accounts.length === 0) {
           setError('No accounts found');
           return;
         }

         // Set active account
         setAccount(accounts[0]);

         // Get signer
         const signer = provider.getSigner();
         setSigner(signer);

         // Link the wallet to the user account in backend
         if (accounts[0]) {
           try {
             await nftService.linkWallet(accounts[0]);
           } catch (linkError) {
             console.error('Error linking wallet to account:', linkError);
             // Don't fail the connection if linking fails
           }
         }
       } catch (error) {
         setError('Error connecting wallet: ' + error.message);
         console.error('Wallet connection error:', error);
       } finally {
         setConnecting(false);
       }
     }, [provider]);

     // Disconnect wallet
     const disconnectWallet = useCallback(async () => {
       setAccount(null);
       setSigner(null);

       // Note: There's no standard way to disconnect in Ethereum.
       // This just removes the reference in our app, but the wallet remains connected.

       // Unlink wallet from user account in backend
       try {
         await nftService.unlinkWallet();
       } catch (error) {
         console.error('Error unlinking wallet:', error);
       }
     }, []);

     // Mint NFT function
     const mintNFT = useCallback(
       async (metadataURI, options = {}) => {
         if (!signer || !nftContract || !account) {
           throw new Error('Wallet not connected or contract not initialized');
         }

         // Get contract with signer
         const contractWithSigner = nftContract.connect(signer);

         // Call mint function on the contract
         // The exact function name and parameters depend on your contract
         const transaction = await contractWithSigner.mint(
           account,
           metadataURI,
           options
         );

         // Wait for transaction to be confirmed
         const receipt = await transaction.wait();

         return receipt;
       },
       [signer, nftContract, account]
     );

     return (
       <Web3Context.Provider
         value={{
           account,
           provider,
           network,
           signer,
           error,
           connecting,
           nftContract,
           connectWallet,
           disconnectWallet,
           mintNFT,
         }}
       >
         {children}
       </Web3Context.Provider>
     );
   }
   ```

2. **Wallet Connect Button Component:**

   ```tsx
   // src/components/web3/WalletConnectButton.jsx
   import { useWeb3 } from '../../hooks/useWeb3';
   import { shortenAddress } from '../../utils/address';

   export function WalletConnectButton({ mobile = false }) {
     const { account, connectWallet, disconnectWallet, error, connecting } =
       useWeb3();

     const handleConnect = async () => {
       await connectWallet();
     };

     const handleDisconnect = async () => {
       await disconnectWallet();
     };

     // Mobile-friendly styles
     const buttonClass = mobile
       ? 'w-full text-left block px-3 py-2 rounded-md text-base font-medium'
       : 'px-4 py-2 rounded-md text-sm font-medium';

     if (connecting) {
       return (
         <button
           disabled
           className={`${buttonClass} bg-gray-700 text-gray-300 cursor-not-allowed`}
         >
           Connecting...
         </button>
       );
     }

     if (account) {
       return (
         <div className={mobile ? 'space-y-2' : 'flex items-center space-x-2'}>
           <span className={`${buttonClass} bg-green-800 text-green-200`}>
             {shortenAddress(account)}
           </span>
           <button
             onClick={handleDisconnect}
             className={`${buttonClass} bg-red-800 text-red-200 hover:bg-red-700`}
           >
             Disconnect
           </button>
         </div>
       );
     }

     return (
       <div className={mobile ? 'space-y-2' : 'flex items-center space-x-2'}>
         <button
           onClick={handleConnect}
           className={`${buttonClass} bg-blue-800 text-blue-200 hover:bg-blue-700`}
         >
           Connect Wallet
         </button>
         {error && <span className="text-red-500 text-sm">{error}</span>}
       </div>
     );
   }
   ```

3. **Web3 Hook:**

   ```tsx
   // src/hooks/useWeb3.js
   import { useContext } from 'react';
   import { Web3Context } from '../contexts/Web3Context';

   export function useWeb3() {
     const context = useContext(Web3Context);

     if (!context) {
       throw new Error('useWeb3 must be used within a Web3Provider');
     }

     return context;
   }
   ```

4. **NFT Service:**

   ```tsx
   // src/services/nftService.js
   import { apiClient } from './apiClient';
   import contractABI from '../abi/NgomaMusic.json'; // Import your contract ABI

   export const nftService = {
     // Get NFT contract configuration
     getContractConfig() {
       // In a real application, these might come from environment variables or API
       return {
         address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
         abi: contractABI,
       };
     },

     // Link wallet to user account
     async linkWallet(walletAddress) {
       const response = await apiClient.post('/users/link-wallet', {
         walletAddress,
       });
       return response.data;
     },

     // Unlink wallet from user account
     async unlinkWallet() {
       const response = await apiClient.post('/users/unlink-wallet');
       return response.data;
     },

     // Get NFTs owned by current user
     async getMyNFTs() {
       const response = await apiClient.get('/nfts/my-collection');
       return response.data;
     },

     // Verify ownership of specific NFT
     async verifyOwnership(tokenId) {
       const response = await apiClient.get(`/nfts/verify/${tokenId}`);
       return response.data.owned;
     },

     // Create NFT metadata
     async createMetadata(data) {
       const response = await apiClient.post('/nfts/metadata', data);
       return response.data;
     },

     // Initiate NFT minting process
     async mintNFT(metadataUri) {
       const response = await apiClient.post('/nfts', { metadataUri });
       return response.data;
     },
   };
   ```

## Artist Dashboard Implementation

Refer to the [Artist Dashboard Diagram](../diagrams/artist-dashboard-diagram.md) for structural guidance:

1. **Artist Dashboard Layout:**

   ```tsx
   // src/components/artist/ArtistDashboardLayout.jsx
   import { useState } from 'react';
   import Link from 'next/link';
   import { useRouter } from 'next/router';

   // Icons
   import {
     HomeIcon,
     MusicNoteIcon,
     CollectionIcon,
     CalendarIcon,
     ShoppingBagIcon,
     ChartBarIcon,
     CogIcon,
     MenuAlt2Icon,
     XIcon,
   } from '@heroicons/react/outline';

   export default function ArtistDashboardLayout({ children }) {
     const [sidebarOpen, setSidebarOpen] = useState(false);
     const router = useRouter();

     const navigation = [
       { name: 'Overview', href: '/artist', icon: HomeIcon },
       { name: 'Tracks', href: '/artist/tracks', icon: MusicNoteIcon },
       { name: 'Albums', href: '/artist/albums', icon: CollectionIcon },
       { name: 'Events', href: '/artist/events', icon: CalendarIcon },
       {
         name: 'Merchandise',
         href: '/artist/merchandise',
         icon: ShoppingBagIcon,
       },
       { name: 'Analytics', href: '/artist/analytics', icon: ChartBarIcon },
       { name: 'NFT Settings', href: '/artist/nft-settings', icon: CogIcon },
     ];

     // Check if the current route matches the nav item
     const isActive = (path) => router.pathname === path;

     return (
       <div className="h-screen flex overflow-hidden bg-gray-100">
         {/* Mobile sidebar */}
         <div
           className={`md:hidden ${sidebarOpen ? 'fixed inset-0 flex z-40' : 'hidden'}`}
         >
           <div
             className="fixed inset-0 bg-gray-600 bg-opacity-75"
             onClick={() => setSidebarOpen(false)}
             aria-hidden="true"
           />

           <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
             <div className="absolute top-0 right-0 -mr-12 pt-2">
               <button
                 type="button"
                 className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                 onClick={() => setSidebarOpen(false)}
               >
                 <XIcon className="h-6 w-6 text-white" />
               </button>
             </div>

             <div className="flex-shrink-0 flex items-center px-4">
               <span className="text-white text-2xl font-bold">
                 Artist Studio
               </span>
             </div>

             <div className="mt-5 flex-1 h-0 overflow-y-auto">
               <nav className="px-2 space-y-1">
                 {navigation.map((item) => (
                   <Link
                     key={item.name}
                     href={item.href}
                     className={`${
                       isActive(item.href)
                         ? 'bg-gray-900 text-white'
                         : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                     } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                   >
                     <item.icon
                       className={`${
                         isActive(item.href)
                           ? 'text-gray-300'
                           : 'text-gray-400 group-hover:text-gray-300'
                       } mr-4 flex-shrink-0 h-6 w-6`}
                     />
                     {item.name}
                   </Link>
                 ))}
               </nav>
             </div>
           </div>
         </div>

         {/* Desktop sidebar */}
         <div className="hidden md:flex md:flex-shrink-0">
           <div className="flex flex-col w-64">
             <div className="flex flex-col h-0 flex-1">
               <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                 <span className="text-white text-xl font-bold">
                   Artist Studio
                 </span>
               </div>
               <div className="flex-1 flex flex-col overflow-y-auto">
                 <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
                   {navigation.map((item) => (
                     <Link
                       key={item.name}
                       href={item.href}
                       className={`${
                         isActive(item.href)
                           ? 'bg-gray-900 text-white'
                           : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                       } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                     >
                       <item.icon
                         className={`${
                           isActive(item.href)
                             ? 'text-gray-300'
                             : 'text-gray-400 group-hover:text-gray-300'
                         } mr-3 flex-shrink-0 h-6 w-6`}
                       />
                       {item.name}
                     </Link>
                   ))}
                 </nav>
               </div>
             </div>
           </div>
         </div>

         {/* Main content */}
         <div className="flex flex-col w-0 flex-1 overflow-hidden">
           <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
             <button
               type="button"
               className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
               onClick={() => setSidebarOpen(true)}
             >
               <MenuAlt2Icon className="h-6 w-6" />
             </button>
           </div>

           <main className="flex-1 relative overflow-y-auto focus:outline-none">
             <div className="py-6">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                 {children}
               </div>
             </div>
           </main>
         </div>
       </div>
     );
   }
   ```

## Admin Dashboard Implementation

Following the [Admin Dashboard Diagram](../diagrams/admin-dashboard-diagram.md):

1. **Admin Dashboard Components:**

   ```tsx
   // src/components/admin/AdminDashboard.jsx
   import { useState, useEffect } from 'react';
   import { adminService } from '../../services/adminService';
   import MetricsCard from './MetricsCard';
   import Chart from './Chart';

   export default function AdminDashboard() {
     const [loading, setLoading] = useState(true);
     const [metrics, setMetrics] = useState({
       totalUsers: 0,
       totalTracks: 0,
       totalAlbums: 0,
       totalEvents: 0,
       newUsersTrend: [],
       contentDistribution: [],
     });

     useEffect(() => {
       const fetchMetrics = async () => {
         try {
           // Fetch overview metrics
           const platformOverview = await adminService.getPlatformOverview();

           // Fetch user metrics
           const userMetrics = await adminService.getUserMetrics();

           // Fetch content metrics
           const contentMetrics = await adminService.getContentMetrics();

           // Update state with all metrics
           setMetrics({
             totalUsers: platformOverview.totalUsers,
             totalTracks: platformOverview.totalTracks,
             totalAlbums: platformOverview.totalAlbums,
             totalEvents: platformOverview.totalEvents,
             newUsersTrend: userMetrics.newUsersTrend,
             contentDistribution: contentMetrics.contentDistribution,
           });
         } catch (error) {
           console.error('Error fetching metrics:', error);
         } finally {
           setLoading(false);
         }
       };

       fetchMetrics();
     }, []);

     if (loading) {
       return (
         <div className="text-center py-10">Loading dashboard metrics...</div>
       );
     }

     return (
       <div className="space-y-6">
         <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

         {/* Key metrics */}
         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
           <MetricsCard
             title="Total Users"
             value={metrics.totalUsers}
             icon="users"
             trend="up"
             color="blue"
           />
           <MetricsCard
             title="Total Tracks"
             value={metrics.totalTracks}
             icon="music"
             color="purple"
           />
           <MetricsCard
             title="Total Albums"
             value={metrics.totalAlbums}
             icon="collection"
             color="green"
           />
           <MetricsCard
             title="Total Events"
             value={metrics.totalEvents}
             icon="calendar"
             color="orange"
           />
         </div>

         {/* Charts */}
         <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
           <div className="bg-white overflow-hidden shadow rounded-lg">
             <div className="p-5">
               <h3 className="text-lg font-medium leading-6 text-gray-900">
                 New User Signups
               </h3>
               <Chart
                 type="line"
                 data={metrics.newUsersTrend}
                 height={300}
                 options={{
                   xAxis: { dataKey: 'date' },
                   yAxis: { dataKey: 'count', name: 'Users' },
                 }}
               />
             </div>
           </div>

           <div className="bg-white overflow-hidden shadow rounded-lg">
             <div className="p-5">
               <h3 className="text-lg font-medium leading-6 text-gray-900">
                 Content Distribution
               </h3>
               <Chart
                 type="pie"
                 data={metrics.contentDistribution}
                 height={300}
                 options={{
                   dataKey: 'value',
                   nameKey: 'name',
                   colors: ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'],
                 }}
               />
             </div>
           </div>
         </div>

         {/* Recent activity or additional metrics could go here */}
       </div>
     );
   }
   ```

2. **Admin Metrics Card Component:**

   ```tsx
   // src/components/admin/MetricsCard.jsx
   import {
     UsersIcon,
     MusicNoteIcon,
     CollectionIcon,
     CalendarIcon,
     ShoppingBagIcon,
     CurrencyDollarIcon,
     TrendingUpIcon,
     TrendingDownIcon,
   } from '@heroicons/react/outline';

   export default function MetricsCard({ title, value, icon, trend, color }) {
     // Determine icon component
     const IconComponent = () => {
       switch (icon) {
         case 'users':
           return <UsersIcon className={`h-10 w-10 text-${color}-500`} />;
         case 'music':
           return <MusicNoteIcon className={`h-10 w-10 text-${color}-500`} />;
         case 'collection':
           return <CollectionIcon className={`h-10 w-10 text-${color}-500`} />;
         case 'calendar':
           return <CalendarIcon className={`h-10 w-10 text-${color}-500`} />;
         case 'shopping':
           return <ShoppingBagIcon className={`h-10 w-10 text-${color}-500`} />;
         case 'revenue':
           return (
             <CurrencyDollarIcon className={`h-10 w-10 text-${color}-500`} />
           );
         default:
           return null;
       }
     };

     return (
       <div className="bg-white overflow-hidden shadow rounded-lg">
         <div className="p-5">
           <div className="flex items-center">
             <div className="flex-shrink-0">
               <IconComponent />
             </div>
             <div className="ml-5 w-0 flex-1">
               <dl>
                 <dt className="text-sm font-medium text-gray-500 truncate">
                   {title}
                 </dt>
                 <dd>
                   <div className="text-lg font-bold text-gray-900">
                     {value.toLocaleString()}
                   </div>
                 </dd>
               </dl>
             </div>
           </div>
         </div>
         {trend && (
           <div className={`bg-${color}-50 px-5 py-3`}>
             <div className="flex items-center">
               {trend === 'up' ? (
                 <TrendingUpIcon className={`h-5 w-5 text-${color}-500`} />
               ) : (
                 <TrendingDownIcon className={`h-5 w-5 text-red-500`} />
               )}
               <span
                 className={`ml-2 text-sm font-medium ${trend === 'up' ? `text-${color}-600` : 'text-red-600'}`}
               >
                 {trend === 'up' ? 'Increasing' : 'Decreasing'}
               </span>
             </div>
           </div>
         )}
       </div>
     );
   }
   ```

## Performance and Accessibility Considerations

1. **Implement Next.js Image Optimization:**

   ```tsx
   // Example of using Next.js Image component
   import Image from 'next/image';

   export function AlbumCover({ album }) {
     return (
       <div className="relative w-48 h-48">
         <Image
           src={album.coverArt || '/default-album-cover.jpg'}
           alt={album.title}
           layout="fill"
           objectFit="cover"
           className="rounded-lg"
           priority={false}
           loading="lazy"
         />
       </div>
     );
   }
   ```

2. **Implement Code Splitting:**

   ```tsx
   // Example of dynamic import with Next.js
   // src/pages/artist/analytics.js
   import dynamic from 'next/dynamic';
   import ProtectedRoute from '../../components/auth/ProtectedRoute';
   import ArtistDashboardLayout from '../../components/artist/ArtistDashboardLayout';

   // Dynamically import heavy components
   const AnalyticsCharts = dynamic(
     () => import('../../components/artist/AnalyticsCharts'),
     { loading: () => <p>Loading charts...</p> }
   );

   export default function AnalyticsPage() {
     return (
       <ProtectedRoute requiredRoles={['artist']}>
         <ArtistDashboardLayout>
           <h1 className="text-2xl font-bold mb-6">Analytics</h1>
           <AnalyticsCharts />
         </ArtistDashboardLayout>
       </ProtectedRoute>
     );
   }
   ```

3. **Accessibility Implementation:**

   ```tsx
   // Example of accessible form input with label and error states
   // src/components/common/FormInput.jsx
   export function FormInput({
     id,
     label,
     type = 'text',
     value,
     onChange,
     required = false,
     error = '',
     ...props
   }) {
     return (
       <div className="mb-4">
         <label
           htmlFor={id}
           className="block text-sm font-medium text-gray-700"
         >
           {label} {required && <span className="text-red-500">*</span>}
         </label>
         <input
           id={id}
           type={type}
           value={value}
           onChange={onChange}
           required={required}
           aria-invalid={error ? 'true' : 'false'}
           aria-describedby={error ? `${id}-error` : undefined}
           className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                      focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                      ${error ? 'border-red-300' : ''}`}
           {...props}
         />
         {error && (
           <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
             {error}
           </p>
         )}
       </div>
     );
   }
   ```

By following this implementation guide, you'll create a robust frontend for the Ngoma platform with proper component structure, state management, and Web3 integration.

Ensure to follow the references in the [Admin Dashboard Plan](../app/admin-dashboard-plan.md) and [Artist Dashboard Diagram](../diagrams/artist-dashboard-diagram.md) for complete feature implementation.
