// src/components/ResultDisplay.tsx
import { Copy } from 'lucide-react';

interface ResultDisplayProps {
  shortUrl: string;
  handleCopy: () => void;
  copied: boolean;
}

const ResultDisplay = ({ shortUrl, handleCopy, copied }: ResultDisplayProps) => {
  if (!shortUrl) return null;

  return (
    <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-md flex items-center justify-between animate-fade-in">
      <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-red-400 font-medium truncate pr-4">
        {shortUrl}
      </a>
      <button
        onClick={handleCopy}
        className="p-2 text-slate-400 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        title="Copy to clipboard"
      >
        {copied ? 'Copied!' : <Copy className="h-5 w-5" />}
      </button>
    </div>
  );
};
export default ResultDisplay;