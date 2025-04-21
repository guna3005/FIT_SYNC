import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* antd’s reset.css handles most resets, but these basics still apply: */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    background-color: #f7f7f7;
    color: #333;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* antd’s Layout.Content has its own padding, but you can adjust here if needed */
`;

export default GlobalStyles;
