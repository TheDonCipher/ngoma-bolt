import dynamic from 'next/dynamic';

// Dynamically import AudioPlayer to ensure it's only used on the client-side
const AudioPlayer = dynamic(() => import('../components/AudioPlayer'), { ssr: false });

export default function Custom404() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <AudioPlayer />
    </div>
  );
}
