'use client';

import { WeekRange } from '@/lib/types';
import { offsetWeek, thisWeek } from '@/lib/dateUtils';

interface Props {
  week: WeekRange;
  onChange: (w: WeekRange) => void;
}

export default function WeekNav({ week, onChange }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-white px-5 py-3 shadow-sm border border-stone-200">
      <button
        onClick={() => onChange(offsetWeek(week, -1))}
        className="rounded-lg px-3 py-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-700 transition font-medium"
      >
        &larr; Prev
      </button>

      <div className="text-center">
        <p className="text-sm font-semibold text-stone-700">{week.label}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(thisWeek())}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 transition"
        >
          Today
        </button>
        <button
          onClick={() => onChange(offsetWeek(week, 1))}
          className="rounded-lg px-3 py-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-700 transition font-medium"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
