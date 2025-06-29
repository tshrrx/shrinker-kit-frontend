// src/components/UrlForm.tsx
import { Link as LinkIcon } from 'lucide-react';

interface UrlFormProps {
  longUrl: string;
  setLongUrl: (url: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const UrlForm = ({ longUrl, setLongUrl, handleSubmit, isLoading }: UrlFormProps) => (
  <form onSubmit={handleSubmit}>
    <label htmlFor="longUrl" className="sr-only">Enter your long URL</label>
    <div className="relative">
      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
      <input
        id="longUrl"
        type="url"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="https://your-super-long-url.com/goes-here"
        className="w-full pl-12 pr-4 py-3 text-lg bg-slate-800/50 border border-slate-700 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white transition-shadow duration-200 placeholder:text-slate-500"
        required
      />
    </div>
    <button
      type="submit"
      disabled={isLoading}
      className="mt-4 w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black transition-colors duration-200 disabled:bg-red-400/50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Shortening...' : 'Shorten URL'}
    </button>
  </form>
);
export default UrlForm;