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
        if(!this.employer[0].webpage.startsWith("https://") || !this.employer[0].webpage.startsWith("http://"))
        {
            this.employer[0].webpage = "https://" + this.employer[0].webpage;
        }

          return new HandleBars.SafeString(
          " <div class='matchcardheader'>\
                <div class='accentbarTitle accentbarTitleMatching'></div>\
                <h1 class='logintitle matchingtitle'>" + this.employer[0].name + "</h1>\
                <a href="+ this.employer[0].webpage + " class='webpagetitlematching'>" + this.employer[0].webpage + "</a>\
                <p>" + this.city + " | ca. " + this.distanceToUserCity + "km</p>\
                <p>" + this.employer[0].adress + "</p>\
            </div>\
            <div class='matchcardchips'></div>\
            <div class='companyshortdescription'>" + this.employer[0].shortdescription + "</div>\
             <div class='companycontact'>\
                <table class='matchingbutttontable'>\
                  <tr>\
                    <td>\
                        <button onclick=\"M.toast({html: 'Email kopiert'})\" data-clipboard-text=" + this.email + " type='email' class='button noselect contactbtn'>\
                        " + this.email + "\
                        </button>\
                      </td>\
                      <td>\
                        <button onclick=\"M.toast({html: 'Telefonnummer kopiert'})\" data-clipboard-text=" + this.phone + " type='email' class='button noselect contactbtn'>\
                        " + this.phone + "\
                        </button>\
                    </td>\
                  </tr>\
                </table>\
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