$(function(){
  FriendheadsApp.files = FriendheadsApp.files || {}
  var files = FriendheadsApp.files;

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
      $('.js-submit-form').attr('disabled', true).addClass('disabled')
      if(!$('.js-advanced-settings').is(':visible')) {
        $('.js-advanced-settings-toggle').click()
      }

      var reader = new FileReader();

      reader.onload = function (e) {
        $('.js-submit-form').attr('disabled', false).removeClass('disabled').removeClass('hidden')
        $('.img-preview-container-container, .js-submit-form').removeClass('hidden')
        $('#temp-img').attr('src', e.target.result);
        FriendheadsApp.files.createCroppie()
      }

      reader.readAsDataURL(file)
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
         $('.js-remove-background').removeClass('hidden')
       }
       reader.readAsDataURL(file)
     }
   })

   $('.js-submit-form').click(function(){
     changePage()
   })
})
