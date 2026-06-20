exports.adminOnly = (
  req,
  res,
  next
) => {
  if (
    req.user.role !== "admin"
  ) {
    return res.status(403).json({
      message: "Admin Only",
    });
  }

  next();
};

exports.providerOnly = (
  req,
  res,
  next
) => {
  if (
    req.user.role !==
    "provider"
  ) {
    return res.status(403).json({
      message:
        "Provider Only",
    });
  }

  next();
};