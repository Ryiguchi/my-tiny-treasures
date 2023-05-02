import { createGlobalStyle } from 'styled-components';

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

  padding-bottom: 3rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
  Arial, sans-serif;
  font-size: 1.4rem;
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
}
`;
