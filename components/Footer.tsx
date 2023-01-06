import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTelegram } from '@fortawesome/free-brands-svg-icons';
import FAQModal from './FAQModal';

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="bg-[#091B18] flex items-center justify-between px-4 py-3">
      <div className="text-sm font-bold text-green-700">
        Follow us on
        <a href="#" className="ml-2">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#" className="ml-2">
          <FontAwesomeIcon icon={faTelegram} />
        </a>
      </div>
      <div className="text-sm font-bold text-green-700">
      <button onClick={() => setIsOpen(true)}>FAQ</button>
      <FAQModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </footer>
  );
};

export default Footer;
