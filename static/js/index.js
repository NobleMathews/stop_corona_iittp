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

$( document ).ready(function() {
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
