'use client';

import { useState } from 'react';
import UrlForm from '../components/UrlForm';
import ResultDisplay from '../components/ResultDisplay';
import Footer from '../components/Footer'; // This is the "Made by tshrrx" component
import Threads from '../components/Threads';
import Header from '../components/Header';
import Content from '../components/Content';

import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export default function HomePage() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setShortUrl('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/api/v1/urls`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden scrollbar-hidden">

      {/* GitHub Button */}
      <div className="absolute top-10 right-8 z-50">
        <a
          href="https://github.com/your-username/your-repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" className="text-white hover:text-gray-300 px-4 py-2 text-base flex items-center gap-2">
            <Github className="w-5 h-5" />
            GitHub
          </Button>
        </a>
      </div>

      {/* 🧠 Header with Threads Background */}
      <section className="topside">
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
          <Threads amplitude={2.5} distance={0} enableMouseInteraction={true} />
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-transparent"
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="w-full max-w-2xl px-4"
              style={{ pointerEvents: 'auto' }}
            >
              <Header />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center mt-2 z-10">
        <Footer />
      </section>
      <section>
        <div>
          <Content />
        </div>
      </section>

      {/* 🔗 Form + Results Section */}
      <section className="w-full max-w-2xl mx-auto p-4 z-10">
        <div className="bg-black/60 backdrop-blur-md rounded-lg shadow-2xl p-6 md:p-8">
          <UrlForm
            longUrl={longUrl}
            setLongUrl={setLongUrl}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {shortUrl && (
            <div className="mt-6 space-y-4 animate-fade-in">
              <ResultDisplay shortUrl={shortUrl} handleCopy={handleCopy} copied={copied} />
            </div>
          )}

          {error && (
            <div className="mt-4 text-center p-2 text-red-400 bg-red-900/30 border border-red-800 rounded-md">
              {error}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}