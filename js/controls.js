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
  $('.js-up-button').click(function(){
    FriendHeads.changeSpeed(true)
  })
  $('.js-down-button').click(function(){
    FriendHeads.changeSpeed(false)
  })
  $('.js-control-buttons img').click(FriendHeads.checkRanges)
})
