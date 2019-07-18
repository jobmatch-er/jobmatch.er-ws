var LocalStrategy = require('passport-local').Strategy;
var fetcher = require('../fetcher.js');
var app = require('../app.js');
var md5 = require('md5');

module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function (user, done) {
        done(null, user)
    });

/* Create local username-password sign-up strategy and check if email exists, if not, 
*  proceed to check which usertype the to be registrated user has and send a INSERT query to Backend
*/
    passport.use('local-signup', new LocalStrategy({
            
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            fetcher.sendQuery("select * from user where email = '" + email + "'", function (err, data) {
                console.log(req.body);
                console.log("above row object");
                if (!err) {
                    return done(null, false, req.flash('failureMsg', "<div id=\"alertdiv\" class=\"alert\">\
                    Email already taken!\
                    </div>\
                    "));
                } else {
                    console.log("no error");
                    if(!(password === req.body.repeatpassword)){
                        return done(null, false, req.flash('failureMsg', "<div id=\"alertdiv\" class=\"alert\">\
                        Passwords do not match!\
                        </div>\
                        "));
                    } else if(validateEmail(email)){
                        return done(null, false, req.flash('failureMsg', "<div id=\"alertdiv\" class=\"alert\">\
                        Please check your email!\
                        </div>\
                        "));
                    } else if(validateBirthdate(req.body.birthdate)){
                        return done(null, false, req.flash('failureMsg', "<div id=\"alertdiv\" class=\"alert\">\
                        You must be between 18 and 69 years old!\
                        </div>\
                        "));
                    } else {
                    if (req.body.usertype) {
                        console.log("employer");
                        var employer = {};
                        var idQuery = "SELECT COUNT(*) FROM employer_data";
                        fetcher.sendQuery(idQuery, function (err, data) {
                            console.log(data);
                            employer.employerdata = parseInt(data.data['COUNT(*)'] ) + 1;
                            console.log(email);
                            employer.email = email;
                            employer.password = password;
                            employer.fullname = req.body.fullname;
                            employer.birthday = req.body.birthday;
                            employer.city = req.body.city;
                            employer.phone = req.body.phone;
                            employer.companyName = req.body.companyName;
                            employer.companyEmail = req.body.companyemail;
                            employer.companyPhone = req.body.companyPhone;
                            employer.webPage = req.body.webPage;
                            employer.shortDesc = req.body.shortDesc;
                            employer.jobInfo = {
                                "jobdesc": req.body.jobdesc,
                                "income": req.body.income,
                                "chips": []
                            };
                            if(req.body.chip1){
                                employer.jobInfo.chips[0] = {"name": "temporaryContract"}
                            } else if(req.body.chip2){
                                employer.jobInfo.chips[1] = {"name": "permanentContract"}
                            } else if(req.body.chip3){
                                employer.jobInfo.chips[2] = {"name": "internship"}
                            } else if(req.body.chip4){
                                employer.jobInfo.chips[3] = {"name": "fulltime"}
                            } else if(req.body.chip5){
                                employer.jobInfo.chips[4] = {"name": "parttime"}
                            }
                            employer.companyAdress = req.body.companyAdress;
                            var insertQuery = "INSERT INTO user ( email, password, fullname, birthday, city, workradius, workarea, chips, employerdata, phone) values ('" + email + "','" + md5(password) + "','" + req.body.fullname + "','" + req.body.birthdate + "','" + req.body.city + "','" + 0 + "','" + req.body.workarea + "','" + JSON.stringify(employer.chips) + "','" + employer.employerdata + "','" + req.body.phone + "')";
                            var insertEmployeeQuery = "INSERT INTO employer_data ( name , email, phone, webpage, shortdescription, adress, jobinfo, id ) values ('" + req.body.companyName + "','" + req.body.companyEmail + "','" + 0 + "','" + req.body.webPage + "','" + req.body.shortDesc + "','" + req.body.companyAdress + "','" + JSON.stringify(employer.jobInfo) + "','" + employer.employerdata + "')";
                            console.log(insertQuery);
                            fetcher.sendCommand(insertQuery, function (err, data) {
                                employer.id = data.insertId;
                                fetcher.sendCommand(insertEmployeeQuery, function (err, data) {
                                    return done(null, employer);
                                });
                            });
                        });
                    } else {
                        console.log("user");
                        var employee = {};
                        employee.email = email;
                        employee.password = password;
                        employee.fullname = req.body.fullname;
                        employee.birthday = req.body.birthdate;
                        employee.city = req.body.city;
                        employee.workarea = req.body.workarea;
                        if(req.body.chip1){
                            employee.chips[0] = {"name": "temporaryContract"}
                        } else if(req.body.chip2){
                            employee.chips[1] = {"name": "permanentContract"}
                        } else if(req.body.chip3){
                            employee.chips[2] = {"name": "internship"}
                        } else if(req.body.chip4){
                            employee.chips[3] = {"name": "fulltime"}
                        } else if(req.body.chip5){
                            employee.chips[4] = {"name": "parttime"}
                        }
                        employee.workradius = req.body.workradius;
                        employee.phone = req.body.phone;
                        employee.employerdata = 0;

                        var insertQuery = "INSERT INTO user ( email, password, fullname, birthday, city, workradius, workarea, chips, employerdata, phone) values ('" + email + "','" + md5(password) + "','" + req.body.fullname + "','" + req.body.birthdate + "','" + req.body.city + "','" + req.body.workradius + "','" + req.body.workarea + "','" + JSON.stringify(employee.chips) + "','" + employee.employerdata + "','" + req.body.phone + "')";
                        console.log(insertQuery);
                        fetcher.sendCommand(insertQuery, function (err, data) {
                            employee.id = data.insertId;
                            return done(null, employee);
                        });
                    }
                }
                }
            });
        }));


/* Create local username-password login strategy, check if user exists, if yes, check if hashed passwords match and 
*  proceed to send User object to passport
*/
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            fetcher.sendQuery("SELECT * FROM `user` WHERE `email` = '" + email + "'", function (err, data) {
                console.log(JSON.stringify(data));
                if (err) {
                    console.log("lost");
                    return done(null, false, req.flash('failureMsg', "<div id=\"alertdiv\" class=\"alert\">\
                    No User found!\
                    </div>\
                    "));
                }
                if (typeof data === "undefined") {
                    console.log("lost length");
                    return done(null, false, req.flash('failureMsg', "<div id=\"alertdiv\" class=\"alert\">\
                    No User found!\
                    </div>\
                    "));        }
                console.log(md5(password));
                console.log(data);
                console.log(data.data.password);
                if (!(data.data.password == md5(password))) {
                    return done(null, false, req.flash('failureMsg', "<div id=\"alertdiv\" class=\"alert\">\
                    Wrong password!\
                    </div>\
                    "));
                }
                return done(null, data);

            });



        }));

};

function validateBirthdate(birthdate){
   var reg =  /(\d\d.\d\d.(2[0][0][0-1]|1[5-9][0-9][0-9]))/g;
   return !reg.test(birthdate)
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email);
  }