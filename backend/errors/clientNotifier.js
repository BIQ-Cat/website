module.exports = (err, req, res, next) => {
  res.status(500).json({
    success: false,
    msg: "Internal server error",
  });
};
