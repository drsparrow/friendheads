var config = {
  apiKey: "AIzaSyCC7YUaWwhg_ROMUZ941CpaAwdLbLm5iUA",
  authDomain: "friendheads.firebaseapp.com",
  databaseURL: "https://friendheads.firebaseio.com",
  storageBucket: "friendheads.appspot.com",
  messagingSenderId: "253574395902"
};
firebase.initializeApp(config);

$('#lol').change(function () {
  var file = document.getElementById('lol').files[0]
  var storageRef = firebase.storage().ref();

  var name = (new Date()).getTime().toString()
  var uploadTask = storageRef.child(name).put(file, {});

  uploadTask.on('state_changed', null, null, function() {
    window.FriendHeads.start(name)
    window.history.replaceState('', document.title, '?i='+name);
  });
})
