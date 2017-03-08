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

  FriendHeads.hats.forEach(function(hat){
    var $hat = $('<img>', {src: '/hats/'+hat+'.png', 'data-hat': hat, id: hat+'-hat'})
    $('.hat-selection').append($hat)
  })

  $('.hat-selection img').click(function(){
    var $this = $(this)
    var selected = $this.is('.selected-hat')
    $('.hat-selection img').removeClass('selected-hat')
    selected || $this.addClass('selected-hat')
    FriendHeads.updatePreview()
  })

  $('.js-advanced-settings input').change(function(){
    FriendHeads.updatePreview()
  })

  FriendHeads.samples.forEach(function(sample){
    var $a = $('<a>', {href: window.location.pathname + '?' + $.param(sample), target: '_blank', class: 'sample-link'})
    $a.append($('<img>', {src: '/heads/'+sample.si+'.png'}))
    $('.js-samples').append($a)
  })

  $('.js-samples')
})
