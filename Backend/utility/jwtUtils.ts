import jwt from 'jsonwebtoken';

/**
 * Decodes and verifies a JWT token.
 * @param {string} token - The JWT token to be verified.
 * @return {Promise<Object | null>} The decoded token if valid, otherwise null.
 */
export async function decodeAndVerifyJwtToken(token: string) {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('JWT Verification successful:', decoded);
        return decoded; // Return the decoded token data
    } catch (error) {
        console.error('Error verifying token:', error);
        return null; // Return null if the token is invalid or expired
    }
}
