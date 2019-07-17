console.log("fddsfgdssdg")
$(document).ready(function () {
    $('input[name=workradius]').tooltipster({
        theme: 'tooltipster-noir',
        maxWidth: 300
    });
    const checkbox = document.getElementById('id-name--1')

    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            $("#formcontainer").append("\
                <div id='optional'>\
                <div class='custominput employeeinput'>\
                    <input type='text' name='companyName' placeholder='Firmenname'/>\
                    <div class='accentbar'></div>\
                </div>\
                <br>\
                <div class='custominput'>\
                    <input type='text' name='companyEmail' placeholder='Firmenemail'/>\
                    <div class='accentbar'></div>\
                </div>\
                <br>\
                <div class='custominput'>\
                    <input type='text' name='webPage' placeholder='Firmenhomepage' />\
                    <div class='accentbar'></div>\
                </div>\
                <br>\
                <div class='custominput'>\
                    <input id='desc' type='text' title='Füge hier paar wichtige Information zu deiner Firma hinzu, wie zum Beispiel wie viele angestellt sind usw.' name='shortDesc' placeholder='Kurze Beschreibung' />\
                    <div class='accentbar'></div>\
                </div>\
                <br>\
                <div class='custominput'>\
                    <input type='text' name='companyAdress' placeholder='Firmenadresse' />\
                    <div class='accentbar'></div>\
                </div>\
                <br>\
                <div class='custominput'>\
                    <input type='text' name='jobdesc' placeholder='Kurze Beschreibung zum Job' />\
                    <div class='accentbar'></div>\
                </div>\
                <br>\
                <div class='custominput'>\
                    <input type='text' name='income' placeholder='monatliches Gehalt' />\
                    <div class='accentbar'></div>\
                </div>\
                <br>\
                </div>\
            ");
            $('#desc').tooltipster({
                theme: 'tooltipster-noir',
                maxWidth: 300
            });
            $(".select-items").addClass("jobdropdownp")
        } else {
            $("#optional").remove();
            $(".select-items").removeClass("jobdropdownp")
        }
    })
});

function validateReq(){
    var pass = $('input[name=password]');
    var repeatpass = $('input[name=repeatpassword]');
    console.log(pass + " " + repeatpass)
    if(pass.val() == repeatpass.val()){
        return true
    } else {
        $("#alertdiv").addClass("alert")
        $("#alertdiv").append("\
        <span class='closebtn' onclick='this.parentElement.style.display=\"none;\"\'>&times;</span>\
                    Passworts do not match!\
        "
        )
        return false
    }
}
