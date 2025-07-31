import React, { useState, useRef } from 'react';
import '../css/navbar.css';
import { useClickOutside } from '../utilits/autoclose';

interface MenuItemData {
  title: string;
  link?: string;
  submenu?: MenuItemData[];
}

interface MenuItemProps {
  item: MenuItemData;
  depth?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, depth = 0 }) => {
  const hasSub = item.submenu && item.submenu.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  const handleToggle = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (hasSub) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  useClickOutside(itemRef, () => setIsOpen(false));

  // Unique class based on depth
  const submenuClass = `submenu-${depth}`;

  return (
    <li className={`nav-item dropdown ${isOpen ? 'show' : ''}`} ref={itemRef}>
      <a
        href={item.link || '#'}
        className={`nav-link ${hasSub ? 'dropdown-toggle' : ''}`}
        onClick={handleToggle}
      >
        {item.title}
      </a>

      {hasSub && (
        <ul className={`dropdown-menu ${isOpen ? 'show' : ''} ${submenuClass}`}>
          {item.submenu!.map((sub, subKey) => (
            <MenuItem 
              key={subKey} 
              item={sub} 
              depth={depth + 1} 
            />
          ))}
        </ul>
      )}
    </li>
  );
};


export default function Nav() {
  const menuItems: MenuItemData[] = [
    { title: 'Home', link: '/home' },
    {
      title: 'Master',
      submenu: [
        { title: 'Branch', 
          submenu: [
            { title: 'Add Branch', link: '/branch' },
            { title: 'View Branch', link: '/branch-view' },
          ] },
        { title: 'State', 
          submenu: [
          { title: 'Add State', link: '/state' },
          { title: 'View State', link: '/state-view' },
        ] },
        { title: 'District', 
          submenu: [
          { title: 'Add District', link: '/district' },
          { title: 'View District', link: 'district-view' },
        ] },
        { title: 'City',
          submenu: [
            { title: 'Add City', link: '/city' },
            { title: 'View City', link: '/city-view' },
          ] 
        },
      ],
    },
    {
      title: 'Employee',
      submenu: [
        { title: 'Add Employee', link: '/employee' },
        { title: 'View Employees', link: 'employee-view' },
      ],
    },
    // { title: 'Reports', link: '/reports' },
    // { title: 'Settings', link: '/settings' },
    { title: 'Logout', link: '/' },
  ];

  const navRef = useRef<HTMLUListElement>(null);

  // Close all submenus when clicking outside the entire nav
  useClickOutside(navRef, () => { 
    // This might require a more sophisticated way to close all nested menus
    // For now, we rely on the individual MenuItem's click outside logic
  });

  return (
    <nav className="navbar navbar-expand navbar-light bg-light ">
      <ul className="navbar-nav me-auto" ref={navRef}>
        {menuItems.map((item, idx) => (
          <MenuItem 
            key={idx} 
            item={item} 
          />
        ))}
      </ul>
    </nav>
  );
}
