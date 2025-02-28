'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import { WalletCards } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConnectWalletButtonProps {
  className?: string;
}

export function ConnectWalletButton({ className }: ConnectWalletButtonProps) {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const [isHovering, setIsHovering] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  // Handle wallet connection/disconnection
  const handleWalletAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (address) {
      disconnectWallet();
    } else {
      connectWithMetamask();
    }
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -2,
      }}
      whileTap={{ scale: 0.95 }}
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Button
        onClick={handleWalletAction} // Fix: Use a wrapper function with correct event signature
        className={cn(
          'relative overflow-hidden group text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4',
          address
            ? 'bg-gradient-to-r from-purple-500/80 to-pink-500/80 hover:from-purple-600 hover:to-pink-600 text-white'
            : 'bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white',
          className
        )}
      >
        <WalletCards
          className={cn(
            'w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 transition-all',
            address ? 'text-white' : 'text-white'
          )}
        />
        <span className="font-medium">
          {address ? formatAddress(address) : 'Connect Wallet'}
        </span>

        {address && isHovering && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center bg-red-500 text-white font-medium"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
          >
            Disconnect
          </motion.span>
        )}
      </Button>
    </motion.div>
  );
}
