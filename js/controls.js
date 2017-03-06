(function(){
  var $button = function (key) {
    return $('.js-'+key+'-button')
  };

  FriendHeads.checkRanges = function () {
    var opts = FriendHeads.options
    var rngs = FriendHeads.ranges
    $('.js-control-buttons img').removeClass('disabled')

    if(opts.snailTrail <= rngs.snail[0]) {
      $button('left').addClass('disabled')
    } else if (opts.snailTrail >= rngs.snail[1]) {
      $button('right').addClass('disabled')
    }

    if(opts.speedMult <= rngs.speedMult[0]) {
      $button('down').addClass('disabled')
    } else if(opts.speedMult >= rngs.speedMult[1]) {
      $button('up').addClass('disabled')
    }

    if(opts.sizeMult <= rngs.sizeMult[0]) {
      $button('minus').addClass('disabled')
    } else if(opts.sizeMult >= rngs.sizeMult[1]) {
      $button('plus').addClass('disabled')
    }
  }

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


    $button('plus').click(function(){
      FriendHeads.resizeHeads(true)
    })
    $button('minus').click(function(){
      FriendHeads.resizeHeads(false)
    })
    $button('space').click(function(){
      FriendHeads.togglePaused()
    })
    $button('right').click(function(){
      FriendHeads.changeSnail(true)
    })
    $button('left').click(function(){
      FriendHeads.changeSnail(false)
    })
    $button('up').click(function(){
      FriendHeads.changeSpeed(true)
    })
    $button('down').click(function(){
      FriendHeads.changeSpeed(false)
    })
    $button('question').click(function(){
      FriendHeads.reverseHeads()
    })
    $('.js-control-buttons img').click(FriendHeads.checkRanges)
  })
})()
