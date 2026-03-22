import Link from 'next/link';

const NAV_CARDS = [
  {
    href: '/discover',
    emoji: '&#x1F4A1;',
    title: 'Song Spark',
    desc: 'Filter by genre, mood, era, festival &mdash; get a song to play with a ready-to-post caption.',
    gradient: 'from-rose-500 to-pink-600',
    iconBg: 'bg-rose-100 text-rose-600',
  },
  {
    href: '/people',
    emoji: '&#x1F3A4;',
    title: 'Musical Legends',
    desc: 'A bibliography of Indian music icons &mdash; singers, composers, lyricists, instrumentalists.',
    gradient: 'from-violet-500 to-purple-600',
    iconBg: 'bg-violet-100 text-violet-600',
  },
  {
    href: '/almanac',
    emoji: '&#x1F4C5;',
    title: 'Musical Almanac',
    desc: 'Birthdays, milestones, special days &amp; historic events &mdash; month by month.',
    gradient: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    href: '/about',
    emoji: '&#x2728;',
    title: 'About MyOctaves',
    desc: 'Why this app exists, who it&apos;s for, and the story behind it.',
    gradient: 'from-amber-500 to-yellow-600',
    iconBg: 'bg-amber-100 text-amber-600',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <header className="studio-header-v2 text-white relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="hero-orb w-72 h-72 bg-yellow-400 -top-20 -left-20" style={{position:'absolute'}} />
        <div className="hero-orb w-96 h-96 bg-blue-500 -bottom-32 -right-20" style={{position:'absolute'}} />

        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center z-10">
          <p className="text-6xl mb-4 anim-float" role="img" aria-label="music notes">&#x1F3B6;</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight anim-fade-up" style={{background: 'linear-gradient(135deg, #fef3c7, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            MyOctaves
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed anim-fade-up" style={{animationDelay: '0.1s'}}>
            Our weekly companion for discovering the perfect song, celebrating musical legends,
            and staying connected to what makes every week musically special.
          </p>
          <div className="mt-8 anim-fade-up" style={{animationDelay: '0.2s'}}>
            <Link
              href="/discover"
              className="inline-block rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold px-8 py-3 text-sm shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-500/30 hover:scale-105 transition-all"
            >
              &#x1F4A1; Start Discovering Songs
            </Link>
          </div>
        </div>
        <div className="h-0.5 shimmer-bar" />
      </header>

      {/* Section Cards */}
      <main className="max-w-4xl mx-auto w-full px-4 py-10 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 stagger-children">
          {NAV_CARDS.map(card => (
            <Link
              key={card.href}
              href={card.href}
              className="group anim-fade-up rounded-2xl glass-card shadow-sm hover-lift overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${card.gradient} px-5 py-4 flex items-center gap-3 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
                <span className="text-3xl opacity-90 group-hover:scale-110 transition-transform relative z-10" dangerouslySetInnerHTML={{ __html: card.emoji }} />
                <h2 className="text-white font-bold text-base relative z-10">{card.title}</h2>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: card.desc }} />
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-slate-400 group-hover:text-slate-600 transition">
                  Explore <span className="group-hover:translate-x-1 transition-transform">&#x2192;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-10 rounded-2xl glass-card px-8 py-6 anim-fade-up" style={{animationDelay: '0.3s'}}>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">What&apos;s Inside</h3>
          <div className="flex flex-wrap gap-8 justify-center text-center">
            {[
              { n: '55+', label: 'Songs', emoji: '&#x1F3B5;' },
              { n: '70+', label: 'Artists', emoji: '&#x1F3A4;' },
              { n: '36', label: 'Special Days', emoji: '&#x1F31F;' },
              { n: '35', label: 'Historic Events', emoji: '&#x1F4DC;' },
            ].map(s => (
              <div key={s.label} className="group">
                <div className="text-2xl mb-1" dangerouslySetInnerHTML={{ __html: s.emoji }} />
                <div className="text-2xl font-black text-yellow-600 group-hover:scale-110 transition-transform">{s.n}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-5 text-xs text-slate-400 border-t border-slate-100">
        <p>MyOctaves &mdash; For musicians, content creators &amp; music lovers</p>
      </footer>
    </div>
  );
}
