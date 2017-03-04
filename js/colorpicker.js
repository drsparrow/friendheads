$(function(){
  $('#background-color').spectrum({
    preferredFormat: "hex",
    showButtons: false,
    color: '#ff0000'
  })

  var $canvases = $('#changing-background-color-canvas, #background-canvas');
  // var ctx0 = $canvas[0].getContext('2d')
  // var ctx1 = $canvas[1].getContext('2d')
  window.setInterval(function(){
    $canvases.each(function(){
      if($(this).is(':visible')){
        this.getContext('2d').fillStyle = 'hsl('+(.01*(new Date()).getTime()) % 360+',100%,50%)';
        this.getContext('2d').fillRect(0,0, this.width, this.height)
      }
    })
  }, 50)
})
