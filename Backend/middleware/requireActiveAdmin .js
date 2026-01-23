const requireActiveAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({message: "Unauthorized"});
    }

    if (req.user.status !== 'active') {
        return res.status(403).json({message: "Account not active"});
    }

    next();
};

module.exports = requireActiveAdmin;
