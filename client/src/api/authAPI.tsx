import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    //Send a POST request to '/api/login' with user login information in JSON format
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    // Throw an error if the request is not OK (200-299)
    if (!response.ok) {
      // Parse error response as JSON
      const errorData = await response.json();
      // Throw a detailed error message
      throw new Error(`Error: ${errorData.message}`);
    }

    // Parse the response body as JSON
    const data = await response.json();

    // Return the data received from the server
    return data;
  } catch (error) {
    // Log any errors that occur during fetch
    console.error('Error from u ser login: ', error);
    // Return a rejected promise with an error message
    return Promise.reject('Could not fetch user info');
  }
}



export { login };
