import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    // Get the token from the getToken method
    const token = this.getToken();
    // Return the decoded token
    return jwtDecode<JwtPayload>(token);
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    // Decode the token
    const decodedToken = jwtDecode<JwtPayload>(token);
    // Get the expiration time from the token
    const expirationTime = decodedToken.exp;
    // Get the current time
    const currentTime = Date.now() / 1000;
    // Check if the expirationTime exists
    if (expirationTime) {
      // Return true if the token is expired
      return expirationTime < currentTime;
    } else {
      // Return true if the expiration time didn't exist
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    // Get the token from localStorage
    const loggedUser = localStorage.getItem('id_token') || '';
    // Return the token
    return loggedUser;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.href = '/';
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token');
    window.location.href = '/login';
  }
}

export default new AuthService();
