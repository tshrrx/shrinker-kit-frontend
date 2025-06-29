'use client';

import { Link as LinkIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UrlFormProps {
  longUrl: string;
  setLongUrl: (url: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const UrlForm = ({ longUrl, setLongUrl, handleSubmit, isLoading }: UrlFormProps) => (
  <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-stretch">
    <div className="relative w-full">
      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
      <Input
        id="longUrl"
        type="url"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Your long URL goes here..."
        required
        className="pl-12 py-6 text-base bg-black/60 text-slate-200 border border-slate-700 placeholder:text-slate-500"
      />
    </div>

    <div className="flex justify-center">
      <Button
        type="submit"
        disabled={isLoading}
        variant="ghost"
        className="border border-slate-700 text-white px-6 py-2 text-base font-medium hover:bg-white/10 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Shortening...' : 'Shorten URL'}
      </Button>
    </div>
  </form>
);

export default UrlForm;
