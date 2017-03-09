$(function(){
  window.setTimeout(function(){
    var meta = btoa(window.location.pathname+window.location.search)
    var src = 'http://www.ari.host/images/friendheads?meta=' + meta
    var $img = $('<img>').attr('src', src)
    $('body').append($img);
    $img.load(function(){
      $img.remove();
    });
  }, 3000)
})
