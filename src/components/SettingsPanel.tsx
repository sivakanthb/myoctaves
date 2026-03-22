'use client';

import { useState } from 'react';
import { AppSettings, ALL_LANGUAGES, ALL_INSTRUMENTS, Language, Instrument } from '@/lib/types';
import { getSettings, saveSettings, exportAllData, importAllData } from '@/lib/storage';

interface Props {
  onSave: () => void;
}

export default function SettingsPanel({ onSave }: Props) {
  const [settings, setSettings] = useState<AppSettings>(getSettings);
  const [importText, setImportText] = useState('');
  const [importMsg, setImportMsg] = useState('');

  function update(patch: Partial<AppSettings>) {
    const next = { ...settings, ...patch };
    setSettings(next);
    saveSettings(next);
    onSave();
  }

  function toggleLang(lang: Language) {
    const langs = settings.defaultLanguages.includes(lang)
      ? settings.defaultLanguages.filter(l => l !== lang)
      : [...settings.defaultLanguages, lang];
    update({ defaultLanguages: langs });
  }

  function handleExport() {
    const json = exportAllData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MyOctaves-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport() {
    if (!importText.trim()) return;
    const result = importAllData(importText);
    if (result.success) {
      setImportMsg('Imported successfully!');
      setSettings(getSettings());
      setImportText('');
      onSave();
    } else {
      setImportMsg(result.error || 'Import failed');
    }
  }

  return (
    <div className="space-y-6 max-w-lg">
      {/* Instrument */}
      <section>
        <h3 className="text-sm font-semibold text-stone-700 mb-2">Default Instrument</h3>
        <div className="flex gap-2">
          {ALL_INSTRUMENTS.map(inst => (
            <button
              key={inst}
              onClick={() => update({ defaultInstrument: inst as Instrument })}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                settings.defaultInstrument === inst
                  ? 'bg-amber-600 text-white'
                  : 'bg-white border border-stone-300 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {inst === 'flute' ? '🪈' : inst === 'guitar' ? '🎸' : '🎤'} {inst}
            </button>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section>
        <h3 className="text-sm font-semibold text-stone-700 mb-2">Languages</h3>
        <div className="flex flex-wrap gap-2">
          {ALL_LANGUAGES.map(lang => (
            <button
              key={lang}
              onClick={() => toggleLang(lang)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                settings.defaultLanguages.includes(lang)
                  ? 'bg-amber-600 text-white'
                  : 'bg-white border border-stone-300 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </section>

      {/* Era */}
      <section>
        <h3 className="text-sm font-semibold text-stone-700 mb-2">Era Range</h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={settings.eraStart}
            onChange={e => update({ eraStart: Number(e.target.value) })}
            className="w-24 rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <span className="text-stone-400">to</span>
          <input
            type="number"
            value={settings.eraEnd}
            onChange={e => update({ eraEnd: Number(e.target.value) })}
            className="w-24 rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </section>

      {/* Repeat Avoidance */}
      <section>
        <h3 className="text-sm font-semibold text-stone-700 mb-2">Avoid Repeats (weeks)</h3>
        <input
          type="number"
          min={0}
          max={52}
          value={settings.avoidRepeatsWeeks}
          onChange={e => update({ avoidRepeatsWeeks: Number(e.target.value) })}
          className="w-24 rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </section>

      {/* Export / Import */}
      <section className="border-t border-stone-200 pt-4">
        <h3 className="text-sm font-semibold text-stone-700 mb-2">Backup & Restore</h3>
        <div className="flex gap-2 mb-3">
          <button
            onClick={handleExport}
            className="rounded-lg bg-stone-700 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 transition"
          >
            Export JSON
          </button>
        </div>
        <textarea
          placeholder="Paste exported JSON here to import..."
          value={importText}
          onChange={e => setImportText(e.target.value)}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={handleImport}
            disabled={!importText.trim()}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-40 transition"
          >
            Import
          </button>
          {importMsg && <span className="text-xs text-stone-500">{importMsg}</span>}
        </div>
      </section>
    </div>
  );
}
