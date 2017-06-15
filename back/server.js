'use strict';
/////////////////////////////////////////////////////////////////////////
/***** librerias necesarias para el funcionamiento de la app  **********/
/////////////////////////////////////////////////////////////////////////
let express      = require('express') 
let app          = express();
let bodyParser   = require('body-parser');
let morgan       = require('morgan');
let mongoose     = require('mongoose');
let cookieParser = require('cookie-parser');
let session      = require('express-session');
let path          = require('path');
let categoriaRutas = require('./routes/Categoria.js');
let pruebaRutas = require('./routes/Prueba.js');


/////////////////////////////////////////////////////////////////////////
/***** librerias necesarias para el login con facebook | google  *******/
/////////////////////////////////////////////////////////////////////////
let passport = require('passport');
let flash    = require('connect-flash');


/////////////////////////////////////////////////////////////////////////
/********* importo el archivo de configuracion de passport   ***********/
/////////////////////////////////////////////////////////////////////////
require('./config/passport')(passport); // pass passport for configuration

/////////////////////////////////////////////////////////////////////////
/***** puerto donde va a funcionar el servidor por defecto 8080  *******/
/////////////////////////////////////////////////////////////////////////
let port = process.env.port || 8080;


/////////////////////////////////////////////////////////////////////////
/****** para que el al recargar no aparezca el mensaje de get  *********/
/////////////////////////////////////////////////////////////////////////

app.get('/:url', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/docs/index.html'));
});
app.get('/:url/:url', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/docs/index.html'));
});


/////////////////////////////////////////////////////////////////////////
/******                 accesos                       *********/
/////////////////////////////////////////////////////////////////////////
mongoose.Promise = global.Promise;
let config = require('./config/config.js');
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
};

//llamo al archivo de configuracion
mongoose.connect(config.database)
app.use(express.static('../front/docs'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(allowCrossDomain);




/////////////////////////////////////////////////////////////////////////
/******                 ACTIVO LA SESION                       *********/
/////////////////////////////////////////////////////////////////////////
app.use(session({ 
	secret: '23eirofjiw8',
	resave: false, 
	saveUninitialized: false 
}));  

app.use(passport.initialize());
app.use(passport.session());  
app.use(flash()); 



/////////////////////////////////////////////////////////////////////////
/********                 CREO LAS RUTAS                       *********/
/////////////////////////////////////////////////////////////////////////
require('./routes/Users.js')(app, passport);
app.use('/x/v1/cat/categoria', categoriaRutas)
app.use('/x/v1/pru/prueba', pruebaRutas)


app.listen(port)
console.log("run in: " + port)