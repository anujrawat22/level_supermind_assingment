const authorize = (roles) => {
  return (req, res, next) => {
    const role = req.user.role;
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    if (!roles.includes(role)) {
      return res
        .status(403)
        .json({ error: "Forbidden: Insufficient role for this action" });
    }

    next();
  };
};
