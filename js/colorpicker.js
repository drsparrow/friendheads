$(function(){
  $('#background-color').spectrum({
    preferredFormat: "hex",
    showButtons: false,
    color: '#ff0000'
  })

  var $canvas = $('#changing-background-color-canvas');
  var ctx = $canvas[0].getContext('2d')
  window.setInterval(function(){
    if ($canvas.is(':visible')) {
      ctx.fillStyle = 'hsl('+(.01*(new Date()).getTime()) % 360+',100%,50%)';
      ctx.fillRect(0,0, $canvas.width(), $canvas.height())
    }
  }, 40)
})
