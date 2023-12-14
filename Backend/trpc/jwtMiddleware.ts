import { t } from './router';

export const jwtVerificationMiddleware = t.middleware(({ ctx, next }) => {
    console.log('Verifying user authentication...');

    if (!ctx.user) {
        console.log('Authentication required, no user in context');
        throw new Error('Authentication required');
    }

    console.log('User is authenticated');
    return next();
});

