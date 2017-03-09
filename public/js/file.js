$(function(){
  FriendHeads.files = FriendHeads.files || {}
  var files = FriendHeads.files;
  var disabled //= true;
  var headBlob;

  FriendHeads.getParamsFromForm = function () {
    var params = {i: files.imageFileName}
    var hatName = $('img.selected-hat').data('hat')
    var background = $('input[name="background-option"]:checked').val()
    var headCount = $('#head-count').val()
    var snail = $('#snail-trail').val()
    if(files.audioFileName) {
      params.a = files.audioFileName
    }
    if(files.backgroundFileName) {
      params.b = files.backgroundFileName
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

  var changePage = function () {
    var storageRef = firebase.storage().ref();
    var file = headBlob
    // debugger
    files.imageFileName = (new Date()).getTime().toString(36)
    var uploadTask = storageRef.child(files.imageFileName).put(file, {});

    uploadTask.on('state_changed', null, null, function(a,b,c) {
      var params = FriendHeads.getParamsFromForm()
      var image = params.i;
      delete params.i;
      window.location = 'h/' + image + '?' + $.param(params)
    })

  }

  $(".image-upload-button").dropzone({
     url: "dummy",
     createImageThumbnails: false,
     autoProcessQueue: false,
     addRemoveLinks: false,
     clickable: true,
     acceptedFiles: 'image/*',
     previewTemplate: $('.custom-dz-preview-template').html(),
     accept: function(file) {
      //  $('#submit').attr('disabled', true)
       var reader = new FileReader();

       reader.onload = function (e) {
        $('.img-preview-container').removeClass('hidden')
         $('#temp-img').attr('src', e.target.result);
        //  debugger
         c = new Croppie($('#temp-img')[0],{
           viewport: {
             width: 150,
             height: 150,
             type: 'circle'
           },
           boundary: {
             width: 250,
             height: 250
           },
           update: function () {
             c.result('blob').then(function(blob) {
               headBlob = blob
               $('#img').attr('src', window.URL.createObjectURL(blob))
            });
           }
         })
       }

       reader.readAsDataURL(file)
     }
   })

   $(".audio-upload-button").dropzone({
     url: "dummy",
     createImageThumbnails: false,
     autoProcessQueue: false,
     addRemoveLinks: false,
     clickable: true,
     acceptedFiles: 'audio/*',
     previewTemplate: $('.custom-dz-preview-template').html(),
     accept: function(file) {
      $('#submit').attr('disabled', true)
       var storageRef = firebase.storage().ref();
       files.audioFileName = (new Date()).getTime().toString(36)
       var uploadTask = storageRef.child(files.audioFileName).put(file, {});

       uploadTask.on('state_changed', null, null, function() {
         !disabled && $('#submit').removeAttr('disabled')
         $('.audio-upload-button .loading').addClass('hidden')
         $('.js-audio-file-name').text(file.name)
       });
     }
   })

   $(".background-upload-button").dropzone({
     url: "dummy",
     createImageThumbnails: false,
     autoProcessQueue: false,
     addRemoveLinks: false,
     clickable: true,
     acceptedFiles: 'image/*',
     previewTemplate: $('.custom-dz-preview-template').html(),
     accept: function(file) {
      $('#submit').attr('disabled', true)
       var storageRef = firebase.storage().ref();
       files.backgroundFileName = (new Date()).getTime().toString(36)
       var uploadTask = storageRef.child(files.backgroundFileName).put(file, {});

       uploadTask.on('state_changed', null, null, function() {
         !disabled && $('#submit').removeAttr('disabled')
         $('.background-upload-button .loading').addClass('hidden')
       });
     }
   })

   $('#submit').click(changePage)
})
