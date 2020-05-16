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

  if(localStorage.getItem('cookieSeen') != 'shown'){
    $('#cookie-banner').removeClass();
    $('#cookie-banner').addClass('cookie-banner');
    $('#cookie-banner').addClass('full');
    $('#cookie-banner').addClass('bottom');
    setTimeout(function(){
      $('#cookie-banner').addClass('show');
    }, 100);
    localStorage.setItem('cookieSeen','shown')
}

$('.close').click(function(e) {
  $('.cookie-banner').fadeOut(); 
});

    setTimeout(() => {   
        $(".tweeter").fadeIn(4000);
}, 2500);

$('.cookie-banner .button').click(function(){
    $('#cookie-banner').removeClass('show');
  });
    
    setTimeout(() => {   
        $(".container2").scrollTop(85);
}, 3000);
$.getJSON('https://api.rootnet.in/covid19-in/stats/latest', function(curr){
  count=[];
  // count.push(curr['data']['summary']['total']);
  // count.push(curr['data']['summary']['discharged']);
  // count.push(curr['data']['summary']['deaths']);
  count.push(curr['data']['unofficial-summary'][0]['total']);
  count.push(curr['data']['unofficial-summary'][0]['recovered']);
  count.push(curr['data']['unofficial-summary'][0]['deaths']);
  let sl=0;
$('.counting').each(function() {
  var $this = $(this),
      // countTo = $this.attr('data-count');
      countTo = count[sl];
      sl=sl+1;
  
  $({ countNum: $this.text()}).animate({
    countNum: countTo
  },

  {

    duration: 4500,
    easing:'linear',
    step: function() {
      $this.text(Math.floor(this.countNum));
    },
    complete: function() {
      $this.text(this.countNum);
      //alert('finished');
    }

  });  
  

});})
})
