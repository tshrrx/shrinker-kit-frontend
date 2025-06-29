
import DecryptedText from './DecryptedText';

const Footer = () => (
  <footer className="text-center mt-8 text-slate-400 flex justify-center items-center gap-1">
    <DecryptedText
      text="Made By"
      animateOn="view"
      revealDirection="center"
      speed={0}
      maxIterations={15}
      className="text-lg font-bold text-white animate-shine"
    />
    <a
      href="https://github.com/tshrrx"
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:text-slate-200 transition-colors"
    >
      <DecryptedText
        text="tshrrx"
        animateOn="view"
        revealDirection="center"
        speed={200}
        maxIterations={15}
        className="text-lg font-bold text-white animate-shine"
      />
    </a>
  </footer>
);

export default Footer;
