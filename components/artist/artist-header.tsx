import React from 'react';

interface ArtistHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function ArtistHeader({
  title,
  description,
  actions,
}: ArtistHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
