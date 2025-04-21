import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { NavbarContainer } from './Navbar.styles';

const items = [
  { label: <NavLink to="/food-log">Food Log</NavLink>, key: '/food-log' },
  { label: <NavLink to="/workout-log">Workout Log</NavLink>, key: '/workout-log' },
  { label: <NavLink to="/analytics">Analytics</NavLink>, key: '/analytics' },
];

const Navbar = () => {
  const location = useLocation();
  const [current, setCurrent] = useState('/food-log');

  useEffect(() => {
    const path = location.pathname;
    if (items.some(item => item.key === path)) {
      setCurrent(path);
    }
  }, [location]);

  const onClick = e => setCurrent(e.key);

  return (
    <NavbarContainer>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[current]}
        onClick={onClick}
        items={items}
      />
    </NavbarContainer>
  );
};

export default Navbar;
