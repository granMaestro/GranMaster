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
const path          = require('path');
//let mongoStore   = require('connect-mongo')(session)
/////////////////////////////////////////////////////////////////////////
/***** librerias necesarias para el login con facebook | google  *******/
/////////////////////////////////////////////////////////////////////////
let passport = require('passport');
let flash    = require('connect-flash');


/////////////////////////////////////////////////////////////////////////
/***** puerto donde va a funcionar el servidor por defecto 8080  *******/
/////////////////////////////////////////////////////////////////////////
let port = process.env.port || 8080;





/////////////////////////////////////////////////////////////////////////
/********* importo el archivo de configuracion de passport   ***********/
/////////////////////////////////////////////////////////////////////////
require('./config/passport')(passport); // pass passport for configuration


// categorias
let categoriasRutas = require('./routes/Categorias.js');
let libroRutas = require('./routes/Libro.js');
let usersRutas = require('./routes/Users.js');
let signInRutas = require('./routes/signInRutas.js');

// da acceso para los servicios
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

// llamo a los archivos estaticos
app.get('/:url', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/docs/index.html'));
});
app.get('/:url/:url', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/docs/index.html'));
});

app.use(express.static('../front/docs'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(allowCrossDomain);




// required for passport
app.use(session({ 
	secret: '23eirofjiw8',
	resave: false, 
	saveUninitialized: false 
})); /// session secret


/*app.use( session( {
    saveUninitialized: false,
    resave: false,
    secret: "parientico",
    store: new mongoStore( {
        mongooseConnection: mongoose.connection
    } )
} ) );*/


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); 


 


// creo la ruta de las categorias
app.use('/x/v1/cat/categorias', categoriasRutas)
app.use('/x/v1/lib/libro', libroRutas)

//app.use('/producto', productoRutas)

require('./routes/Users.js')(app, passport);

app.listen(port)
console.log("run in: " + port)