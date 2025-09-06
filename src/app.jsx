import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Filter, Instagram, Globe, Download } from 'lucide-react'
import { artworks, categories } from './data/artworks.js'

export default function App() {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    return artworks.filter((a) => {
      const inCat = active === 'All' || a.category.includes(active)
      const q = query.trim().toLowerCase()
      const inSearch = !q || [a.title, a.medium, a.size, a.category.join(' ')].join(' ').toLowerCase().includes(q)
      return inCat && inSearch
    })
  }, [active, query])

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [selected])

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900" id="top">
      <Navbar />
      <Hero />
      <section id="gallery" className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Gallery</h2>
          <div className="flex gap-2 items-center">
            <Filter className="w-5 h-5" />
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button key={c} onClick={() => setActive(c)}
                  className={`px-3 py-1.5 rounded-full text-sm transition shadow-sm border ${active === c ? 'bg-black text-white border-black' : 'bg-white hover:bg-neutral-50 border-neutral-300'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, medium, color…"
            className="w-full md:w-1/2 rounded-xl border border-neutral-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-400" />
        </div>

        <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-6">
          {filtered.map((a) => (
            <motion.div key={a.id} layout whileHover={{ y: -3 }} className="mb-6 break-inside-avoid">
              <button onClick={() => setSelected(a)} className="block w-full text-left">
                <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
                  <img src={a.image} alt={a.title} className="w-full h-auto object-cover" loading="lazy" />
                  <div className="p-4">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-lg font-semibold">{a.title}</h3>
                      <span className="text-xs text-neutral-500">{a.year}</span>
                    </div>
                    <p className="text-sm text-neutral-600">{a.medium} • {a.size}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {a.category.map((tag) => (<span key={tag} className="text-xs bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-full">{tag}</span>))}
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <About />
      <Contact />
      <Footer />
      <ArtworkModal item={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className={`sticky top-0 z-50 transition ${scrolled ? 'backdrop-blur bg-white/70 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <a href="#top" className="font-semibold">Irena Goftman</a>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#gallery" className="hover:opacity-70">Gallery</a>
          <a href="#about" className="hover:opacity-70">About</a>
          <a href="#contact" className="hover:opacity-70">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="text-sm rounded-full px-3 py-1.5 border border-neutral-300 bg-white hover:bg-neutral-50">Inquiries</a>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">Expressive Portraits & Cubist Dreams</h1>
          <p className="mt-4 text-neutral-600 md:text-lg">
            Color-forward paintings blending emotion, structure, and playful geometry. Explore recent works, request a commission, or inquire about exhibitions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#gallery" className="rounded-xl bg-black text-white px-5 py-2.5 text-sm shadow hover:opacity-90">View Gallery</a>
            <a href="#contact" className="rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm hover:bg-neutral-50">Commission / Purchase</a>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5">
            <img src="/artworks/hero.jpg" alt="Featured artwork" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-4 md:px-8 py-14">
      <h2 className="text-2xl md:text-3xl font-semibold">About the Artist</h2>
      <p className="mt-4 text-neutral-700 leading-relaxed">
        Irena Goftman is a painter working across portraiture and cubist-inspired abstraction. Her practice explores the inner life — emotions, memories, and dreams — translated into color fields and mosaic-like geometry.
      </p>
      <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
        <div className="p-4 rounded-2xl bg-white border border-neutral-200">
          <p className="font-medium">Mediums</p>
          <p className="text-neutral-600 mt-1">Acrylic, texture mediums, mixed media</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-neutral-200">
          <p className="font-medium">Themes</p>
          <p className="text-neutral-600 mt-1">Inner narrative, feminine strength, mosaic of the soul</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-neutral-200">
          <p className="font-medium">Location</p>
          <p className="text-neutral-600 mt-1">Israel</p>
        </div>
      </div>
      <div className="mt-6">
        <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 text-sm rounded-xl border border-neutral-300 bg-white px-4 py-2 hover:bg-neutral-50">
          <Download className="w-4 h-4"/> Request CV / Press Kit
        </a>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="max-w-5xl mx-auto px-4 md:px-8 py-14">
      <div className="rounded-3xl bg-white border border-neutral-200 p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-semibold">Inquiries & Commissions</h2>
        <p className="mt-2 text-neutral-600">For pricing, availability, or commissions, send a message below.</p>
        <form className="mt-6 grid md:grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            const name = e.currentTarget.elements.namedItem('name').value
            const email = e.currentTarget.elements.namedItem('email').value
            const msg = e.currentTarget.elements.namedItem('message').value
            const body = encodeURIComponent(`Hi Irena,\\n\\n${msg}\\n\\n— ${name} (${email})`)
            window.location.href = `mailto:your.email@example.com?subject=Art Inquiry&body=${body}`
          }}>
          <input name="name" required placeholder="Your name" className="rounded-xl border border-neutral-300 px-4 py-2"/>
          <input name="email" required type="email" placeholder="Email" className="rounded-xl border border-neutral-300 px-4 py-2"/>
          <textarea name="message" required placeholder="What piece are you interested in? Do you want a commission?" className="md:col-span-2 h-36 rounded-xl border border-neutral-300 px-4 py-2"/>
          <div className="md:col-span-2 flex items-center gap-3">
            <button type="submit" className="rounded-xl bg-black text-white px-5 py-2.5 text-sm">Send</button>
            <a href="https://instagram.com/" className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-50">
              <Instagram className="w-4 h-4"/> Instagram
            </a>
            <a href="#" className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-50">
              <Globe className="w-4 h-4"/> More links
            </a>
          </div>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return <footer className="py-10 text-center text-sm text-neutral-500">© {new Date().getFullYear()} Irena Goftman — All rights reserved.</footer>
}

function ArtworkModal({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow"><X className="w-5 h-5"/></button>
            <div className="grid md:grid-cols-2">
              <div className="bg-neutral-50"><img src={item.image} alt={item.title} className="w-full h-full object-contain" /></div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold">{item.title}</h3>
                <p className="text-neutral-600 mt-1">{item.year} • {item.medium} • {item.size}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.category.map((tag) => (<span key={tag} className="text-xs bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-full">{tag}</span>))}
                </div>
                {item.price && (<p className="mt-4 text-lg font-medium">₪ {Number(item.price).toLocaleString()}</p>)}
                <p className="mt-6 text-sm text-neutral-700 leading-relaxed">"Despite all the chaos around, she still dares to dream."</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#contact" className="rounded-xl bg-black text-white px-5 py-2.5 text-sm">Purchase / Inquiry</a>
                  <a href="#" onClick={(e)=>e.preventDefault()} className="rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm hover:bg-neutral-50">Add to Wishlist</a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
