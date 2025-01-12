import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

// Middleware to authenticate the token
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // TODO: verify the token exists and add the user data to the request object
  // Get the authorizaiton headers from the request
  const authHeader = req.headers.authorization;
   
  // Check if the authorization header is present
  if (authHeader) {
    // Get the token from the authorization header
    const token = authHeader.split(' ')[1];

    // Get the secret key from the environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // Verify the token
    jwt.verify(token, secretKey, (err, user) => {
      // Check if error exists
      if (err) {
        // Send forbidden status code
        return res.sendStatus(403);
      }

      // Attach the user information to the request object
      req.user = user as JwtPayload;
      // Call the next middleware
      return next();
    });
  } else {
    // Send unauthorized status code
    res.sendStatus(401);
  }
}
