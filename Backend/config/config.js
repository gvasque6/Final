require('dotenv').config();

const config = {
	port: process.env.API_PORT,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	dbUser: process.env.DB_USER,
	dbPass: process.env.DB_PASS,
	jwtsecret: process.env.JWT_SECRET,
};
module.exports = config;
