// src/app/gallery/page.tsx
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'

const photos = [
  { src: 'https://wallpapercave.com/wp/wp12221024.jpg', caption: '🌿 Spawn Area' },
  { src: 'https://wallpapercave.com/wp/wp12221027.jpg', caption: '🏰 Player Build' },
  { src: 'https://wallpapercave.com/wp/wp12221030.jpg', caption: '⛏️ Cave Explorer' },
  { src: 'https://wallpapercave.com/wp/wp12221023.jpg', caption: '🌅 Sunset View' },
  { src: 'https://wallpapercave.com/wp/wp12221025.jpg', caption: '🌙 Night Adventure' },
  { src: 'https://wallpapercave.com/wp/wp12221026.jpg', caption: '🏔️ Mountain Top' },
]

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen">
      <div className="mc-bg" />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20 pb-32 max-w-2xl mx-auto px-5">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black mb-2">🖼️ Galeri Server</h1>
            <p className="text-slate-400 text-sm">Screenshot dan momen terbaik di PixelPeak SMP</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {photos.map((p, i) => (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${i}/400/400`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
                  <span className="text-sm font-semibold text-white">{p.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    </main>
  )
}
