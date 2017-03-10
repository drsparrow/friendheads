window.FriendHeads = window.FriendHeads || {}
FriendHeads.files = FriendHeads.files || {}

FriendHeads.files.createCroppie = function (type) {
  FriendHeads.files.croppie && FriendHeads.files.croppie.destroy()
  FriendHeads.files.croppie = new Croppie($('#temp-img')[0],{
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
        $('#img').attr('src', window.URL.createObjectURL(blob))
     });
    }
  })
}

$(function(){
  $('#crop-square').click(function(){
    FriendHeads.files.createCroppie('square')
  })
  $('#crop-circle').click(function(){
    FriendHeads.files.createCroppie('circle')
  })
  $('#crop-none').click(function(){
    FriendHeads.files.croppie && FriendHeads.files.croppie.destroy()
    FriendHeads.files.croppie = null;
    $('#img').attr('src', $('#temp-img').attr('src'))
  })
})
