import React from 'react';
import MorphingTracker from '@/components/MorphingTracker';

export default function HomePage() {
  return (
    <main className="min-h-screen py-10 px-4 md:px-8 bg-[#090d16] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-slate-950 to-slate-950">
      <MorphingTracker />
    </main>
  );
}
