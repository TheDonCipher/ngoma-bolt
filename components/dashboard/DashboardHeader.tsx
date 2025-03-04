import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, RefreshCw, PlusCircle } from 'lucide-react';

interface SectionMeta {
  title: string;
  description: string;
}

interface DashboardHeaderProps {
  section: string;
  meta: SectionMeta;
  onAction?: (action: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  section,
  meta,
  onAction,
}) => {
  // Primary action button based on current section
  const renderPrimaryAction = () => {
    switch (section) {
      case 'music':
        return (
          <Button
            className="bg-amber-600 hover:bg-amber-700"
            onClick={() => onAction?.('add_track')}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add Track
          </Button>
        );
      case 'events':
        return (
          <Button
            className="bg-amber-600 hover:bg-amber-700"
            onClick={() => onAction?.('new_event')}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> New Event
          </Button>
        );
      case 'merchandise':
        return (
          <Button
            className="bg-amber-600 hover:bg-amber-700"
            onClick={() => onAction?.('add_product')}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add Product
          </Button>
        );
      case 'analytics':
        return (
          <Button variant="outline" onClick={() => onAction?.('refresh')}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh Data
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold">{meta.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {meta.description}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        {renderPrimaryAction()}

        {/* Help button always visible */}
        <Button variant="ghost" size="icon" onClick={() => onAction?.('help')}>
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
