$(function(){

  var params = $.param({
    url: window.location.href,
    text: 'check out my #friendheads'
  })

  var href = 'https://twitter.com/intent/tweet?' + params

  $('.js-twitter-share-anchor').attr('href', href)
})
