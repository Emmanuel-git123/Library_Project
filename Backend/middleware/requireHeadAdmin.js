const requireHeadAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'HEAD_ADMIN') {
        return res.status(403).json({message: "Access denied: Head Admins only"});
    }
    next();
};

module.exports = requireHeadAdmin;
