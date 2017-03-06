$(function(){
  $('body').on('keydown', function(e){
    var keyCode = e.which
    if(keyCode == 32) { // space bar
      FriendHeads.togglePaused()
    } else if (keyCode == 191) { // ? key
      FriendHeads.reverseHeads()
    } else if (keyCode == 38 || keyCode == 40) { // up arrow, down arrow
      FriendHeads.changeSpeed(keyCode == 38)
    } else if (keyCode == 187 || keyCode == 189 || keyCode == 173 || keyCode == 61) { // +-
      FriendHeads.resizeHeads(keyCode == 187 || keyCode == 61)
    } else if(keyCode == 37 || keyCode == 39) { // left arrow, right arrow
      FriendHeads.changeSnail(keyCode==39)
    } else {
      return
    }
    FriendHeads.checkRanges()
    e.preventDefault()
  })


  $('.js-plus-button').click(function(){
    FriendHeads.resizeHeads(true)
  })
  $('.js-minus-button').click(function(){
    FriendHeads.resizeHeads(false)
  })
  $('.js-space-button').click(function(){
    FriendHeads.togglePaused()
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
  $('.js-question-button').click(function(){
    FriendHeads.reverseHeads()
  })
  $('.js-control-buttons img').click(FriendHeads.checkRanges)
})
