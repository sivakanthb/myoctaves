'use client';

import { useState } from 'react';
import { PostHistory, ALL_INSTRUMENTS, ALL_LANGUAGES, Instrument, Language } from '@/lib/types';
import { getPosts, addPost, deletePost } from '@/lib/storage';
import { toISO } from '@/lib/dateUtils';

export default function HistoryPanel() {
  const [posts, setPosts] = useState<PostHistory[]>(getPosts);
  const [showForm, setShowForm] = useState(false);

  const [songTitle, setSongTitle] = useState('');
  const [film, setFilm] = useState('');
  const [artist, setArtist] = useState('');
  const [theme, setTheme] = useState('');
  const [instrument, setInstrument] = useState<Instrument>('flute');
  const [language, setLanguage] = useState<Language>('Telugu');
  const [notes, setNotes] = useState('');

  function handleAdd() {
    if (!songTitle.trim()) return;
    const post: PostHistory = {
      id: `post_${Date.now()}`,
      date: toISO(new Date()),
      instrument,
      languages: [language],
      theme: theme || 'General',
      songTitle: songTitle.trim(),
      film: film.trim() || undefined,
      artist: artist.trim() || undefined,
      tags: [],
      notes: notes.trim() || undefined,
    };
    addPost(post);
    setPosts(getPosts());
    setSongTitle(''); setFilm(''); setArtist(''); setTheme(''); setNotes('');
    setShowForm(false);
  }

  function handleDelete(id: string) {
    deletePost(id);
    setPosts(getPosts());
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-500">{posts.length} post{posts.length !== 1 ? 's' : ''} recorded</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700 transition"
        >
          {showForm ? 'Cancel' : '+ Add Post'}
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl bg-white border border-stone-200 p-4 shadow-sm space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="Song title *"
              value={songTitle}
              onChange={e => setSongTitle(e.target.value)}
              className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 col-span-2"
            />
            <input
              placeholder="Film / Album"
              value={film}
              onChange={e => setFilm(e.target.value)}
              className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              placeholder="Artist / Composer"
              value={artist}
              onChange={e => setArtist(e.target.value)}
              className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              placeholder="Theme (e.g. SPB Birthday Tribute)"
              value={theme}
              onChange={e => setTheme(e.target.value)}
              className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <div className="flex gap-2">
              <select
                value={instrument}
                onChange={e => setInstrument(e.target.value as Instrument)}
                className="rounded-lg border border-stone-300 px-2 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {ALL_INSTRUMENTS.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as Language)}
                className="rounded-lg border border-stone-300 px-2 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {ALL_LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <input
              placeholder="Notes (optional)"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 col-span-2"
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={!songTitle.trim()}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-40 transition"
          >
            Save Post
          </button>
        </div>
      )}

      {posts.length === 0 && !showForm ? (
        <div className="text-center py-16 text-stone-400">
          <p className="text-4xl mb-3">📝</p>
          <p className="font-medium">No posts yet</p>
          <p className="text-sm mt-1">Add your first post to start tracking!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map(post => (
            <div key={post.id} className="rounded-xl bg-white border border-stone-200 p-3 shadow-sm flex items-center gap-3">
              <div className="text-2xl flex-shrink-0">
                {post.instrument === 'flute' ? '🪈' : post.instrument === 'guitar' ? '🎸' : '🎤'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-stone-800 truncate">{post.songTitle}</p>
                <p className="text-xs text-stone-500">
                  {[post.film, post.artist].filter(Boolean).join(' • ')}
                  {post.theme ? ` — ${post.theme}` : ''}
                </p>
                <p className="text-[10px] text-stone-400 mt-0.5">{post.date} • {post.languages.join(', ')}</p>
              </div>
              <button
                onClick={() => handleDelete(post.id)}
                className="rounded p-1 text-stone-300 hover:text-red-500 hover:bg-red-50 transition text-sm"
                title="Delete"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
