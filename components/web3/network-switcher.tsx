'use client';

import { useNetwork, useSwitchChain } from '@thirdweb-dev/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Network } from 'lucide-react';

const SUPPORTED_NETWORKS = [
  { id: 1, name: 'Ethereum' },
  { id: 137, name: 'Polygon' },
  { id: 80001, name: 'Mumbai' },
];

export function NetworkSwitcher() {
  const networkData = useNetwork();
  const chainInfo = networkData[0]; // Access the first element in the tuple
  const switchChain = useSwitchChain();

  // Type-safe access to chain ID - default to Ethereum (1)
  const currentChainId =
    chainInfo &&
    typeof chainInfo === 'object' &&
    'chain' in chainInfo &&
    chainInfo.chain &&
    typeof chainInfo.chain === 'object' &&
    'id' in chainInfo.chain
      ? chainInfo.chain.id
      : 1;

  if (!chainInfo) return null;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Network className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Network</h3>
      </div>

      <Select
        value={String(currentChainId)}
        onValueChange={(value) => switchChain(parseInt(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select network" />
        </SelectTrigger>
        <SelectContent>
          {SUPPORTED_NETWORKS.map((network) => (
            <SelectItem key={network.id} value={network.id.toString()}>
              {network.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Card>
  );
}
