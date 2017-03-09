$(function(){

  var params = $.param({
    url: window.location.href,
    hashtags: 'friendheads',
    text: 'whoa check out these heads!'
  })

  var href = 'https://twitter.com/intent/tweet?' + params
  var $a = $('<a>', {href: href, target: '_blank'})
  $a.text('tweet')


  $('.js-control-buttons').prepend($a)
})
