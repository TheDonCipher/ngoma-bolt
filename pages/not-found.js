import dynamic from 'next/dynamic';

// Dynamically import AudioPlayer to ensure it's only used on the client-side
const AudioPlayer = dynamic(() => import('@/components/player/audio-player'), { ssr: false });

export default function NotFound() {
  // ...existing code...
  return (
    <div>
      {/* ...existing code... */}
      <AudioPlayer />
      {/* ...existing code... */}
    </div>
  );
}
