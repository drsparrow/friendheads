(function(){
  window.FriendheadsApp = window.FriendheadsApp || {}
  var $button = function (key) {
    return $('.js-'+key+'-button')
  };

  var pressButton = function ($b) {
    $b.addClass('active')
    setTimeout(function () { $b.removeClass('active') }, 150)
  }

  var pressKey = function (key) {
    pressButton($button(key))
  }

  FriendheadsApp.checkRanges = function () {
    var opts = FriendheadsApp.options
    var rngs = FriendheadsApp.ranges
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
        FriendheadsApp.togglePaused()
        pressKey('space')
      } else if (keyCode == 191) { // ? key
        FriendheadsApp.reverseHeads()
        pressKey('question')
      } else if (keyCode == 38 || keyCode == 40) { // up arrow, down arrow
        var isUp = (keyCode == 38)
        FriendheadsApp.changeSpeed(isUp)
        isUp ? pressKey('up') : pressKey('down')
      } else if (keyCode == 187 || keyCode == 189 || keyCode == 173 || keyCode == 61) { // +-
        var isPlus = (keyCode == 187 || keyCode == 61)
        FriendheadsApp.resizeHeads(isPlus)
        isPlus ? pressKey('plus') : pressKey('minus')
      } else if(keyCode == 37 || keyCode == 39) { // left arrow, right arrow
        var isRight = (keyCode==39)
        FriendheadsApp.changeSnail(isRight)
        isRight ? pressKey('right') : pressKey('left')
      } else {
        return
      }
      FriendheadsApp.checkRanges()
      e.preventDefault()
    })


    $button('plus').click(function(){
      FriendheadsApp.resizeHeads(true)
    })
    $button('minus').click(function(){
      FriendheadsApp.resizeHeads(false)
    })
    $button('space').click(function(){
      FriendheadsApp.togglePaused()
    })
    $button('right').click(function(){
      FriendheadsApp.changeSnail(true)
    })
    $button('left').click(function(){
      FriendheadsApp.changeSnail(false)
    })
    $button('up').click(function(){
      FriendheadsApp.changeSpeed(true)
    })
    $button('down').click(function(){
      FriendheadsApp.changeSpeed(false)
    })
    $button('question').click(function(){
      FriendheadsApp.reverseHeads()
    })
    $('.js-control-buttons img').click(FriendheadsApp.checkRanges)
  })
})()
