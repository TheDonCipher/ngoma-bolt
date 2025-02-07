import dynamic from 'next/dynamic';

// Dynamically import AudioPlayer to ensure it's only used on the client-side
const AudioPlayer = dynamic(() => import('../components/AudioPlayer'), { ssr: false });

export default function Home() {
  // ...existing code...
  return (
    <div>
      {/* ...existing code... */}
      <AudioPlayer />
      {/* ...existing code... */}
    </div>
  );
}
