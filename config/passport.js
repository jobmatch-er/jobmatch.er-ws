var LocalStrategy   = require('passport-local').Strategy;
var fetcher = require('../fetcher.js')
var app = require('../app.js')
var md5 = require('md5')

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
		done(null,user)
    });
	

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

		// find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        fetcher.sendQuery("select * from users where email = '"+email+"'",function(err, data){	
            console.log(rows);
			console.log("above row object");
            if(data = null)
                console.log(err)
                done(err);
            if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
    
                    // if there is no user with that email
                    // create the user
                    var newUserMysql = new Object();
                    
                    newUserMysql.email    = email;
                    newUserMysql.password = password; // use the generateHash function in our user model
                    newUserMysql.birthday = req.body.birthday
                    newUserMysql.city = req.body.city
                    newUserMysql.workarea = req.body.workarea
                    newUserMysql.chips = req.body.chips
                    newUserMysql.employerdata= req.body.employerdata
                
                    var insertQuery = "INSERT INTO user ( email, password, birthday, city, workarea, chips, employerdata ) values ('" + email +"','"+ password +"','"+ req.body.birthday + "','"+ req.body.city + "','"+ req.body.workarea + "','"+ req.body.chips + "','"+ req.body.employerdata + "')";
                    console.log(insertQuery);
                    fetcher.sendQuery(insertQuery,function(err, data){
                    newUserMysql.id = data.insertId;
                    return done(null, newUserMysql);
                    });	
                }	
            });
    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
         fetcher.sendQuery("SELECT * FROM `user` WHERE `email` = '" + email + "'",function(err,data){
            console.log(JSON.stringify(data))
            if (err) {
                console.log("lost")
                return done(err);
            }
			 if (typeof data === "undefined") {
                console.log("lost length")
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            } 
            console.log(md5(password))
            console.log(data);
            console.log(data.data.password);
            if (!(data.data.password == md5(password))) {
                console.log("lost pw")
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }
            return done(null, data);			
		
		});
		


    }));

};