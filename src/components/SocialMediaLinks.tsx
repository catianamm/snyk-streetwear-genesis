
import React from 'react';
import { Instagram } from 'lucide-react';

// TikTok Icon Component (since it's not in lucide-react)
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.292-1.982-1.292-3.297h-3.26v14.453c0 2.007-1.635 3.642-3.642 3.642s-3.642-1.635-3.642-3.642 1.635-3.642 3.642-3.642c.394 0 .773.063 1.127.178V8.56a7.045 7.045 0 0 0-1.127-.09c-3.86 0-6.988 3.128-6.988 6.988s3.128 6.988 6.988 6.988 6.988-3.128 6.988-6.988V9.321a9.69 9.69 0 0 0 4.786 1.245v-3.26c-.927 0-1.827-.266-2.6-.744z"/>
  </svg>
);

const SocialMediaLinks = () => {
  return (
    <div className="flex justify-center space-x-6">
      <a 
        href="https://instagram.com/snyk.store" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-zinc-400 hover:text-white transition-colors"
      >
        <Instagram size={20} />
        <span className="sr-only">Instagram</span>
      </a>
      <a 
        href="#" 
        className="text-zinc-400 hover:text-white transition-colors"
      >
        <TikTokIcon size={20} />
        <span className="sr-only">TikTok</span>
      </a>
    </div>
  );
};

export default SocialMediaLinks;
