import React, { useState, useRef } from 'react';
import '../css/navbar.css';
import { useClickOutside } from '../utilits/autoclose';

export default function HeaderNav({ menuItems = [] }) {
  const [openTitle, setOpenTitle] = useState(null);
  const navRef = useRef(null);
  useClickOutside(navRef, () => setOpenTitle(null));

  const renderMenu = (items) => (
    <ul className="menu">
      {items.map(item => {
        const hasSub = item.submenu?.length > 0;
        const isOpen = openTitle === item.title;
        return (
          <li
            key={item.title}
            ref={hasSub && isOpen ? navRef : null}
            className={`menu-item${hasSub ? ' dropdown' : ''}${isOpen ? ' open' : ''}`}
          >
            <a
              href={item.link || '#'}
              className="menu-link"
              onClick={(e) => {
                if (hasSub) {
                  e.preventDefault();
                  setOpenTitle(isOpen ? null : item.title);
                }
              }}
            >
              {item.title}
            </a>
            {hasSub && isOpen && (
              <ul className="dropdown-menu">
                {item.submenu.map(sub => (
                  <li key={sub.title} className="dropdown-menu-item">
                    <a href={sub.link || '#'} className="dropdown-menu-link">
                      {sub.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav className="navbar">
      {renderMenu(menuItems)}
    </nav>
  );
}
