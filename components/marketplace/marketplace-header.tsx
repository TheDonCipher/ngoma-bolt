import { motion } from 'framer-motion';
import Image from 'next/image';

export function MarketplaceHeader() {
  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/2 space-y-6">
            <motion.h1
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-600"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Ngoma Marketplace
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Discover and collect authentic African music NFTs, merchandise,
              and exclusive event tickets from your favorite artists.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button className="px-6 py-3 font-medium rounded-full bg-gradient-to-r from-amber-500 to-pink-600 text-white hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300">
                Explore Collection
              </button>
              <button className="px-6 py-3 font-medium rounded-full border border-pink-600/50 hover:border-pink-600 hover:bg-pink-600/10 transition-all duration-300">
                Connect Wallet
              </button>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop"
                alt="African Music NFT Collection"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div className="w-full">
                  <p className="text-white/80 mb-2">Featured Collection</p>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Ancestral Rhythms
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-medium">12.5 ETH</span>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white bg-gray-800"
                        ></div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-xs">
                        +8
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-r from-amber-400 to-pink-600 p-1 shadow-xl"
              initial={{ opacity: 0, scale: 0, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.7, type: 'spring' }}
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-center p-2">
                <p className="text-sm font-bold">
                  <span className="block text-xl text-pink-600">24h</span>
                  <span className="text-gray-800">Left</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
