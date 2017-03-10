$(function(){
  FriendHeads.files = FriendHeads.files || {}
  var files = FriendHeads.files;
  var disabled = true;

  FriendHeads.getParamsFromForm = function () {
    var params = {}
    var hatName = $('img.selected-hat').data('hat')
    var background = $('input[name="background-option"]:checked').val()
    var headCount = $('#head-count').val()
    var snail = $('#snail-trail').val()
    if(files.audioFileName) {
      params.a = files.audioFileName
    }
    if ($('#js-include-hands').is(':checked')) {
      params.hands = 'y'
    }
    if ($('#js-include-feet').is(':checked')) {
      params.feet = 'y'
    }
    if (hatName) {
      params.hat = hatName
    }
    if(headCount != FriendHeads.defaultHeadCount) {
      params.count = headCount
    }
    if(snail != '') {
      params.snail = snail
    }
    if(background=='custom') {
      params.color = $('#background-color').val().split('#')[1]
    }
    return params
  }

  var changePage = function (file) {

    var request = function (headOptions) {
      var data = {head: headOptions}
      data.head.options = JSON.stringify(FriendHeads.getParamsFromForm())
      data[$("meta[name=csrf-param]").attr('content')] = $("meta[name=csrf-token]").attr('content')
      $.ajax({
        type: 'post',
        url: 'heads/',
        data: data,
        success: function (response) {
          var params = FriendHeads.getParamsFromForm()
          var image = response.id
          window.location = '/' + image
        }
      })
    }

    if (file) {
      var r = new FileReader()
      r.onload = function (e) {
        request({data_url: e.target.result})
      }
      var dataUrl = r.readAsDataURL(file)
    } else {
      var resized = FriendHeads.files.resize($('#img')[0])
      var resizedBackground = FriendHeads.files.resize($('#background')[0])
      request({data_url: resized, background_data_url: resizedBackground})
    }

  }

  $(".image-upload-button").dropzone({
     url: "dummy",
     createImageThumbnails: false,
     autoProcessQueue: false,
     addRemoveLinks: false,
     clickable: true,
     acceptedFiles: 'image/*',
     previewTemplate: '<span></span>',
     accept: function(file) {
      $('#submit').attr('disabled', true)
      if($('.js-advanced-settings').is(':visible')) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('#submit').attr('disabled', false)
          $('.img-preview-container').removeClass('hidden')
          $('#temp-img').attr('src', e.target.result);
          FriendHeads.files.createCroppie()
        }

        reader.readAsDataURL(file)
      } else {
        changePage(file)
      }
    }
  })

   $(".background-upload-button").dropzone({
     url: "dummy",
     createImageThumbnails: false,
     autoProcessQueue: false,
     addRemoveLinks: false,
     clickable: true,
     acceptedFiles: 'image/*',
     previewTemplate: '<span></span>',
     accept: function(file) {
       var reader = new FileReader();
       reader.onload = function (e) {
         $('#background').attr('src', e.target.result)
         FriendHeads.clearCanv()
         FriendHeads.updatePreview()
       }
       reader.readAsDataURL(file)
     }
   })

   $('#submit').click(function(){
     changePage()
   })
})
