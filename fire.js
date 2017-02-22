var config = {
  apiKey: "AIzaSyCC7YUaWwhg_ROMUZ941CpaAwdLbLm5iUA",
  authDomain: "friendheads.firebaseapp.com",
  databaseURL: "https://friendheads.firebaseio.com",
  storageBucket: "friendheads.appspot.com",
  messagingSenderId: "253574395902"
};
firebase.initializeApp(config);

$('#file-input').change(function () {
  var file = this.files[0]
  var storageRef = firebase.storage().ref();

  var name = (new Date()).getTime().toString(36)
  var uploadTask = storageRef.child(name).put(file, {});

  uploadTask.on('state_changed', null, null, function() {
    window.history.replaceState('', document.title, '?i='+name);
    window.FriendHeads.update()
  });
})
