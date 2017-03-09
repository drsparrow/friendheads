window.FriendHeads = window.FriendHeads || {}
FriendHeads.files = FriendHeads.files || {}

FriendHeads.files.resize = function (img) {
  // http://stackoverflow.com/questions/10333971/html5-pre-resize-images-before-uploading
  var canvas = document.getElementById('resize-canvas')
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var MAX_WIDTH = 800;
  var MAX_HEIGHT = 800;
  var width = img.width;
  var height = img.height;

  if (width > height) {
    if (width > MAX_WIDTH) {
      height *= MAX_WIDTH / width;
      width = MAX_WIDTH;
    }
  } else {
    if (height > MAX_HEIGHT) {
      width *= MAX_HEIGHT / height;
      height = MAX_HEIGHT;
    }
  }
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  var dataurl = canvas.toDataURL("image/png");
  return dataurl
}
