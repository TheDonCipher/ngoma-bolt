"use client";

import { mockGenres } from "@/lib/mock-data";
import { motion } from "framer-motion";

export function GenresShowcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
      {mockGenres.map((genre, index) => (
        <motion.div
          key={genre.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative h-[400px] cursor-pointer"
        >
          <div className="absolute inset-0 transform-gpu transition-transform duration-500 group-hover:scale-[1.02]">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/10 mix-blend-multiply z-10"
              style={{
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
              }}
            />
            <img
              src={genre.image}
              alt={genre.name}
              className="h-full w-full object-cover"
              style={{
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
              }}
            />
          </div>
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 backdrop-blur-sm bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-100">
                {genre.name}
              </h3>
              <p className="text-white/90 text-sm max-w-[200px] mx-auto leading-relaxed">
                {genre.description}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {genre.popularArtists.slice(0, 3).map((artist, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-medium bg-white/20 text-white rounded-full backdrop-blur-lg"
                  >
                    {artist}
                  </span>
                ))}
              </div>
              <div className="relative w-32 h-1 mx-auto mt-4">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full animate-pulse" />
                </div>
              </div>
              <p className="text-amber-200 text-sm font-medium mt-2">{genre.totalTracks} tracks</p>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}