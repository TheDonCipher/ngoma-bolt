"use client";

import { mockLiveEvents } from "@/lib/mock-data";

export function LiveEvents() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mockLiveEvents.map((event) => (
        <div
          key={event.id}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 transform perspective-1000 hover:rotate-y-12"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white/90 text-sm font-medium">
              {event.ticketPrice} ETH
            </div>
          </div>
          <div className="relative p-6 space-y-4 bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-sm">
            <div className="space-y-2">
              <h3 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{event.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{event.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.artists.map((artist, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  {artist}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="space-y-1">
                <p className="text-white/90">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-white/60">{event.duration}</p>
              </div>
              <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white/80 text-xs font-medium hover:bg-white/20 transition-colors cursor-pointer">
                {event.platform}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}