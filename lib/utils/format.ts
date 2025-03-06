/**
 * Format duration in seconds to MM:SS format
 */
export function formatDuration(duration: number | string): string {
  const seconds =
    typeof duration === 'string' ? parseInt(duration, 10) : duration;
  if (isNaN(seconds)) return '00:00';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Format ether value from wei
 */
export function formatEther(wei: string | undefined): string {
  if (!wei) return '0.00';

  // Simple implementation - in production use ethers.js utils
  const value = parseFloat(wei) / 1e18;
  return value.toFixed(4);
}
