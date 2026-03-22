import Link from 'next/link';

const NAV_CARDS = [
  {
    href: '/discover',
    emoji: '&#x1F4A1;',
    title: 'Song Spark',
    desc: 'Filter by genre, mood, era, festival &mdash; get a song to play with a ready-to-post caption.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    href: '/people',
    emoji: '&#x1F3A4;',
    title: 'Musical Legends',
    desc: 'A bibliography of Indian music icons &mdash; singers, composers, lyricists, instrumentalists.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    href: '/almanac',
    emoji: '&#x1F4C5;',
    title: 'Musical Almanac',
    desc: 'Birthdays, milestones, special days &amp; historic events &mdash; month by month.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    href: '/about',
    emoji: '&#x2728;',
    title: 'About MyOctaves',
    desc: 'Why this app exists, who it&apos;s for, and the story behind it.',
    color: 'from-emerald-500 to-teal-500',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <header className="bg-gradient-to-br from-amber-600 via-orange-500 to-rose-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="text-5xl mb-3" role="img" aria-label="music notes">&#x1F3B6;</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">MyOctaves</h1>
          <p className="mt-2 text-amber-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Your weekly companion for discovering the perfect song, celebrating musical legends,
            and staying connected to what makes every week musically special.
          </p>
          <div className="mt-6">
            <Link
              href="/discover"
              className="inline-block rounded-full bg-white text-amber-700 font-semibold px-6 py-2.5 text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              &#x1F4A1; Start Discovering Songs
            </Link>
          </div>
        </div>
      </header>

      {/* Section Cards */}
      <main className="max-w-4xl mx-auto w-full px-4 py-8 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {NAV_CARDS.map(card => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-stone-200 bg-white shadow-sm hover:shadow-md hover:border-amber-300 transition-all overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${card.color} px-4 py-3 flex items-center gap-2`}>
                <span className="text-2xl text-white" dangerouslySetInnerHTML={{ __html: card.emoji }} />
                <h2 className="text-white font-bold text-sm">{card.title}</h2>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs text-stone-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: card.desc }} />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 rounded-xl bg-stone-100 border border-stone-200 px-6 py-5">
          <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3 text-center">What&apos;s Inside</h3>
          <div className="flex flex-wrap gap-6 justify-center text-center">
            {[
              { n: '55+', label: 'Songs' },
              { n: '70+', label: 'Artists' },
              { n: '36', label: 'Special Days' },
              { n: '35', label: 'Historic Events' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-xl font-bold text-amber-700">{s.n}</div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-stone-400 border-t border-stone-200">
        <p>MyOctaves &mdash; For musicians, content creators &amp; music lovers</p>
      </footer>
    </div>
  );
}
