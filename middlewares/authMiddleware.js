


const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    try {
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        
        console.log('Decoded token:', decodedToken);
        
        return decodedToken;
    } catch (error) {
        
        console.error('Token verification failed:', error);
        return null;
    }
};

const authMiddleware = (req, res, next) => {
    try {
        
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authorizationHeader.split(' ')[1];

        
        const decodedToken = verifyToken(token);

        if (!decodedToken || !decodedToken.userId || !decodedToken.username) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        
        req.decodedToken = decodedToken;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
