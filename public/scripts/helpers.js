var HandleBars = require('handlebars');
var register = function(Handlebars) {
    var helpers = {
      // put all of your helpers inside this object
      getAge: function(person) {
        var today = new Date();
        console.log(person)
        var formatbd = person.birthday.split(".");
        var birthdatez = new Date(formatbd[2], formatbd[1], formatbd[0])
        var age = today.getFullYear() - birthdatez.getFullYear();
            var m = today.getMonth() - birthdatez.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthdatez.getDate())) {
                age--;
            }
         return age;
      },
      generate_card: function(){
          return new HandleBars.SafeString(
          " <div class='matchcardheader'>\
                <div class='accentbarTitle'></div>\
                <h1 class='logintitle matchingtitle'>" + this.employer[0].companyname + "</h1>\
                <p>" + this.employer[0].webpage + "</p>\
                <p>" + this.city + " | ca. " + this.distanceToUserCity + "km</p>\
                <p>" + this.employer[0].adress + "</p>\
            </div>\
            <div class='matchcardchips'></div>\
            <div class='companyshortdescription'>" + this.employer[0].shortdescription + "</div>\
             <div class='companycontact'>\
                <button type='email' class='button noselect'>\
                " + this.email + "\
                </button>\
                <button type='email' class='button noselect'>\
                " + this.phone + "\
                </button>\
              </div>\
              <div class='footer'>gefunden auf JobMatch.er</div>\
      "
          )
      }
    };
  
    if (Handlebars && typeof Handlebars.registerHelper === "function") {
      // register helpers
      for (var prop in helpers) {
          Handlebars.registerHelper(prop, helpers[prop]);
      }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }
  
  };
  
  module.exports.register = register;
  module.exports.helpers = register(null);   