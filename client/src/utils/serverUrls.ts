const baseUrl = 'http://localhost:8000';
const apiUrl = `${baseUrl}/api/v1`;

export const serverRoute = {
  signIn: `${apiUrl}/users/signin`,
  signout: `${apiUrl}/users/signout`,
  signUp: `${apiUrl}/users/signup`,
  checkSignedIn: `${apiUrl}/users/checkLoggedIn`,
};
