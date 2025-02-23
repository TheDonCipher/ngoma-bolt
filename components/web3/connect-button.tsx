'use client';

import { ConnectWallet } from '@thirdweb-dev/react';
import { useWeb3Auth } from '@/lib/hooks/use-web3-auth';
import { cn } from '@/lib/utils';

interface ConnectButtonProps {
  className?: string;
}

export function ConnectButton({ className }: ConnectButtonProps) {
  useWeb3Auth(); // Hook into auth state management

  return (
    <ConnectWallet
      theme="dark"
      btnTitle="Connect Wallet"
      modalTitle="Connect Your Wallet"
      auth={{
        loginOptional: false,
        onLogin(token) {
          console.log('Logged in with token:', token);
        },
        onLogout() {
          console.log('Logged out');
        },
      }}
      modalSize="wide"
      welcomeScreen={{
        title: 'Welcome to Ngoma!',
        subtitle: 'Connect your wallet to get started',
      }}
      modalTitleIconUrl="/logo.png"
      className={cn(
        '!relative !overflow-hidden !bg-gradient-to-r !from-violet-600 !to-indigo-600',
        '!text-white !border !border-violet-400/30 !backdrop-blur-sm',
        '!px-8 !py-6 !rounded-lg !font-semibold !transition-all !duration-300',
        '!shadow-lg !shadow-violet-500/20',
        'before:!absolute before:!inset-0 before:!bg-gradient-to-r before:!from-violet-400/20 before:!to-indigo-400/20 before:!opacity-0 hover:before:!opacity-100 before:!transition-opacity',
        'after:!absolute after:!inset-0 after:!bg-gradient-to-r after:!from-violet-400/10 after:!via-transparent after:!to-transparent after:!translate-x-[-200%] hover:after:!translate-x-[200%] after:!transition-transform after:!duration-1000',
        'hover:!scale-[1.02] hover:!shadow-violet-500/30 hover:!border-violet-400/50',
        className
      )}
    />
  );
}
