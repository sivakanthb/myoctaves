import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-3xl" role="img" aria-label="music">&#x2728;</Link>
              <div>
                <h1 className="text-xl font-bold tracking-tight">About MyOctaves</h1>
                <p className="text-amber-100 text-xs">The story behind the music</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/discover"
                className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition"
              >
                &#x1F4A1; Song Spark
              </Link>
              <Link
                href="/"
                className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition"
              >
                &#x1F3E0; Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto w-full px-4 py-8 flex-1 space-y-8">
        {/* Why */}
        <section>
          <h2 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span>&#x1F3AF;</span> Why MyOctaves?
          </h2>
          <div className="space-y-3 text-sm text-stone-600 leading-relaxed">
            <p>
              As a musician who posts weekly on Instagram and Facebook, the hardest question every week isn&apos;t
              <em> how</em> to play &mdash; it&apos;s <strong>what</strong> to play. Which song fits the mood?
              Is there a birthday or milestone this week that connects to a great melody?
              What caption will resonate with people?
            </p>
            <p>
              <strong>MyOctaves</strong> was born out of that exact need: a single place to discover the perfect song
              for your weekly post, complete with context, captions, and connections to the rich history of Indian music.
            </p>
          </div>
        </section>

        {/* What It Does */}
        <section>
          <h2 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span>&#x1F4A1;</span> What It Does
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { emoji: '&#x1F39B;&#xFE0F;', title: 'Song Spark', desc: 'Filter 55+ songs by genre, mood, era, weather, language, and festival. Get a curated pick with a ready-to-post caption.' },
              { emoji: '&#x1F3A4;', title: 'Musical Legends', desc: 'Browse 70+ artists &mdash; singers, composers, lyricists, instrumentalists &mdash; with their achievements and contributions.' },
              { emoji: '&#x1F4C5;', title: 'Musical Almanac', desc: '35+ historic events, 36 special days, and every artist birthday &mdash; organized month by month.' },
              { emoji: '&#x2B50;', title: 'Week-Aware', desc: 'Songs linked to this week&apos;s birthdays & milestones are automatically boosted to the top.' },
            ].map(item => (
              <div key={item.title} className="rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg" dangerouslySetInnerHTML={{ __html: item.emoji }} />
                  <h3 className="text-sm font-semibold text-stone-700">{item.title}</h3>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </section>

        {/* Who It's For */}
        <section>
          <h2 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span>&#x1F3B5;</span> Who It&apos;s For
          </h2>
          <ul className="space-y-2 text-sm text-stone-600">
            {[
              'Musicians who post weekly covers, reels, or performances on social media',
              'Content creators looking for music-themed post ideas with context',
              'Music enthusiasts who love Indian film music, classical, and ghazals',
              'Anyone curious about the rich history of Indian music',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">&#x25CF;</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* The Name */}
        <section>
          <h2 className="text-lg font-bold text-stone-800 mb-3 flex items-center gap-2">
            <span>&#x1F3B6;</span> Why &ldquo;MyOctaves&rdquo;?
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            An octave is the foundation of all music &mdash; eight notes that span every emotion, every mood, every story.
            <strong> MyOctaves</strong> represents the full range of musical expression: from the melancholy of a rainy-day
            raga to the energy of a festive dance number. Every week, there&apos;s a note waiting to be played.
            This app helps you find it.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/discover"
            className="inline-block rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-2.5 text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            &#x1F4A1; Find Your Song
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-stone-400 border-t border-stone-200">
        <p>MyOctaves &mdash; For musicians, content creators &amp; music lovers</p>
      </footer>
    </div>
  );
}
