$(function(){
   $(".file-upload-button").dropzone({
     url: "dummy",
     createImageThumbnails: false,
     autoProcessQueue: false,
     addRemoveLinks: false,
     clickable: true,
     accept: function(file) {
       var storageRef = firebase.storage().ref();

       var name = (new Date()).getTime().toString(36)
       var uploadTask = storageRef.child(name).put(file, {});

       uploadTask.on('state_changed', null, null, function() {
         window.history.replaceState('', document.title, '?i='+name);
         window.FriendHeads.update()
       });
     }
   })
})
