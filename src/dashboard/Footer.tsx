const Footer = () => {
  return (
    
    <footer className="bg-white fixed bottom-0 shadow-inner mt-auto px-6 py-4 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between">
      <span>&copy; {new Date().getFullYear()} EventPro Admin Dashboard. All rights reserved.</span>
      <div className="mt-2 sm:mt-0 space-x-4">
        <a href="/privacy" className="hover:underline">Privacy Policy</a>
        <a href="/terms" className="hover:underline">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
