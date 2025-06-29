import ShinyText from './ShinyText';

const Footer = () => (
  <footer className="text-center text-2xl mt-8 text-slate-400 flex justify-center items-center gap-2">
    <span>Made by </span>
    <a
      href="https://github.com/tshrrx"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition-colors"
    >
      <ShinyText text="tshrrx" disabled={false} speed={3} className='custom-class' />
    </a>
  </footer>
);

export default Footer;