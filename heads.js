$(function(){
  window.FriendHeads = window.FriendHeads || {}
  var heads = []
  canvas = document.getElementById("js-content")
  ctx = document.getElementById("js-content").getContext('2d')
  ctx.imageSmoothingEnabled = false;
  canvas.width = 1000;
  canvas.height = 750;
  canvas.style.width = "1000px";
  canvas.style.height = "750px";
  $content = $('#js-content')
  var speedMult = 1
  var sizeMult = 1
  var flopped = false
  var paused = false
  var hue = 0
  var DEFAULT = 'images/j.png'
  var imgW, imgH;
  var feet = true;
  var hands = true;
  var footRatio;
  var handRatio;

  var getRandomDir = function () {
    var rand = Math.random() + 1
    var parity = (Math.random() < .5) ? 1 : -1
    return rand * parity
  }

  var getRandomPos = function (dimension) {
    return Math.random() * $('#js-content')[dimension]()
  }

  var moveHeads = function() {
    if(paused) { return }
    var height = $content.height()
    var width = $content.width()

    heads.forEach(function(head){
      var top = head.top + speedMult * head.yDir
      var fullHeight = feet ? (2*head.height/3)+(footRatio*head.width/2) : head.height
      if((top+fullHeight) < 0) {
        top = height
      } else if (top > height) {
        top = -fullHeight
      }
      head.top = top

      var left = head.left + speedMult * head.xDir
      var leftMost = hands ? 1*head.width/4 - head.width/2 : 0;
      var rightMost = hands ? 3*head.width/4 + head.width/2 : head.width;
      if(rightMost+left < 0) {
        left = width + -(leftMost)
      } else if (leftMost+left > width) {
        left = -(rightMost)
      }
      head.left = left
    })
    draw()
  }

  var addHead = function (left, top) {
    var size = 100 * (Math.random() + 1) / imgW
    var $head = $('<img>')
    left = (left ? left - size*imgW/2 : getRandomPos('width'))
    top = (top ? top - size*imgH/2 : getRandomPos('height'))
    var src = imgSrc()

    // if(flopped) { $head.addClass('flopped') }
    heads.push({width: imgW*size, height: imgH*size, left: left, top: top, xDir: getRandomDir(), yDir: getRandomDir()})
  }

  var reverseHeads = function() {
    heads.forEach(function(head){
      head.xDir = -head.xDir
      head.yDir = -head.yDir
    })
  }

  var resizeHeads = function(zoomingIn) {
    var diff = sizeMult / 10
    sizeMult += (zoomingIn ? diff : -diff)
    if (sizeMult > 2) {
      sizeMult = 2
    } else if (sizeMult < .25) {
      sizeMult = .25
    } else {
      $('.js-floating-head').each(resizeHead)
    }
  }

  var resizeHead = function () {
    var $this = $(this)
    var prevWidth = $this.width()
    var prevHeight = $this.height()
    var newWidth = sizeMult * $this.data('size')
    $this.width(newWidth)
    $this.css('left', $this.position().left + (prevWidth - newWidth)/2)
    $this.css('top', $this.position().top + (prevHeight - $this.height())/2)
  }

  var flipHeads = function () {
    flopped = !flopped
    var func = flopped ? 'addClass' : 'removeClass'
    $('.js-floating-head')[func]('flopped')
  }

  var changeHue = function (moveRight) {
    var diff = moveRight ? 20 : -20
    hue = (hue + diff + 360)%360
    updateHue()
  }

  var updateHue = function ($element) {
    $element = $element || $('.js-floating-head')
    var hueString = "hue-rotate("+hue+"deg)"
    $element.css({'-webkit-filter': hueString, filter: hueString})
  }

  var imgSrc = function () {
    var id = window.FriendHeads.params('i')
    if(id) {
      return 'https://firebasestorage.googleapis.com/v0/b/friendheads.appspot.com/o/image-'+id+'?alt=media'
    }
    return DEFAULT
  }

  var playAudio = function() {
    var id = window.FriendHeads.params('a')
    if(!id) { return }
    $('#audio-source').attr('src', 'https://firebasestorage.googleapis.com/v0/b/friendheads.appspot.com/o/audio-'+id+'?alt=media')
    $('#audio')[0].play()
  }

  $('#js-content').click(function(e) {
    if(e.target == this) {
      addHead(e.clientX, e.clientY)
    } else if($(e.target).is('.js-floating-head')) {
      $(e.target).remove()
    }
  })

  $('body').on('keydown', function(e){
    var keyCode = e.which
    if(keyCode == 32) { // space bar
      paused = false
      reverseHeads()
    } else if (keyCode == 48) { //space bar
      paused = !paused
    } else if (keyCode == 38) { // up arrow
      if (speedMult < 20) { speedMult *= 1.5 }
    } else if (keyCode == 40) { // down arrow
      if (speedMult > .1) { speedMult /= 1.5 }
    } else if(keyCode == 37 || keyCode == 39) { // left arrow, right arrow
      changeHue(keyCode==37)
    } else if (keyCode == 187 || keyCode == 189 || keyCode == 173 || keyCode == 61) { // +-
      resizeHeads(keyCode == 187 || keyCode == 61)
    } else if (keyCode == 191) { // ?/
      flipHeads()
    } else {
      return
    }

    e.preventDefault()
  })

  var pathFromId = function(id) {
    return 'https://firebasestorage.googleapis.com/v0/b/friendheads.appspot.com/o/'+id+'?alt=media'
  }

  var draw = function () {
    ctx.clearRect(0,0,$(window).width(), $(window).height())
    var face = document.getElementById('img')
    var leftFoot = document.getElementById('left-foot')
    var rightFoot = document.getElementById('right-foot')
    var leftHand = document.getElementById('left-hand')
    var rightHand = document.getElementById('right-hand')
    footRatio = leftFoot.height/leftFoot.width
    handRatio = leftHand.height/leftHand.width
    heads.forEach(function(head){
      if(feet) {
        ctx.drawImage(leftFoot,head.left, head.top+2*head.height/3, head.width/2, footRatio*head.width/2)
        ctx.drawImage(rightFoot,head.left+head.width/2, head.top+2*head.height/3, head.width/2, footRatio*head.width/2)
      }
      if (hands) {
        ctx.drawImage(leftHand,head.left-1*head.width/4, head.top+head.height/3, head.width/2, handRatio*head.width/2)
        ctx.drawImage(rightHand,head.left+3*head.width/4, head.top+head.height/3, head.width/2, handRatio*head.width/2)
      }
      ctx.drawImage(face,head.left, head.top, head.width, head.height)
    })
  }

  var start = function() {
    resizeFunc()
    playAudio()
    var isDefault = (imgSrc() == DEFAULT)
    isDefault && $('.js-form-stuff').removeClass('hidden')
    var img = $('#img')[0]

    img.src = imgSrc()
    img.onload = function () {
      imgW = img.width;
      imgH = img.height;
      for(var i = 0; i < 3; i++) { addHead() }
      draw()
    }
    window.setInterval(moveHeads, 20)
    isDefault || window.setTimeout(function(){window.FriendHeads.update()})
  }

  window.FriendHeads.update = function () {
    $('.js-form-stuff').addClass('hidden')
    var src = imgSrc()
    $('#img').attr('src', src)
    $('#fav-icon').attr('href', src)
  }


  var resizeFunc = function(){
    draw()
    var w = $(window).width();
    var h = $(window).height();
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
  }
  $(window).bind("resize", resizeFunc);
  start()
})
