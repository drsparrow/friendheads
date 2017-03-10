window.FriendHeads = window.FriendHeads || {}

FriendHeads.defaultHeadCount = 5
FriendHeads.hats = ['party', 'top', 'santa', 'bow', 'spin']
FriendHeads.ranges = {
  snail: [0, 9],
  speedMult: [0.1, 20],
  sizeMult: [0.25, 2]
}
FriendHeads.maxSnail = FriendHeads.ranges.snail[1]

$(function(){
  console.log('in')
  var heads = FriendHeads.heads = [];
  var canvas = document.getElementById("js-content")
  var ctx = document.getElementById("js-content").getContext('2d')
  ctx.imageSmoothingEnabled = false;
  canvas.width = 1000;
  canvas.height = 750;
  canvas.style.width = "1000px";
  canvas.style.height = "750px";
  $content = $('#js-content')
  var flopped = false
  var hue = 0

  var imgW, imgH;
  var footRatio;
  var handRatio;

  var opts = FriendHeads.options = {
    count: FriendHeads.defaultHeadCount,
    speedMult: 1
  }

  var getRandomDir = function () {
    var rand = Math.random() + 1
    var parity = (Math.random() < .5) ? 1 : -1
    return rand * parity
  }

  var getRandomPos = function (dimension) {
    return Math.random() * $('#js-content')[dimension]()
  }

  var moveHeads = function() {
    if(FriendHeads.paused) { draw(); return }
    var speedMult = opts.speedMult
    var height = $content.height()
    var width = $content.width()
    var wasHovered = FriendHeads.hovered
    FriendHeads.hovered = false
    FriendHeads.heads.forEach(function(head){
      var top = head.top + speedMult * head.yDir
      var fullHeight = opts.feet ? (2*head.height/3)+(footRatio*head.width/2) : head.height
      var hatHeight = opts.hatName ? hatRatio*head.width/2 - head.height/8 : 0;
      if((top+fullHeight) < 0) {
        top = height + hatHeight
      } else if ((top - hatHeight)> height) {
        top = -fullHeight
      }
      head.top = top

      var left = head.left + speedMult * head.xDir
      var leftMost = opts.hands ? 1*head.width/4 - head.width/2 : 0;
      var rightMost = opts.hands ? 3*head.width/4 + head.width/2 : head.width;
      if(rightMost+left < 0) {
        left = width + -(leftMost)
      } else if (leftMost+left > width) {
        left = -(rightMost)
      }
      head.left = left
      if(wasHovered && (FriendHeads.hovered || isHovered(head))) { FriendHeads.hovered = true}
    })
    draw()
  }

  var isHovered = function(head){
    var mouse = FriendHeads.mouse
    if(!mouse) { return }
    var x = mouse.clientX
    var y = mouse.clientY
    return (x > head.left &&
            x < head.left+head.width &&
            y > head.top &&
            y < head.top+head.height);
  }

  FriendHeads.addHead = function (left, top) {
    var size = 100 * (Math.random() + 1)
    var adjSize = size/imgW
    var width = size*opts.sizeMult;
    var height =imgH*(size/imgW)*opts.sizeMult;
    var $head = $('<img>')
    left = (left ? left - width/2 : getRandomPos('width'))
    top = (top ? top - height/2 : getRandomPos('height'))
    var src = imgSrc()

    var head = {
      size: size,
      width: width, height: height,
      left: left, top: top,
      xDir: getRandomDir(), yDir: getRandomDir()
    }
    FriendHeads.heads = _.sortBy(FriendHeads.heads.concat([head]), function(h){return - h.width})
  }

  FriendHeads.reverseHeads = function() {
    FriendHeads.paused = false;
    FriendHeads.heads.forEach(function(head){
      head.xDir = -head.xDir
      head.yDir = -head.yDir
    })
  }

  FriendHeads.resizeHeads = function(zoomingIn) {
    var diff = opts.sizeMult / 10
    opts.sizeMult += (zoomingIn ? diff : -diff)
    if (opts.sizeMult > 2) {
      opts.sizeMult = 2
    } else if (opts.sizeMult < .25) {
      opts.sizeMult = .25
    } else {
      FriendHeads.heads.forEach(FriendHeads.resizeHead)
    }
  }

  FriendHeads.resizeHead = function (head) {
    var prevWidth = head.width
    var prevHeight = head.height
    var newWidth = opts.sizeMult * head.size
    head.width = newWidth
    head.height = head.width * (prevHeight/prevWidth)
    head.left = head.left + (prevWidth - newWidth)/2
    head.top = head.top + (prevHeight - head.height)/2
  }

  FriendHeads.changeSnail = function(isUp) {
    var val = opts.snailTrail + 5*(isUp ? 1 : -1)
    if (val < 0){
      val = 0
    } else if (val > FriendHeads.maxSnail) {
      val = FriendHeads.maxSnail
    }
    opts.snailTrail = val
  }

  FriendHeads.changeSpeed = function(isUp) {
    var speedDiff = 1.5;
    var newSpeed = isUp ? opts.speedMult * speedDiff : opts.speedMult / speedDiff
    if (newSpeed > 20) {
      newSpeed = 20
    } else if (newSpeed < .1) {
      newSpeed = .1
    }

    opts.speedMult = newSpeed
  }

  FriendHeads.togglePaused = function () {
    FriendHeads.paused = !FriendHeads.paused
  }

  var imgSrc = function () {
    if($('#img').attr('src')){return $('#img').attr('src')}
    var id = FriendHeads.params('i')
    var specialImage = FriendHeads.params('si')
    if(id) {
      return pathFromId(id)
    } else if (specialImage) {
      return '/heads/'+specialImage+'.png'
    }
  }

  FriendHeads.setOptions = function () {
    var params = FriendHeads.params()
    opts.sizeMult = parseFloat(params.size) || 1;
    opts.feet = !!params.feet
    opts.hands = !!params.hands
    opts.hatName = params.hat
    opts.snailTrail = parseFloat(params.snail) || 0
    opts.count = params.count || opts.count
    opts.color = params.color
    var fullColor = '#'+opts.color
    opts.color && $('html').css('background-color', fullColor)
    ctx.fillStyle = fullColor;
    opts.background = $('#background').attr('src');
    opts.background && $('body').css('background', 'url('+opts.background+')');
    (opts.background || opts.color) ? $('#background-canvas').addClass('hidden') : $('#background-canvas').removeClass('hidden');
  }

  FriendHeads.updatePreview = function () {
    FriendHeads._params = FriendHeads.getParamsFromForm()
    FriendHeads.setOptions()
    var headDiff = FriendHeads.heads.length - opts.count
    // debugger
    if(headDiff < 0) {
      var func = 'addHead'
    } else if (headDiff > 0) {
      var func = 'removeHead'
    }

    for(var i = 0; i < Math.abs(headDiff); i++) {
      FriendHeads[func]()
    }
  }

  FriendHeads.removeHead = function (index) {
    if (!arguments.length) {
      index = _.random(FriendHeads.heads.length - 1)
    }
    FriendHeads.heads.splice(index, 1)
  }

  var playAudio = function() {
    var specialAudio = FriendHeads.params('sa')
    if(!specialAudio) { return }
    var audioSrc = '/audio/'+specialAudio+'.mp3'
    var $audio = $('<audio>', {src: audioSrc, loop: true})
    $('body').append($audio)
    $audio[0].load()
    $audio[0].play()
  }

  var getHeadIndexAtClick = function () {
    return _.findLastIndex(FriendHeads.heads, isHovered)
  }

  $('#js-content').click(function(e) {
    if(e.target != this) { return }
    var index = getHeadIndexAtClick()
    if(index != -1) {
      FriendHeads.removeHead(index)
    } else {
      FriendHeads.addHead(e.clientX, e.clientY)
    }
  })

  $('body').on('mousemove', function(e) {
    FriendHeads.mouse = e
    if(e.target != canvas) {FriendHeads.hovered = false; return }
    var index = getHeadIndexAtClick()
    FriendHeads.hovered = (index != -1)
  })

  var pathFromId = function(id) {
    return 'https://firebasestorage.googleapis.com/v0/b/friendheads-54fc9.appspot.com/o/'+id+'?alt=media'
  }

  var draw = function () {
    var face = document.getElementById('img')
    var leftFoot = document.getElementById('left-foot')
    var rightFoot = document.getElementById('right-foot')
    var leftHand = document.getElementById('left-hand')
    var rightHand = document.getElementById('right-hand')
    var hat = opts.hatName && document.getElementById(opts.hatName+'-hat') || {}
    footRatio = leftFoot.height/leftFoot.width
    handRatio = leftHand.height/leftHand.width
    hatRatio = hat.height/hat.width

    coverCanvas()
    $('body').css('cursor', FriendHeads.hovered ? 'pointer' :'default')
    FriendHeads.heads.forEach(function(head){
      if(opts.feet) {
        ctx.drawImage(leftFoot,head.left, head.top+2*head.height/3, head.width/2, footRatio*head.width/2)
        ctx.drawImage(rightFoot,head.left+head.width/2, head.top+2*head.height/3, head.width/2, footRatio*head.width/2)
      }
      if (opts.hands) {
        ctx.drawImage(leftHand,head.left-1*head.width/4, head.top+head.height/3, head.width/2, handRatio*head.width/2)
        ctx.drawImage(rightHand,head.left+3*head.width/4, head.top+head.height/3, head.width/2, handRatio*head.width/2)
      }
      ctx.drawImage(face,head.left, head.top, head.width, head.height)
      if(opts.hatName) {
        ctx.drawImage(hat,head.left+head.width/8, head.top - hatRatio*head.width/2 + head.height/8, head.width/2, hatRatio*head.width/2)
      }
    })
  }

  FriendHeads.clearCanv = function () {
    ctx.clearRect(0,0,$(window).width(), $(window).height())
  }

  var coverCanvas = function () {
    var maxSnail = FriendHeads.maxSnail
    if (opts.snailTrail == maxSnail) { return }
    if (!opts.snailTrail) {
      FriendHeads.clearCanv()
      return
    }
    var snailVal = maxSnail - opts.snailTrail
    ctx.globalAlpha = .008 * snailVal
    if(opts.background) {
      var background = $('#background')[0]
      var w = $(window).width()
      var h = $(window).height()
      var backH = background.height
      var backW = background.width
      if(!(backW && backH)) { return }
      var curX = 0
      while (curX < w) {
        var curH = 0
        while(curH < h) {
          ctx.drawImage(background,curX,curH)
          curH += backH
        }
        curX += backW
      }
    } else {
      ctx.fillStyle = opts.color ? '#' + opts.color : 'hsl('+(.01*(new Date()).getTime()) % 360+',100%,50%)'
      ctx.fillRect(0,0,$(window).width(), $(window).height())
    }
    ctx.globalAlpha = 1
  }

  var start = function() {
    var isIndex = $('#index-page').length
    isIndex && $('.js-form-stuff').removeClass('hidden')
    isIndex || $('body, html, #js-content').addClass('no-overflow')
    resizeFunc()
    isIndex || playAudio()
    FriendHeads.setOptions()
    FriendHeads.checkRanges()

    var img = $('#img')[0]

    img.src = imgSrc()
    img.onload = function () {
      FriendHeads.setImageRatio()
      for(var i = FriendHeads.heads.length; i < opts.count; i++) { FriendHeads.addHead() }
      draw()
    }
    window.setInterval(moveHeads, 20)
    isIndex || window.setTimeout(FriendHeads.update)
  }

  FriendHeads.update = function () {
    $('.js-form-stuff').addClass('hidden')
    var src = imgSrc()
    $('#img').attr('src', src)
    $('#fav-icon').attr('href', src)
  }

  FriendHeads.setImageRatio = function () {
    var img = $('#img')[0]
    imgW = img.width;
    imgH = img.height;
  }

  FriendHeads.updateImage = function (src) {
    $('#img').attr('src', src)
    $('#img').load(function(){
      FriendHeads.setImageRatio()
      FriendHeads.heads.forEach(function(head){
        var width = head.width
        head.height = head.width * (imgH/imgW)
      })
    })
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
