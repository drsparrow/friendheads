$(function(){
  $('.js-advanced-settings-toggle').click(function(){
    $('.js-advanced-settings').removeClass('hidden');
    $('.js-samples').addClass('hidden');
  })
  $('.js-samples-toggle').click(function(){
    $('.js-advanced-settings').addClass('hidden');
    $('.js-samples').removeClass('hidden');
  })

  FriendHeads.samples.forEach(function(sample){
    var $a = $('<a>', {href: window.location.pathname + '?' + $.param(sample), target: '_blank', class: 'sample-link'})
    $a.append($('<img>', {src: 'heads/'+sample.s+'.png'}))
    $('.js-samples').append($a)
  })

  $('.js-samples')
})
