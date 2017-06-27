'use strict';
let nodemailer = require('nodemailer');
let userServices = require('./../services/usersServices.js') 

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'entrelineasbookstore@gmail.com',
        pass: 'Clase2013'
    }
});

module.exports = function(app, passport){
 
    /*app.post('/signUp',
    	passport.authenticate('local-signup', {failWithError:true}),
    	function(req, res, next){
    		if (req.xhr) {
    			return res.json({id: req.user.id})
    		}
            //return res.redirect('/')
    	}
    )*/



    ///////////////////////////////////////////////////////////////////////////
    /*
    crear usuarios
    */
    ///////////////////////////////////////////////////////////////////////////
    /*app.post('/x/v1/user/sign_up', function(req, res){
        userServices.getEmail(req.body, function(err, users){
            if (users) {
                return res.json({ status: 'FAIL', message: 'este email ya existe' });    
            }else{
                userServices.create(req.body, function(err, user){
                    if(err){
                        return res.json({ err:err })
                    }else{
                        let mailOptions = {
                            from: '<entrelineas@entrelineas.com>',         // email del que se envia
                            to: user.local.email,                      // al usuario que se la va enviar
                            subject: 'Registro',                           // mensaje en el sujeto
                            html:  'Gracias por tu Registro, <a href="http://162.243.239.222/x/v1/user/token?email='+user.local.email+'&token='+user.local.token+'">Dale click para activar tu cuenta</a>'          // texto
                        };
                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            //console.log('Message %s sent: %s', info.messageId, info.response);
                        });
                        return res.json({ status: 'SUCCESS', message: 'Usuario Creado', user: user });
                    }
                })  
            }  
        })
    })*/

    ///////////////////////////////////////////////////////////////////////////
    /*
    crear usuario
    */
    ///////////////////////////////////////////////////////////////////////////

    app.post('/x/v1/user/sign_up', passport.authenticate('local-signup', {
        successRedirect : '/x/v1/user/success_sign_up',  // redirect to the secure profile section
        failureRedirect : '/x/v1/user/fail_sign_up',   // redirect back to the signup page if there is an error
        failureFlash : false  
    }))


    ///////////////////////////////////////////////////////////////////////////
    /*
    SE creo exitosamente
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/success_sign_up', function(req, res) {    
        res.json({ status: 'SUCCESS', mensaje: 'Usuario Creado', user: req.user});        
    });


    ///////////////////////////////////////////////////////////////////////////
    /*
    NO SE creo exitosamente
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/fail_sign_up', function(req, res) {    
        res.json({ status: 'FAIL', mensaje: 'usuario ya existe'});        
    });


    ///////////////////////////////////////////////////////////////////////////
    /*
    LOGIN
    */
    ///////////////////////////////////////////////////////////////////////////

    app.post('/x/v1/user/login', passport.authenticate('local-login', {
        successRedirect : '/x/v1/user/perfil',  
        failureRedirect : '/x/v1/user/loginFail',  
        failureFlash : true  
    }));

    ///////////////////////////////////////////////////////////////////////////
    /*
    si el login es exitoso
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/perfil', function(req, res){
        if(req.user){
            res.json({status:'SUCCESS', user: req.user}) 
        }else{
            res.json({status:'FAIL', mensaje: "Usuario sin login"}) 
        }
           
    })


    ///////////////////////////////////////////////////////////////////////////
    /*
    si el login NO FUE exitoso
    */
    ///////////////////////////////////////////////////////////////////////////
    app.get('/x/v1/user/loginFail', function(req, res){
        res.json({ status: 'FAIL', mensaje: 'datos incorrectos' });   
    })
      
         
}