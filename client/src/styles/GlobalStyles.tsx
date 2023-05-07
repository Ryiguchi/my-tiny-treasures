import { createGlobalStyle } from 'styled-components';
import { theme } from './themes';

export const GlobalStyles = createGlobalStyle`

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}
  
#root {
  max-width: 1280px;
  margin: 0 auto;

}

body {

  font-family: 'Open Sans', sans-serif;
  font-size: 1.4rem;
  background-color: ${theme.color.textGray}
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
  border-radius: ${theme.radius.button};
  box-shadow: ${theme.shadow};
  transition: ${theme.button.transition};
  width: fit-content;
  height: ${theme.button.height1};
  color: #fff;
  padding: ${theme.button.padding};
}
`;
