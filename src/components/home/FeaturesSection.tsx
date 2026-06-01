// src/components/home/FeaturesSection.tsx
const features = [
  {
    icon: '⛏️',
    title: 'Survival Murni',
    desc: 'Server survival terkemuka di Indonesia. Bangun, eksplorasi, dan bertahan hidup bersama ratusan pemain aktif.',
    tag: 'Survival Mode',
  },
  {
    icon: '🎮',
    title: 'Cross-Platform',
    desc: 'Java Edition atau Bedrock Edition tanpa batasan. Semua pemain berinteraksi dalam satu dunia yang sama.',
    tag: 'Java & Bedrock',
  },
  {
    icon: '👥',
    title: 'Komunitas Aktif',
    desc: 'Bergabung dengan ratusan pemain aktif yang siap membantu di komunitas Discord kami yang ramah.',
    tag: 'Komunitas Berkembang',
  },
  {
    icon: '💬',
    title: 'Support 24/7',
    desc: 'Tim support kami siap membantu 24 jam sehari, 7 hari seminggu untuk pengalaman bermain optimal.',
    tag: 'Always Available',
  },
]

export default function FeaturesSection() {
  return (
    <section className="px-5 pb-32 max-w-2xl mx-auto">
      <h2 className="text-2xl font-black mb-5">
        Apa itu <span className="text-cyan-400">PixelPeak SMP?</span>
      </h2>
      <div className="flex flex-col gap-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="p-5 rounded-2xl transition-all hover:translate-x-1"
            style={{
              background: 'rgba(26,31,46,0.85)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="text-base font-bold mb-1.5">{f.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            <span
              className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold text-cyan-400"
              style={{ background: 'rgba(34,211,238,0.1)' }}
            >
              {f.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
