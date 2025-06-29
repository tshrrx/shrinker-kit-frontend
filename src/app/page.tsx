'use client';

import { useState } from 'react';
import UrlForm from '../components/UrlForm';
import ResultDisplay from '../components/ResultDisplay';
import Footer from '../components/Footer';
import Threads from '../components/Threads';
import Header from '../components/Header';
import Content from '../components/Content';

import { Button } from '@/components/ui/button'; // ✅ Adjust this if needed
import { Github } from 'lucide-react';

export default function HomePage() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [socialPost, setSocialPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setShortUrl('');
    setSocialPost('');

    try {
      const response = await fetch('http://localhost:8080/api/v1/urls', {
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

  const handleGeneratePost = async () => {
    if (!longUrl) return;
    setIsGenerating(true);
    setSocialPost('');

    const prompt = `Based on the following URL, act as an expert social media marketer and write a short, engaging tweet to share it. Include the placeholder "{shortUrl}" where the link should go. Do not include the original URL. URL: ${longUrl}`;

    try {
      const payload = {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      };
      const apiKey = ''; // Set your Gemini API key here
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to generate post from Gemini API.');
      }

      const result = await response.json();
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        let text = result.candidates[0].content.parts[0].text;
        text = text.replace('{shortUrl}', shortUrl);
        setSocialPost(text);
      } else {
        throw new Error('Unexpected response format from Gemini API.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsGenerating(false);
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

      <section>
        <div>
          <Content />
        </div>
      </section>

      {/* 🔗 Form + Results */}
      <section className="w-full max-w-2xl mx-auto p-4 z-10">
        <div className="bg-black/60 backdrop-blur-md border border-slate-700/50 rounded-lg shadow-2xl p-6 md:p-8">
          <UrlForm
            longUrl={longUrl}
            setLongUrl={setLongUrl}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {shortUrl && (
            <div className="mt-6 space-y-4 animate-fade-in">
              <ResultDisplay shortUrl={shortUrl} handleCopy={handleCopy} copied={copied} />
              <button
                onClick={handleGeneratePost}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-colors duration-200 disabled:bg-purple-400/50 disabled:cursor-not-allowed"
              >
                ✨ {isGenerating ? 'Generating...' : 'Generate Social Post'}
              </button>
            </div>
          )}

          {socialPost && (
            <div className="mt-4 animate-fade-in">
              <textarea
                readOnly
                value={socialPost}
                className="w-full p-3 text-base bg-slate-800/70 border border-slate-700 rounded-md text-white placeholder:text-slate-500 h-32 resize-none"
              />
            </div>
          )}

          {error && (
            <div className="mt-4 text-center p-2 text-red-400 bg-red-900/30 border border-red-800 rounded-md">
              {error}
            </div>
          )}
        </div>

        <Footer />
      </section>
    </main>
  );
}
