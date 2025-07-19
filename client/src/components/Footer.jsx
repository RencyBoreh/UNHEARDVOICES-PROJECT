const Footer = () => {
  return (
    <footer className="bg-purple-950 text-white text-center py-6 px-4 text-sm mt-10">
      <p className="mb-2">
        ❤️ Every child deserves a voice. Your support makes it possible.
      </p>
      <p>
        Direct contributions accepted via M-PESA: <strong>0722 514 616</strong>
      </p>
      <p className="mt-2 text-xs">&copy; {new Date().getFullYear()} Unheard Voices</p>
    </footer>
  );
};

export default Footer;
