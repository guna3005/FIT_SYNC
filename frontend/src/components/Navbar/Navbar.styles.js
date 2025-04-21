import styled from 'styled-components';

export const NavbarContainer = styled.div`
  .ant-menu {
    background: transparent;
    border-bottom: none;
  }

  .ant-menu-item a {
    color: rgba(255, 255, 255, 0.75);
    font-size: 16px;
  }

  .ant-menu-item:hover a {
    color: #fff;
  }

  .ant-menu-item-selected a {
    color: #1890ff !important;
  }
`;
