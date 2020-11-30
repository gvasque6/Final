const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config/config');
const userRoutes = require('./rutas/userRoutes');
const locationRoutes = require('./rutas/locationRoutes');
const companyRoutes = require('./rutas/companyRoutes');
const contactRoutes = require('./rutas/contactRoutes');
const db = require('./database/conection');
const app = express();
app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'by-content-type' }));
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use('/usuario', userRoutes);
app.use('/localizacion', locationRoutes);
app.use('/compania', companyRoutes);
app.use('/contacto', contactRoutes);

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

app.listen(config.port, () => {
	console.log(`Api escuchando en http://localhost:${config.port}`);
});
