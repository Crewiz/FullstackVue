import { t } from './router';
import jwt from 'jsonwebtoken';

export const jwtVerificationMiddleware = t.middleware(async ({ ctx, next }) => {
    console.log('Checking for Authorization header...');

    const authHeader = ctx.req.headers.authorization;
    if (!authHeader) {
        console.log('No Authorization header provided');
        throw new Error('No token provided');
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token); // Add this line to log the extracted token
    if (!token) {
        console.log('Authorization header provided without token');
        throw new Error('No token provided');
    }

    console.log('Token found, verifying...');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log('Token is valid:', decoded);
        ctx.user = decoded; // Attach user info to context
        return next();
    } catch (error) {
        if (error instanceof Error) {
            console.log('Invalid token:', error.message);
        } else {
            console.log('Invalid token and error was not an instance of Error:', error);
        }
        throw new Error('Invalid token');
    }
});
