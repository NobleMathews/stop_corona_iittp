// let myLabels = document.querySelectorAll('.lbl-toggle');

// Array.from(myLabels).forEach(label => {
//   label.addEventListener('keydown', e => {
//     // 32 === spacebar
//     // 13 === enter
//     if (e.which === 32 || e.which === 13) {
//       e.preventDefault();
//       label.click();
//     };
//   });
// });
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

$( document ).ready(function() {

  var user = getCookie("noble");
  if (user == "") {
    $('#cookie-banner').removeClass();
    $('#cookie-banner').addClass('cookie-banner');
    $('#cookie-banner').addClass('full');
    $('#cookie-banner').addClass('bottom');
    setTimeout(function(){
      $('#cookie-banner').addClass('show');
    }, 100);
  } else {
      setCookie("noble", "hi", 365);
  }
    setTimeout(() => {   
        $(".tweeter").fadeIn(4000);
}, 2500);

$('.cookie-banner .button').click(function(){
    $('#cookie-banner').removeClass('show');
  });
    
    setTimeout(() => {   
        $(".container2").scrollTop(85);
}, 3000);

})
