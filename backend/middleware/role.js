

exports.roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        if (req.user.role !== requiredRole) {
            console.log('User role:', req.user.role);
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    };
};
