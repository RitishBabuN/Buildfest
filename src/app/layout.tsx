import './globals.css';
import React from 'react';

export const metadata = {
  title: 'AI Meeting to Action Compliance Tracker | Next.js & Framer Motion',
  description: 'Fluid state transitions using Framer Motion layoutId between AI meeting summary and compliance tracker.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#090d16] text-slate-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
