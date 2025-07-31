// DropdownMenu.js
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

// Recursively builds nested dropdown menus
export const RecursiveDropdown = ({ items }) =>
  items.map((item, i) =>
    item.submenu && item.submenu.length > 0 ? (
      <Dropdown key={i} drop="end">
        <Dropdown.Toggle as="a" className="dropdown-item dropdown-toggle">
          {item.title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <RecursiveDropdown items={item.submenu} />
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <Dropdown.Item href={item.link} key={i}>
        {item.title}
      </Dropdown.Item>
    )
  );
