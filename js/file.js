$(function(){
  var imageFileName;
  var audioFileName;
  var backgroundFileName;
  var disabled = true;

  var changePage = function () {
    var params = {i: imageFileName}
    var hatName = $('img.selected-hat').data('hat')
    var background = $('input[name="background-option"]:checked').val()
    var headCount = $('#head-count').val()
    var snail = $('#snail-trail').val()
    if(audioFileName) {
      params.a = audioFileName
    }
    if(backgroundFileName) {
      params.b = backgroundFileName
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
    window.location = window.location.pathname + '?' + $.param(params)
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
       $('#submit').attr('disabled', true)
       var storageRef = firebase.storage().ref();

       imageFileName = (new Date()).getTime().toString(36)
       var uploadTask = storageRef.child(imageFileName).put(file, {});

       uploadTask.on('state_changed', null, null, function(a,b,c) {
         if($('.js-advanced-settings').is(':visible')) {
           $('#submit').removeAttr('disabled')
           disabled = false
           $('#loading-img').attr('src',uploadTask.snapshot.downloadURL)
         } else {
           changePage()
         }
       });
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
       audioFileName = (new Date()).getTime().toString(36)
       var uploadTask = storageRef.child(audioFileName).put(file, {});

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
       backgroundFileName = (new Date()).getTime().toString(36)
       var uploadTask = storageRef.child(backgroundFileName).put(file, {});

       uploadTask.on('state_changed', null, null, function() {
         !disabled && $('#submit').removeAttr('disabled')
         $('.background-upload-button .loading').addClass('hidden')
       });
     }
   })

   $('#submit').click(changePage)
})
