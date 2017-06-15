
//let localStrategy = require('passport-local').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/usersModel.js');
let moment   = require('moment');

module.exports =  function(passport){

 // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'usuario',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        }, 
        function(req, usuario, password, done) {
           console.log(usuario)
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                User.findOne({ 'local.usuario' :  usuario }, function(err, user) {

                    if(err)
                        return done(err);  
                    if(user){
                        return done(null, false, req.flash('signupMessage', 'That usuario is already taken.'));    
                    }else{
                        let newUser = new User();
                        newUser.local.usuario    =  req.body.usuario,
                        newUser.local.password   =  newUser.generateHash(password),
                        newUser.nombre           =  req.body.nombre,
                        newUser.apellido         =  req.body.apellido,
                        newUser.status           =  req.body.status,
                        newUser.nacimiento       =  req.body.nacimiento,
                        newUser.pais             =  req.body.pais,
                        newUser.ciudad           =  req.body.ciudad,
                        newUser.institucion      =  req.body.institucion,
                        newUser.especialidad     =  req.body.especialidad,
                        newUser.direccion        =  req.body.direccion,
                        newUser.telefono         =  req.body.telefono,
                        newUser.email            =  req.body.email,
                        newUser.valor_usuario    =  req.body.valor_usuario,
                        newUser.valor_unico      =  req.body.valor_unico,
                        newUser.institucion_educativa= req.body.institucion_educativa,
                        newUser.grado= req.body.grado,
                        newUser.parentesco= req.body.parentesco,
                        newUser.id_hijo= req.body.id_hijo,
                        newUser.createdAt =  moment().format('YYYY-MM-DD h:mm:ss')
    
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });  
                    }
                })
            });
        }
    ));


    //////////////////////////////////////////////////////////////////////////////////////////
    /**
        GENERO EL LOGIN LOCAL Y DEVUELVO LA SESION DEL USUARIOS DESPUES QUE ACTIVO EL TOKEN
    **/
    //////////////////////////////////////////////////////////////////////////////////////////

    passport.use('local-login', new LocalStrategy({
        usernameField : 'usuario',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, usuario, password, done) { // callback with usuario and password from our form
        console.log(usuario)
        User.findOne({ 'local.usuario' :  usuario }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));

}