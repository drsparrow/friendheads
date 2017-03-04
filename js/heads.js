window.FriendHeads = window.FriendHeads || {}
FriendHeads.samples = [
  {si: 'bern', sa: 'bern', hat: 'spin', hands: 1, size: 1.5},
  {si: 'kony', hat: 'party', snail: 1},
  {si: 'hill', sa: 'hill', hat: 'santa', feet: 1, count: 10},
  {si: 'cage', sa: 'cage', sb: 'cage', hat: 'bow'}
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
  var flopped = false
  var paused = false
  var hue = 0

  var imgW, imgH;
  var footRatio;
  var handRatio;

  var opts = FriendHeads.options = {
    count: FriendHeads.defaultHeadCount
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
    if(paused) { return }
    var height = $content.height()
    var width = $content.width()

    heads.forEach(function(head){
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
    })
    draw()
  }

  var addHead = function (left, top) {
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
    heads = _.sortBy(heads.concat([head]), function(h){return - h.width})
  }

  var reverseHeads = function() {
    heads.forEach(function(head){
      head.xDir = -head.xDir
      head.yDir = -head.yDir
    })
  }

  var resizeHeads = function(zoomingIn) {
    var diff = opts.sizeMult / 10
    opts.sizeMult += (zoomingIn ? diff : -diff)
    if (opts.sizeMult > 2) {
      opts.sizeMult = 2
    } else if (opts.sizeMult < .25) {
      opts.sizeMult = .25
    } else {
      heads.forEach(resizeHead)
    }
  }

  var resizeHead = function (head) {
    var prevWidth = head.width
    var prevHeight = head.height
    var newWidth = opts.sizeMult * head.size
    head.width = newWidth
    head.height = head.width * (prevHeight/prevWidth)
    head.left = head.left + (prevWidth - newWidth)/2
    head.top = head.top + (prevHeight - head.height)/2
  }

  var imgSrc = function () {
    var id = window.FriendHeads.params('i')
    var specialImage = window.FriendHeads.params('si')
    if(id) {
      return pathFromId(id)
    } else if (specialImage) {
      return 'heads/'+specialImage+'.png'
    }
  }

  var setRandomParams = function () {
    var head = _.sample(FriendHeads.samples);
    FriendHeads._params = _.pick(head, 'si', 'hat', 'feet', 'hands', 'count', 'size')
  }

  var setOptions = function () {
    var params = window.FriendHeads.params()
    opts.sizeMult = parseFloat(params.size) || 1;
    opts.feet = !!params.feet
    opts.hands = !!params.hands
    opts.hatName = params.hat
    opts.snailTrail = !!params.snail
    opts.count = params.count || opts.count
    opts.color = params.color
    var fullColor = '#'+opts.color
    opts.color && $('html').css('background-color', fullColor)
    ctx.fillStyle = fullColor;
    if(params.b) {
      opts.background = params.b
      $('body').css('background', 'url('+pathFromId(opts.background)+')')
    } else if(params.sb) {
      opts.background = params.sb
      opts.background && $('body').css('background', 'url(backgrounds/'+opts.background+'.png)')
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
    } else if (keyCode == 187 || keyCode == 189 || keyCode == 173 || keyCode == 61) { // +-
      resizeHeads(keyCode == 187 || keyCode == 61)
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
    var hat = opts.hatName && document.getElementById(opts.hatName+'-hat') || {}
    footRatio = leftFoot.height/leftFoot.width
    handRatio = leftHand.height/leftHand.width
    hatRatio = hat.height/hat.width

    if(opts.snailTrail) {ctx.globalAlpha = .01}
    if(!opts.background) {
      ctx.fillStyle = opts.color ? '#' + opts.color : 'hsl('+(.01*(new Date()).getTime()) % 360+',100%,50%)'
      ctx.fillRect(0,0,$(window).width(), $(window).height())
    } else {
      ctx.clearRect(0,0,$(window).width(), $(window).height())
    }
    ctx.globalAlpha = 1

    heads.forEach(function(head){
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

  var start = function() {
    var isDefault = !(FriendHeads.params('i') || FriendHeads.params('si'))
    isDefault && $('.js-form-stuff').removeClass('hidden')
    isDefault && setRandomParams()
    isDefault || $('body, html, #js-content').addClass('no-overflow')
    resizeFunc()
    playAudio()
    setOptions()

    var img = $('#img')[0]

    img.src = imgSrc()
    img.onload = function () {
      imgW = img.width;
      imgH = img.height;
      for(var i = 0; i < opts.count; i++) { addHead() }
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
