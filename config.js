module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  MONGODB: process.env.ATLAS || "mongodb://localhost:27017/biqcat",
  SECRET: process.env.JWT_SECRET || "shhh",
};
