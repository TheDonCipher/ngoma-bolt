import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'Artist Empowerment',
    description:
      'Create and control your music NFTs with complete creative freedom. Own your digital legacy in the Web3 space.',
    icon: '🎵',
  },
  {
    title: 'Fan Connection',
    description:
      "Get exclusive access to your favorite artists' content and engage directly with them through NFT ownership.",
    icon: '💫',
  },
  {
    title: 'NFT Roles',
    description:
      'Mint, sell, and trade digital assets seamlessly. Build your collection and participate in the music economy.',
    icon: '🔄',
  },
  {
    title: 'Fair Royalties',
    description:
      'Benefit from transparent, smart contract-based compensation. Ensure fair revenue distribution for all creators.',
    icon: '💎',
  },
];

export function ValueProposition() {
  return (
    <section id="solutions" className="relative py-24 overflow-hidden">
      {/* Enhanced background with circular pattern */}
      <motion.div
        className="absolute inset-0 pattern-adinkra pattern-parallax"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          rotate: { duration: 300, ease: 'linear', repeat: Infinity },
          scale: { duration: 20, ease: 'easeInOut', repeat: Infinity },
        }}
      />
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/80 tracking-tight">
            Empowering African Music Through Web3
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our platform provides innovative solutions to transform the music
            industry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <Card className="h-full group hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-primary/10 rounded-xl overflow-hidden">
                <CardHeader>
                  <motion.div
                    className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300"
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <CardTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground/90 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="text-center"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 font-semibold"
            onClick={() =>
              document
                .getElementById('how-it-works')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Discover How It Works
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
