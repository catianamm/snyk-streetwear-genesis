
 // Removed React
import { Link } from 'react-router-dom';
import NewsletterSignup from './NewsletterSignup'; // Assuming NewsletterSignup.tsx is in the same directory
import { Instagram } from 'lucide-react'; // Import Instagram icon

interface FooterProps {
  className?: string;
}

// TikTok Icon Component (SVG)
const TikTokIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.292-1.982-1.292-3.297h-3.26v14.453c0 2.007-1.635 3.642-3.642 3.642s-3.642-1.635-3.642-3.642 1.635-3.642 3.642-3.642c.394 0 .773.063 1.127.178V8.56a7.045 7.045 0 0 0-1.127-.09c-3.86 0-6.988 3.128-6.988 6.988s3.128 6.988 6.988 6.988 6.988-3.128 6.988-6.988V9.321a9.69 9.69 0 0 0 4.786 1.245v-3.26c-.927 0-1.827-.266-2.6-.744z"/>
  </svg>
);

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  return ( // Removed ml-20 md:ml-24 from this div
    <footer className={`bg-black py-0 text-zinc-400 border-t border-zinc-800 ${className}`}>
      <div className="c px-4 py-0  mt-0">
        
       
        {/* Copyright and Legal Links */}
        <div className="flex flex-col my-0 md:flex-row justify-between items-center text-center md:text-left">
           
         <div className="flex space-x-4 md:mt-0 items-center"> {/* Reduced spacing */}
              <p className="text-xs font-thin text-[0.65rem] text-zinc-500">&copy; {new Date().getFullYear()} </p>
               <img 
                src="https://cms.snyk.store/wp-content/uploads/2025/06/logob.png" 
                alt="Snyk Logo Glitch" 
                className="h-10 w-auto object-contain  "
              />
            <Link to="/privacy" className="text-xs font-thin text-[0.65rem] hover:text-purple-400 transition-colors">FAQ</Link>
            <Link to="/privacy" className="text-xs font-thin text-[0.65rem] hover:text-purple-400 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-xs font-thin text-[0.65rem] hover:text-purple-400 transition-colors">Terms</Link>
         <div className="flex space-x-3">
            <a 
              href="https://instagram.com/snyk.store" // Replace with your actual Instagram link
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-purple-400 transition-colors"
            >
              <Instagram size={16} /> {/* Adjusted size for footer */}
              <span className="sr-only">Instagram</span>
            </a>
            <a 
              href="#" // Replace with your actual TikTok link
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-purple-400 transition-colors"
            >
              <TikTokIcon size={16} /> {/* Use TikTokIcon */}
              <span className="sr-only">TikTok</span>
            </a>
          </div>
          </div>
         
         <div className="flex items-center space-x-4 my-0"> {/* Container for newsletter and social icons */}
          <div className="hidden md:block"> {/* Hide newsletter on small screens if too crowded, or adjust layout */}
            <NewsletterSignup 
              showTitle={false} 
              buttonText="Subscribe" 
            />
          </div>
         
        </div>
        </div>

       
      </div>
    </footer>
  );
};

export default Footer;
