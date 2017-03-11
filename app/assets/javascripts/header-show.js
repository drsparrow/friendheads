$(function(){
  var hovered = false;

  $('.header .header-content').one('mouseenter', function (){
    hovered = true;
  });

  window.setTimeout(function(){
    if(hovered) { return }
    $('.header').addClass('hovered')
    $('.header .header-content').one('mouseenter', function(){
      $('.header').removeClass('hovered')
    })
  }, 4000)
})
