$(function(){
  FriendheadsApp.files = FriendheadsApp.files || {}
  var files = FriendheadsApp.files;
  var disabled = true;

  FriendheadsApp.getParamsFromForm = function () {
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
    if(headCount != FriendheadsApp.defaultHeadCount) {
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
      data.head.options = JSON.stringify(FriendheadsApp.getParamsFromForm())
      data[$("meta[name=csrf-param]").attr('content')] = $("meta[name=csrf-token]").attr('content')
      $.ajax({
        type: 'post',
        url: 'heads/',
        data: data,
        success: function (response) {
          var params = FriendheadsApp.getParamsFromForm()
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
      var resized = FriendheadsApp.files.resize($('#img')[0])
      var background = $('#background')[0];
      var resizedBackground = background.src ? FriendheadsApp.files.resize(background) : null
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
          $('.js-close-button').removeClass('hidden');
          $('#temp-img').attr('src', e.target.result);
          FriendheadsApp.files.createCroppie()
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
         FriendheadsApp.clearCanv()
         FriendheadsApp.updatePreview()
       }
       reader.readAsDataURL(file)
     }
   })

   $('#submit').click(function(){
     changePage()
   })
})
