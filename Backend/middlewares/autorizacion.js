const autorization = (req, res, next) => {
	const { isAdmin } = req.user;
	if (isAdmin !== 1) {
		res.status(403).json({ message: 'no tienes permisos para acceder' });
	} else {
		next();
	}
};
module.exports = autorization;
