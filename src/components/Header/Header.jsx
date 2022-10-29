import { useCallback, useEffect, useState } from 'react';
import { ReactComponent as CloseMenuIcon } from '../../images/icon-close-menu.svg';
import { ReactComponent as MenuIcon } from '../../images/icon-menu.svg';
import { ReactComponent as LogoIcon } from '../../images/logo.svg';
import { Button } from '../Button';
import { MobileMenu } from '../MobileMenu';
import { NavItem } from '../NavItem';
import { NavMenu } from '../NavMenu';
import { COMPANY, FEATURES } from './constants';

const navMap = [
  { text: 'Features', items: FEATURES },
  { text: 'Company', items: COMPANY },
  { text: 'Careers' },
  { text: 'About' },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuVisible = useCallback(
    (e) => {
      if (isMobileMenuOpen) {
        const menu = document.getElementById('mobile-menu');

        if (menu.contains(e.target)) {
          setIsMobileMenuOpen(false);
        }
      }
    },
    [isMobileMenuOpen]
  );

  useEffect(() => {
    document.addEventListener('click', handleMenuVisible);

    return () => document.removeEventListener('click', handleMenuVisible);
  }, [handleMenuVisible]);

  return (
    <header className='flex'>
      <LogoIcon />

      <nav className='hidden xl:flex space-x-6 ml-8 items-center'>
        {navMap?.map((item) => (
          <NavItem key={item.text} text={item.text}>
            {item.items && <NavMenu items={item.items} />}
          </NavItem>
        ))}
      </nav>

      <div className='hidden ml-auto xl:flex space-x-5'>
        <Button> Login </Button>
        <Button hasBorder={true}> Register </Button>
      </div>

      <div
        className='flex xl:hidden ml-auto cursor-pointer z-30'
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        {isMobileMenuOpen ? <CloseMenuIcon /> : <MenuIcon />}
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} />
    </header>
  );
};
