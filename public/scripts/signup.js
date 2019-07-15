console.log("fddsfgdssdg")
$(document).ready(function() {

    $("#dropdownlol").change(function() {
        console.log("ggggg")
      var el = $(this) ;
      if(el.val() === "Arbeitgeber" ) {
      $("#optional").append(
          "<div class='custominput'>\
          <input type='text' name='city' placeholder='Skkjtadt' />\
          <div class='accentbar'></div>\
          </div>\
          <br>\
          <br>\
          ");
      } else if(el.val() === "Arbeitsuchender" ) {
          $("#optional").remove() ; }
    });
  
  });