window.FriendHeads = window.FriendHeads || {}
FriendHeads.samples = [
  {si: 'bern', hat: 'party', hands: 1, sa: 'bern'},
  {si: 'hill', hat: 'santa', feet: 1,  sa: 'hill'},
  {si: 'cage', hat: 'bow',   sa: 'cage', sb: 'cage'}
]
FriendHeads.defaultHeadCount = 5
$(function(){
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
  var sizeMult;
  var flopped = false
  var paused = false
  var hue = 0
  var DEFAULT = (function(){
    var sampleHeads = _.pluck(FriendHeads.samples, 'si')
    return 'heads/'+_.sample(sampleHeads) + '.png'
  })()
  var imgW, imgH;
  var feet;
  var hands;
  var footRatio;
  var handRatio;
  var hatName;
  var snailTrail;
  var background;
  var count = FriendHeads.defaultHeadCount;
  var color;

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
      var hatHeight = hatName ? head.width/2 : 0;
      if((top+fullHeight) < 0) {
        top = height + hatHeight
      } else if ((top - hatHeight)> height) {
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
    var size = 100 * (Math.random() + 1)
    var adjSize = size/imgW
    var width = size*sizeMult;
    var height =imgH*(size/imgW)*sizeMult;
    var $head = $('<img>')
    left = (left ? left - width/2 : getRandomPos('width'))
    top = (top ? top - height/2 : getRandomPos('height'))
    var src = imgSrc()

    // if(flopped) { $head.addClass('flopped') }
    var head = {
      size: size,
      width: width, height: height,
      left: left, top: top,
      xDir: getRandomDir(), yDir: getRandomDir()
    }
    heads = _.sortBy(heads.concat([head]), function(h){return - h.width})
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
      heads.forEach(resizeHead)
    }
  }

  var resizeHead = function (head) {
    var prevWidth = head.width
    var prevHeight = head.height
    var newWidth = sizeMult * head.size
    head.width = newWidth
    head.height = head.width * (prevHeight/prevWidth)
    head.left = head.left + (prevWidth - newWidth)/2
    head.top = head.top + (prevHeight - head.height)/2
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
    var specialImage = window.FriendHeads.params('si')
    if(id) {
      return pathFromId(id)
    } else if (specialImage) {
      return 'heads/'+specialImage+'.png'
    }
    return DEFAULT
  }

  var setOptions = function () {
    var params = window.FriendHeads.params()
    sizeMult = parseFloat(params.size) || 1;
    feet = !!params.feet
    hands = !!params.hands
    hatName = params.hat
    snailTrail = !!params.snail
    count = params.count || count
    color = params.color
    var fullColor = '#'+color
    color && $('html').css('background-color', fullColor)
    ctx.fillStyle = fullColor;
    if(params.b) {
      background = params.b
      $('body').css('background', 'url('+pathFromId(background)+')')
    } else if(params.sb) {
      background = params.sb
      background && $('body').css('background', 'url(backgrounds/'+background+'.png)')
    }
  }

  var playAudio = function() {
    var id = window.FriendHeads.params('a')
    var specialAudio = window.FriendHeads.params('sa')
    var audioSrc;
    if(id) {
      audioSrc = pathFromId(id)
    } else if (specialAudio) {
      audioSrc = 'audio/'+specialAudio+'.mp3'
    }
    if(!audioSrc) { return }
    var $audio = $('<audio>', {src: audioSrc, loop: true})
    $('body').append($audio)
    $audio[0].load()
    $audio[0].play()
  }

  var getHeadIndexAtClick = function (e) {
    return _.findLastIndex(heads, function(head){
      return (e.clientX > head.left &&
              e.clientX < head.left+head.width &&
              e.clientY > head.top &&
              e.clientY < head.top+head.height);
    })
  }

  $('#js-content').click(function(e) {
    if(e.target != this) { return }
    var index = getHeadIndexAtClick(e)
    if(index != -1) {
      heads.splice(index, 1)
    } else {
      addHead(e.clientX, e.clientY)
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
    return 'https://firebasestorage.googleapis.com/v0/b/friendheads-54fc9.appspot.com/o/'+id+'?alt=media'
  }

  var draw = function () {
    var face = document.getElementById('img')
    var leftFoot = document.getElementById('left-foot')
    var rightFoot = document.getElementById('right-foot')
    var leftHand = document.getElementById('left-hand')
    var rightHand = document.getElementById('right-hand')
    var hat = document.getElementById(hatName+'-hat') || {}
    footRatio = leftFoot.height/leftFoot.width
    handRatio = leftHand.height/leftHand.width
    hatRatio = hat.height/hat.width

    if(snailTrail) {ctx.globalAlpha = .01}
    if(!background) {
      ctx.fillStyle = color ? '#' + color : 'hsl('+(.01*(new Date()).getTime()) % 360+',100%,50%)'
      ctx.fillRect(0,0,$(window).width(), $(window).height())
    } else {
      ctx.clearRect(0,0,$(window).width(), $(window).height())
    }
    ctx.globalAlpha = 1

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
      if(hatName) {
        ctx.drawImage(hat,head.left+head.width/8, head.top - head.width/2, head.width/2, hatRatio*head.width/2)
      }
    })
  }

  var start = function() {
    resizeFunc()
    playAudio()
    setOptions()

    var isDefault = !(FriendHeads.params('i') || FriendHeads.params('si'))
    isDefault && $('.js-form-stuff').removeClass('hidden')
    var img = $('#img')[0]

    img.src = imgSrc()
    img.onload = function () {
      imgW = img.width;
      imgH = img.height;
      for(var i = 0; i < count; i++) { addHead() }
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
