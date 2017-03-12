window.FriendheadsApp = window.FriendheadsApp || {}
FriendheadsApp.files = FriendheadsApp.files || {}

FriendheadsApp.files.createCroppie = function (type) {
  FriendheadsApp.files.croppie && FriendheadsApp.files.croppie.destroy()
  FriendheadsApp.files.croppie = new Croppie($('#temp-img')[0],{
    viewport: {
      width: 150,
      height: 150,
      type: type || 'circle'
    },
    boundary: {
      width: 250,
      height: 250
    },
    update: function () {
      this.result('blob').then(function(blob) {
        FriendheadsApp.updateImage(window.URL.createObjectURL(blob))
     });
    }
  })
}

$(function(){
  $('#crop-square').click(function(){
    FriendheadsApp.files.createCroppie('square')
  })
  $('#crop-circle').click(function(){
    FriendheadsApp.files.createCroppie('circle')
  })
  $('#crop-none').click(function(){
    FriendheadsApp.files.croppie && FriendheadsApp.files.croppie.destroy()
    FriendheadsApp.files.croppie = null;

    FriendheadsApp.updateImage($('#temp-img').attr('src'))
  })

  $('.img-preview-container-container-hover-area').one('mouseenter', function(){
    $('.img-preview-container-container-hover-area').removeClass('hovered');
  })
})
