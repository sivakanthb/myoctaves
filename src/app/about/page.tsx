import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="studio-header-v2 text-white">
        <div className="relative max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3 anim-fade-up">
              <Link href="/" className="text-4xl anim-float" role="img" aria-label="music">&#x2728;</Link>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight" style={{background: 'linear-gradient(135deg, #fef3c7, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>About MyOctaves</h1>
                <p className="text-slate-400 text-xs mt-0.5">The story behind the music</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/discover" className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition">&#x1F4A1; Song Spark</Link>
              <Link href="/" className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition">&#x1F3E0; Home</Link>
            </div>
          </div>
        </div>
        <div className="h-0.5 shimmer-bar" />
      </header>

      <main className="max-w-3xl mx-auto w-full px-4 py-10 flex-1 space-y-8 stagger-children">
        {/* Why */}
        <section className="anim-fade-up rounded-2xl glass-card p-6 hover-lift">
          <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-sm">&#x1F3AF;</span>
            Why MyOctaves?
          </h2>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              As a musician who posts weekly on Instagram and Facebook, the hardest question every week isn&apos;t
              <em> how</em> to play &mdash; it&apos;s <strong>what</strong> to play. Which song fits the mood?
              Is there a birthday or milestone this week that connects to a great melody?
              What caption will resonate with people?
            </p>
            <p>
              <strong>MyOctaves</strong> was born out of that exact need: a single place to discover the perfect song
              for our weekly post, complete with context, captions, and connections to the rich history of Indian music.
            </p>
          </div>
        </section>

        {/* What It Does */}
        <section className="anim-fade-up">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-sm">&#x1F4A1;</span>
            What It Does
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { emoji: '&#x1F39B;&#xFE0F;', title: 'Song Spark', desc: 'Filter 55+ songs by genre, mood, era, weather, language, and festival. Get a curated pick with a ready-to-post caption.', gradient: 'from-rose-500 to-pink-600' },
              { emoji: '&#x1F3A4;', title: 'Musical Legends', desc: 'Browse 70+ artists &mdash; singers, composers, lyricists, instrumentalists &mdash; with their achievements and contributions.', gradient: 'from-violet-500 to-purple-600' },
              { emoji: '&#x1F4C5;', title: 'Musical Almanac', desc: '35+ historic events, 36 special days, and every artist birthday &mdash; organized month by month.', gradient: 'from-blue-500 to-indigo-600' },
              { emoji: '&#x2B50;', title: 'Week-Aware', desc: 'Songs linked to this week&apos;s birthdays & milestones are automatically boosted to the top.', gradient: 'from-amber-500 to-yellow-600' },
            ].map(item => (
              <div key={item.title} className="rounded-2xl glass-card overflow-hidden hover-lift">
                <div className={`bg-gradient-to-r ${item.gradient} px-4 py-3 flex items-center gap-2`}>
                  <span className="text-lg" dangerouslySetInnerHTML={{ __html: item.emoji }} />
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                </div>
                <div className="p-4">
                  <p className="text-xs text-slate-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who It's For */}
        <section className="anim-fade-up rounded-2xl glass-card p-6 hover-lift">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm">&#x1F3B5;</span>
            Who It&apos;s For
          </h2>
          <ul className="space-y-3 text-sm text-slate-600">
            {[
              { text: 'Musicians who post weekly covers, reels, or performances on social media', icon: '&#x1F3A4;' },
              { text: 'Content creators looking for music-themed post ideas with context', icon: '&#x1F4F1;' },
              { text: 'Music enthusiasts who love Indian film music, classical, and ghazals', icon: '&#x1F3B6;' },
              { text: 'Anyone curious about the rich history of Indian music', icon: '&#x1F4DA;' },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl bg-white/50 px-4 py-3">
                <span className="text-lg flex-shrink-0 mt-0.5" dangerouslySetInnerHTML={{ __html: item.icon }} />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* The Name */}
        <section className="anim-fade-up rounded-2xl glass-card p-6 hover-lift">
          <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm">&#x1F3B6;</span>
            Why &ldquo;MyOctaves&rdquo;?
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            An octave is the foundation of all music &mdash; eight notes that span every emotion, every mood, every story.
            <strong> MyOctaves</strong> represents the full range of musical expression: from the melancholy of a rainy-day
            raga to the energy of a festive dance number. Every week, there&apos;s a note waiting to be played.
            This app helps you find it.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center pt-4 anim-fade-up">
          <Link
            href="/discover"
            className="inline-block rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold px-8 py-3 text-sm shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-500/30 hover:scale-105 transition-all"
          >
            &#x1F4A1; Find Our Song
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-5 text-xs text-slate-400 border-t border-slate-100">
        <p>MyOctaves &mdash; For musicians, content creators &amp; music lovers</p>
        <p className="mt-1">Built by <a href="https://sivakanth.vercel.app" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-700 underline transition">Sivakanth Badigenchala</a></p>
      </footer>
    </div>
  );
}
