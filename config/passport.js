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
                    return done(null, false, req.flash('failureMsg', "<div id=\"alertdiv\" class=\"alert\"> <span class='closebtn' onclick='this.parentElement.style.display=\"none;\"\'>&times;</span>\
                    Email already taken!\
                    </div>\
                    "));
                } else {
                    console.log("no error");
                    if(!(password === req.body.confirmpassword)){
                        return done(null, false, req.flash('failureMsg', "<div id=\"alertdiv\" class=\"alert\"> <span class='closebtn' onclick='this.parentElement.style.display=\"none;\"\'>&times;</span>\
                        Passwords do not match!\
                        </div>\
                        "));
                    } else if(validateEmail(email)){
                        return done(null, false, req.flash('failureMsg', "<div id=\"alertdiv\" class=\"alert\"> <span class='closebtn' onclick='this.parentElement.style.display=\"none;\"\'>&times;</span>\
                        Please check your email!\
                        </div>\
                        "));
                    } else if(validateBirthdate(req.body.birthday)){
                        return done(null, false, req.flash('failureMsg', "<div id=\"alertdiv\" class=\"alert\"> <span class='closebtn' onclick='this.parentElement.style.display=\"none;\"\'>&times;</span>\
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
                            employer.employerdata = parseInt(data[0]) + 1;
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
                                "chips": req.body.chips
                            };
                            employer.companyAdress = req.body.companyAdress;
                            req.body.chips = "{}";

                            var insertQuery = "INSERT INTO user ( email, password, fullname, birthday, city, workradius, workarea, chips, employerdata, phone) values ('" + email + "','" + md5(password) + "','" + req.body.fullname + "','" + req.body.birthdate + "','" + req.body.city + "','" + 0 + "','" + req.body.workarea + "','" + req.body.chips + "','" + employee.employerdata + "','" + req.body.phone + "')";
                            var insertEmployeeQuery = "INSERT INTO employer_data ( name , email, phone, webpage, shortdescription, adress, jobinfo, id ) values ('" + req.body.companyName + "','" + req.body.companyEmail + "','" + req.body.companyPhone + "','" + req.body.webPage + "','" + req.body.shortDesc + "','" + req.body.companyAdress + "','" + req.body.jobInfo + "','" + employer.employerdata + "')";
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
                        employee.chips = req.body.chips;
                        req.body.chips = "{}";
                        employee.workradius = req.body.workradius;
                        employee.phone = req.body.phone;
                        employee.employerdata = -1;

                        var insertQuery = "INSERT INTO user ( email, password, fullname, birthday, city, workradius, workarea, chips, employerdata, phone) values ('" + email + "','" + md5(password) + "','" + req.body.fullname + "','" + req.body.birthdate + "','" + req.body.city + "','" + req.body.workradius + "','" + req.body.workarea + "','" + req.body.chips + "','" + employee.employerdata + "','" + req.body.phone + "')";
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
                    return done(err);
                }
                if (typeof data === "undefined") {
                    console.log("lost length");
                    return done(null, false, req.flash('failureMsg', "<div id=\"alertdiv\" class=\"alert\"> <span class='closebtn' onclick='this.parentElement.style.display=\"none;\"\'>&times;</span>\
                    No User found!\
                    </div>\
                    "));        }
                console.log(md5(password));
                console.log(data);
                console.log(data.data.password);
                if (!(data.data.password === md5(password))) {
                    return done(null, false, req.flash('failureMsg', "<div id=\"alertdiv\" class=\"alert\"> <span class='closebtn' onclick='this.parentElement.style.display=\"none;\"\'>&times;</span>\
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
   return reg.test(birthdate)
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }