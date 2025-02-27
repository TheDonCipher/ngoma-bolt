"use client";

import { mockRecentlyAdded } from "@/lib/mock-data";

export function RecentlyAdded() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mockRecentlyAdded.map((track) => (
        <div
          key={track.id}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 transform rotate-2 hover:rotate-0 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
        >
          <div className="aspect-square overflow-hidden rounded-xl relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
            <img
              src={track.coverImage}
              alt={track.title}
              className="h-full w-full object-cover transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-sm">{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')} mins</p>
            </div>
          </div>
          <div className="mt-6 transform group-hover:translate-y-1 transition-transform">
            <h3 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{track.title}</h3>
            <p className="text-white/80 font-medium mt-1">{track.artist}</p>
            <div className="flex items-center justify-between mt-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/70">{track.genre}</span>
              <span className="text-white/60">{new Date(track.releaseDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}