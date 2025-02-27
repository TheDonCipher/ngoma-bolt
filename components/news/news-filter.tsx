"use client";

import { Button } from "@/components/ui/button";
import { Music, Calendar, Trophy } from "lucide-react";

interface NewsFilterProps {
  selected: string;
  onFilterChange: (filter: string) => void;
}

export function NewsFilter({ selected, onFilterChange }: NewsFilterProps) {
  const filters = [
    { id: "all", label: "All", icon: null },
    { id: "album_release", label: "Album Releases", icon: Music },
    { id: "festival", label: "Festivals", icon: Calendar },
    { id: "award", label: "Awards", icon: Trophy },
    { id: "collaboration", label: "Collaborations", icon: Music },
    { id: "charity", label: "Charity", icon: Trophy },
    { id: "innovation", label: "Innovation", icon: Music }
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={selected === filter.id ? "default" : "outline"}
          onClick={() => onFilterChange(filter.id)}
          className="whitespace-nowrap"
        >
          {filter.icon && <filter.icon className="w-4 h-4 mr-2" />}
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
