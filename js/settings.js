$(function(){
  $('.js-advanced-settings-toggle').click(function(){
    $('.extra-option').removeClass('selected')
    if ($('.js-advanced-settings').is(':visible')){
      $('.js-advanced-settings').addClass('hidden');
    } else {
      $(this).addClass('selected')
      $('.js-advanced-settings').removeClass('hidden');
    }
    $('.js-samples').addClass('hidden');
  })
  $('.js-samples-toggle').click(function(){
    $('.extra-option').removeClass('selected')
    if($('.js-samples').is(':visible')){
      $('.js-samples').addClass('hidden');
    } else {
      $(this).addClass('selected')
      $('.js-samples').removeClass('hidden');
    }
    $('.js-advanced-settings').addClass('hidden');
  })

  FriendHeads.samples.forEach(function(sample){
    var $a = $('<a>', {href: window.location.pathname + '?' + $.param(sample), target: '_blank', class: 'sample-link'})
    $a.append($('<img>', {src: 'heads/'+sample.si+'.png'}))
    $('.js-samples').append($a)
  })

  $('.js-samples')
})
