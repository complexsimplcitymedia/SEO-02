import React from 'react';
import NavigationItem from './NavigationItem';

interface NavigationItemsProps {
  currentPage: string;
  isMobile: boolean;
  onPageChange: (page: string) => void;
  onMobileClose?: () => void;
}

export default function NavigationItems({ 
  currentPage, 
  isMobile, 
  onPageChange,
  onMobileClose 
}: NavigationItemsProps) {
  const pages = [
    'home',
    'services',
    'wrap-brands',
    'configurator',
    'pricing',
    'car-care',
    'gallery',
    'faq',
    'faqai',
    'about',
    'contact'
  ];

  return (
    <>
      {pages.map((page) => (
        <NavigationItem
          key={page}
          item={page}
          currentPage={currentPage}
          isMobile={isMobile}
          onPageChange={onPageChange}
          onMobileClose={onMobileClose}
        />
      ))}
    </>
  );
}