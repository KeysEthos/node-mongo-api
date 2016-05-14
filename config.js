//database connect
module.exports = {
  database: process.env.MONGO_URI || 'localhost/users'
};
