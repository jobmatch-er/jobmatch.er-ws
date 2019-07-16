console.log("fddsfgdssdg")
$(document).ready(function () {
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
                </div>\
            ");
            $('#desc').tooltipster({
                theme: 'tooltipster-noir',
                maxWidth: 300
            });
        } else {
            $("#optional").remove();
        }
    })
});
