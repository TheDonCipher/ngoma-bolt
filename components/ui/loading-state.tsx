import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="w-full flex justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}
