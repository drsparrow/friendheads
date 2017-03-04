$(function(){
  $('.js-plus-button').click(function(){
    FriendHeads.resizeHeads(true)
  })
  $('.js-minus-button').click(function(){
    FriendHeads.resizeHeads(false)
  })
  $('.js-space-button').click(function(){
    FriendHeads.paused = !FriendHeads.paused
  })
  $('.js-right-button').click(function(){
    FriendHeads.changeSnail(true)
  })
  $('.js-left-button').click(function(){
    FriendHeads.changeSnail(false)
  })
})
