const Footer = () => {
  return (
    <footer className="py-8 px-4 text-center border-t border-gray-800">
      <div className="container mx-auto">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} SoomAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;