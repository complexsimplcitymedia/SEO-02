import React from 'react';
import { motion } from 'framer-motion';

interface NavigationItemProps {
  item: string;
  currentPage: string;
  isMobile: boolean;
  onPageChange: (page: string) => void;
  onMobileClose?: () => void;
}

export default function NavigationItem({ 
  item, 
  currentPage, 
  isMobile, 
  onPageChange,
  onMobileClose 
}: NavigationItemProps) {
  const handleClick = () => {
    onPageChange(item);
    if (isMobile && onMobileClose) onMobileClose();
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`${
        isMobile ? 'block w-full text-left' : ''
      } text-white font-medium transition-colors whitespace-nowrap px-3 py-2 rounded-lg ${
        currentPage === item ? 'bg-blue-600' : 'hover:bg-white/10'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {getPageTitle(item)}
    </motion.button>
  );
}

function getPageTitle(page: string): string {
  switch (page) {
    case 'faq':
      return 'FAQ';
    case 'faqai':
      return 'AI Assistant';
    case 'wrap-brands':
      return 'Wrap Brands';
    case 'configurator':
      return 'Car Configurator';
    default:
      return page.charAt(0).toUpperCase() + page.slice(1);
  }
}