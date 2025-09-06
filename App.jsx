import React, { useMemo, useState } from 'react'
import { artworks, categories } from './data/artworks.js'

export default function App() {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return artworks.filter((a) => {
      const inCat = active === 'All' || a.category.includes(active)
      const q = query.trim().toLowerCase()
      const inSearch = !q || [a.title, a.medium, a.size, a.category.join(' ')].join(' ').toLowerCase().includes(q)
      return inCat && inSearch
    })
  }, [active, query])

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 p-8">
      <h1 className="text-3xl font-bold mb-4">Irena Goftman — Gallery</h1>
      <div className="flex gap-2 mb-4 flex-wrap">
        {categories.map((c)=>(
          <button key={c} onClick={()=>setActive(c)}
            className={active===c? 'bg-black text-white px-3 py-1 rounded-full':'bg-white border px-3 py-1 rounded-full'}>
            {c}
          </button>
        ))}
      </div>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search..." className="border px-3 py-1 rounded mb-6"/>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(a=>(
          <div key={a.id} className="bg-white rounded shadow p-2">
            <img src={a.image} alt={a.title} className="w-full h-48 object-cover rounded"/>
            <h3 className="font-semibold mt-2">{a.title} <span className="text-sm text-gray-500">{a.year}</span></h3>
            <p className="text-sm text-gray-600">{a.medium} • {a.size}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
