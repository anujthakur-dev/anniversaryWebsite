"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Heart, Sparkles, Camera } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import InteractiveHeart from "@/components/interactive-heart"
const photos = [
  "/image1.jpg",
  "/image2.jpg",
  "/image3.jpg",
  "/image4.jpg",
  "/image5.jpg",
  "/image6.jpg",
]
export default function AnniversaryWebsite() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const timelineRef = useRef(null)
  const galleryRef = useRef(null)
  const messageRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const timelineInView = useInView(timelineRef, { once: true })
  const galleryInView = useInView(galleryRef, { once: true })
  const messageInView = useInView(messageRef, { once: true })

  

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  // Floating hearts animation
  const FloatingHeart = ({ delay = 0, duration = 3, size = 20 }) => (
    <motion.div
      className="absolute text-pink-400"
      initial={{ y: "100vh", x: Math.random() , opacity: 0 }}
      animate={{
        y: "-100vh",
        x: Math.random() ,
        opacity: [0, 1, 1, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: duration + Math.random() * 2,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <Heart size={size} fill="currentColor" />
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <FloatingHeart key={i} delay={i * 0.5} duration={4 + Math.random() * 3} size={15 + Math.random() * 10} />
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative z-10">
        {/* 3D Interactive Heart Background */}
        <div className="absolute inset-0 z-0">
          <InteractiveHeart />
        </div>

        <motion.div style={{ y: textY }} className="text-center px-4 max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={heroInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            className="mb-8"
          >
            {/* Remove the static heart since we have the 3D one */}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 bg-clip-text text-transparent mb-6 drop-shadow-lg"
          >
            Happy Anniversary
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-3xl md:text-5xl font-semibold text-rose-700 mb-8 drop-shadow-md"
          >
            Rishika ✨
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed bg-white/20 backdrop-blur-sm rounded-lg p-4"
          >
            Celebrating 365 days of love, laughter, and endless memories together 💕
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
              >
                <Heart size={30} className="text-pink-500 drop-shadow-lg" fill="currentColor" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-rose-500 drop-shadow-lg"
          >
            <Sparkles size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent"
          >
            Our Love Story Timeline
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { month: "Month 1", title: "First Hello", desc: "When our eyes first met and hearts skipped a beat" },
              { month: "Month 3", title: "First Date", desc: "The magical evening that started it all" },
              { month: "Month 6", title: "First 'I Love You'", desc: "Three words that changed everything" },
              { month: "Month 9", title: "Adventures Together", desc: "Creating memories that will last forever" },
              { month: "Month 12", title: "One Year Strong", desc: "Here we are, more in love than ever" },
              { month: "Forever", title: "Our Future", desc: "Endless possibilities await us together" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={timelineInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                      className="mb-4"
                    >
                      <Heart size={40} className="text-red-500 mx-auto" fill="currentColor" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-rose-700 mb-2">{item.month}</h3>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section ref={galleryRef} className="py-20 px-4 bg-gradient-to-r from-pink-100 to-rose-100 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent"
          >
            Our Beautiful Moments
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((src, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
    animate={galleryInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ scale: 1.05, rotate: 2 }}
    className="relative group"
  >
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform">
      <div className="aspect-square bg-gradient-to-br from-pink-200 to-rose-300 rounded-lg flex items-center justify-center relative overflow-hidden">
        <img
          src={src}
          alt={`Memory ${index + 1}`}
          className="object-cover w-full h-full rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart size={30} className="text-white" fill="currentColor" />
        </div>
      </div>
      <p className="text-center mt-3 text-gray-700 font-medium">Memory #{index + 1}</p>
    </div>
  </motion.div>
))}

          </div>
        </div>
      </section>

      {/* Love Message Section */}
      <section ref={messageRef} className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={messageInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent"
          >
            A Message From My Heart
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={messageInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-pink-200"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="mb-6"
            >
              <Heart size={60} className="text-red-500 mx-auto" fill="currentColor" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={messageInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8"
            >
              Dear Rishika, this past year with you has been nothing short of magical. Every day with you feels like a
              beautiful dream that I never want to wake up from. You've brought so much joy, laughter, and love into my
              life. Here's to many more years of adventures, inside jokes, late-night conversations, and endless love.
              You are my heart, my soul, and my everything. Happy 1st Anniversary, my love! 💕
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={messageInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex justify-center space-x-2"
            >
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                  }}
                >
                  <Heart size={20} className="text-pink-500" fill="currentColor" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-r from-pink-600 to-red-600 text-white relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="flex justify-center space-x-4 mb-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <Heart size={30} className="text-white" fill="currentColor" />
                </motion.div>
              ))}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Forever & Always</h3>
            <p className="text-lg opacity-90">With all my love, today and every day ❤️</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm opacity-75"
          >
            Made with 💕 for the most amazing girlfriend in the world
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
