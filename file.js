$(function(){
  var imageFileName
  var audioFileName
  var changePage = function () {
    var loc = window.location.pathname + '?i='+imageFileName
    if(audioFileName) {
      loc += ('&a=' + audioFileName)
    }
    if ($('#js-include-hands').is(':checked')) {
      loc += ('&hands=' + 1)
    }
    if ($('#js-include-feet').is(':checked')) {
      loc += ('&feet=' + 1)
    }
    window.location = loc
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
       $('#submit').removeAttr('disabled')
       var storageRef = firebase.storage().ref();

       imageFileName = (new Date()).getTime().toString(36)
       var uploadTask = storageRef.child('image-'+imageFileName).put(file, {});

       uploadTask.on('state_changed', null, null, function(a,b,c) {
         if($('.js-advanced-settings').is(':visible')) {
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
      //  $('.audio-upload-button .loading').addClass('hidden').removeClass('hidden')
      $('#submit').attr('disabled', true)
       var storageRef = firebase.storage().ref();
       audioFileName = (new Date()).getTime().toString(36)
       var uploadTask = storageRef.child('audio-'+audioFileName).put(file, {});

       uploadTask.on('state_changed', null, null, function() {
         $('#submit').removeAttr('disabled')
         $('.audio-upload-button .loading').addClass('hidden')
         $('.js-audio-file-name').text(file.name)
       });
     }
   })

   $('.js-show-advanced-settings').click(function(){
     $('.js-advanced-settings').removeClass('hidden')
   })

   $('#submit').click(changePage)
})
