window.FriendheadsApp = window.FriendheadsApp || {}

FriendheadsApp.buildIcon = function () {
  var WIDTH = 1200;
  var HEIGHT = 630;
  var canvas = $('#icon-canvas')[0]
  var context = canvas.getContext('2d')
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  context.fillStyle = 'rgb(0,255,183)'
  context.fillRect(0,0,WIDTH, HEIGHT);
  if(FriendheadsApp.drawBackground(canvas)) {
    context.fillStyle = 'rgb(255,255,255)';
    context.globalAlpha = .5;
    context.fillRect(0,0,WIDTH, HEIGHT);
    context.globalAlpha = 1
  }

  var width = WIDTH/3
  var head = { left: 0, top: 0, width: width, height: width*FriendheadsApp.imageRatio }
  FriendheadsApp.drawHead(head, context)

  var width = WIDTH/4
  var head = { left: (WIDTH/3) - (WIDTH/12), top: HEIGHT/2, width: width, height: width*FriendheadsApp.imageRatio }
  FriendheadsApp.drawHead(head, context)

  var width = WIDTH/3
  var head = { left: 2*WIDTH/3, top: HEIGHT/4, width: width, height: width*FriendheadsApp.imageRatio }
  FriendheadsApp.drawHead(head, context)

  var width = WIDTH/5
  var head = { left: WIDTH/2, top: HEIGHT/20, width: width, height: width*FriendheadsApp.imageRatio }
  FriendheadsApp.drawHead(head, context)
}

$(function() {
  window.setTimeout(function(){
    var canvas = $('#icon-canvas')[0]
    if(!canvas) { return }
    FriendheadsApp.buildIcon()
    $.ajax({
      type: 'PUT',
      url: canvas.dataset.path,
      data: {og_image: canvas.toDataURL()}
    })
  }, 1 * 1000)
})
