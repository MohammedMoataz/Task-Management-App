import jwt from 'jsonwebtoken';

export const decodeToken = (token: string) => {
    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.decode(token);
        return decoded;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};
